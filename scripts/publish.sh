#!/bin/bash

# Check if the required command-line argument is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <app_name>"
  exit 1
fi

APP_NAME="$1"

# Function to display error messages and exit with status code 1
display_error() {
  echo "Error: $1"
  exit 1
}

# Validation: Check if the git repository is clean (all files committed)
status_output=$(git status --porcelain)

if [ -n "$status_output" ]; then
  display_error "Working directory is not clean. There are uncommitted changes in the repository."
fi

# Validation: Check Docker Installation
if ! command -v docker &> /dev/null; then
  display_error "Docker is not installed. Please install Docker before running this script."
fi

# Validation: Check Docker Daemon Status
if ! docker info &> /dev/null; then
  display_error "Docker daemon is not running. Start the Docker daemon and try again."
fi

# Validation: Check Dockerfile Existence
if [ ! -f "Dockerfile" ]; then
  display_error "Dockerfile not found in the current directory. Aborting the build."
fi


# Validation: Check Registry Authentication
if [ -z "$CONTAINER_REGISTRY_AUTH" ]; then
  display_error "Docker registry credentials not provided. Aborting the build."
fi

# Validation: Check Internet Connectivity
if ! ping -c 1 google.com &> /dev/null; then
  display_error "No internet connectivity. Ensure you have internet access before building the image."
fi

# Validation: Check Available Disk Space (Minimum 5GB required)
REQUIRED_DISK_SPACE=5000000 # 5GB in KB
AVAILABLE_DISK_SPACE=$(df -k . | awk 'NR==2 {print $4}')
if [ "$AVAILABLE_DISK_SPACE" -lt "$REQUIRED_DISK_SPACE" ]; then
  display_error "Insufficient disk space. At least 5GB of free space is required."
fi

# If all validations passed, proceed with the Docker image build and push
echo "All validations passed. Starting Docker image build"
docker build . -f Dockerfile --platform linux/x86_64 -t registry.digitalocean.com/itfofficial/$APP_NAME

echo "Attempt login to container registry"
docker login registry.digitalocean.com/itfofficial -u "$CONTAINER_REGISTRY_AUTH" -p "$CONTAINER_REGISTRY_AUTH"
if [ $? -ne 0 ]; then
  display_error "Docker registry login failed. Please check your credentials and try again." 
fi

echo "Push built image to to container registry"
docker push registry.digitalocean.com/itfofficial/$APP_NAME

echo "Docker image published successfully registry.digitalocean.com/itfofficial/$APP_NAME"
