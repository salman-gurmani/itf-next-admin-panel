import {
  Datagrid,
  DateField,
  List,
  ShowButton,
  TextField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
  Create,
  ImageField,
  UrlField,
} from "react-admin";
import { v4 as uuidv4 } from "uuid";

const validateSingleMembershipEdit = (values: any) => {
  const errors: any = {};

  if (!values.givenName) {
    errors.givenName = { message: "Given Name is required" };
  }

  return errors;
};
const validateSingleMembershipCreate = (values: any) => {
  const errors: any = {};

  if (!values.givenName) {
    errors.givenName = { message: "Given Name is required" };
  }

  return errors;
};
const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];
const SingleMembershipsList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show">
        <TextField source="givenName" label="Name" />
        <TextField source="familyName" label="Family Name" />
        <TextField source="gender" label="Gender" />
        <TextField source="country" label="Country" />
        <TextField source="phone" label="Phone" />
        <TextField source="email" label="Email" />
        <TextField source="membershipType" label="Membership Type" />
        <TextField source="membershipNumber" label="Membership Number" />
        <TextField source="paypalEmail" label="Paypal Email" />
        <DateField source="nationality" label="Nationality" showTime />
        <DateField source="updatedAt" label="Date Modified" showTime />
        <TextField source="createdBy" label="Created By" />
        <TextField source="lastModifiedBy" label="Last Modified By" />
        <TextField source="status" label="Status" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const SingleMembershipShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="givenName" label="Name" />
        <TextField source="familyName" label="Family Name" />
        <TextField source="gender" label="Gender" />
        <TextField source="country" label="Country" />
        <TextField source="phone" label="Phone" />
        <TextField source="email" label="Email" />
        <TextField source="dob" label="Date of Birth" />
        <TextField source="membershipType" label="Membership Type" />
        <TextField source="martialArtsOrg" label="Martial Arts Organization" />
        <ImageField source="profilePicture" label="Profile Picture" />
        <UrlField source="profilePicture" label="Profile Picture" />
        <TextField source="itfBackground" label="ITF Background" />
        <TextField source="documents" label="Documents" />
        <TextField source="address1" label="Address " />
        <TextField source="address2" label="Additional Address " />
        <TextField source="city" label="City " />
        <TextField source="state" label="State " />
        <TextField source="postalCode" label="PostalCode " />
        <TextField source="membershipNumber" label="Membership Number" />
        <TextField source="paypalEmail" label="Paypal Email" />
        <DateField source="nationality" label="Nationality" showTime />
        <DateField source="updatedAt" label="Date Modified" showTime />
        <TextField source="createdBy" label="Created By" />
        <TextField source="lastModifiedBy" label="Last Modified By" />
        <TextField source="status" label="Status" />
      </SimpleShowLayout>
    </Show>
  );
};

const SingleMembershipEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm validate={validateSingleMembershipEdit}>
        <TextInput source="givenName" />
      </SimpleForm>
    </Edit>
  );
};

const SingleMembershipCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm validate={validateSingleMembershipCreate}>
        <TextInput source="givenName" />
      </SimpleForm>
    </Create>
  );
};
export {
  SingleMembershipsList,
  SingleMembershipShow,
  SingleMembershipEdit,
  SingleMembershipCreate,
};
