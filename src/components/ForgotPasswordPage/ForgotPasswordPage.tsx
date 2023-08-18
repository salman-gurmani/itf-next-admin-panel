import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@material-ui/core";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setOpen(false);
      setToastOpen(true);
      setToastMessage("Password reset email sent!");
    } catch (error: any) {
      setToastOpen(true);
      setToastMessage(error.message);
    }
  };

  const handleOnChange = (event: any) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handleToastClose = () => {
    setToastOpen(false);
    setToastOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "16px",
        paddingTop: "0px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ width: "100%" }}
      >
        Forgot Password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Send Password Reset?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A password reset will be sent to the following email:
          </DialogContentText>
          <TextField
            id="filled-basic"
            label="Email"
            type="email"
            variant="filled"
            style={{ width: "100%" }}
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            autoFocus
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={toastOpen}
        onClose={handleToastClose}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        message={toastMessage}
      ></Snackbar>
    </div>
  );
}
