import { FileInput, useRecordContext, FormDataConsumer } from "react-admin";

const VideoInput = (props: any) => {
  return (
    <FormDataConsumer>
      {({ formData, ...rest }) => (
        <FileInput {...props} {...rest}>
          <VideoField source={props.source} formData={formData} />
        </FileInput>
      )}
    </FormDataConsumer>
  );
};

const VideoField = ({ source, formData }: any) => {
  const record = useRecordContext();
  const videoFile = formData ? formData[source].src : record[source];
  if (videoFile)
    return (
      <video controls>
        <source src={formData ? formData[source].src : record[source]} />
        Your browser does not support the video tag.
      </video>
    );
  return null;
};

export { VideoInput, VideoField };
