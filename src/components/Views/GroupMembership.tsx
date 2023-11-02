import {
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EmailField,
  FunctionField,
  List,
  NumberField,
  ReferenceInput,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  DeleteWithConfirmButton,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import { CountriesSelect } from "@/helpers/helpers";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
  <BooleanInput
    label="Expired Memberships"
    source={"isExpired"}
    key={uuidv4()}
  />,
];
export const GroupMembershipsList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <TextField source="membershipNumber" label="Membership Number" />
        <TextField source="groupName" label="Group Name" />
        <ChipField source="type" label="Membership Type" />
        <NumberField source="_count.GroupMember" label="Total Members" />
        <FunctionField
          label="Leader Name"
          render={function (record: any) {
            return `${record.Person.givenName} ${record.Person.familyName}`;
          }}
        />
        <TextField source="Person.residence" label="Country" />
        <EmailField source="Person.email" label="Email" />
        <DateField source="validUntil" label="Expiry Date" />
        <DateField source="updatedAt" label="Last Modified" showTime />
        {/* <ShowButton /> */}
        <EditButton />
        <DeleteWithConfirmButton
          confirmContent="You will not be able to recover this record. Are you sure?"
          translateOptions={{ name: props.id }}
          confirmTitle="Delete this record"
        />
      </Datagrid>
    </List>
  );
};

export const GroupMembershipShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="membershipNumber" label="Membership Number" />
        <TextField source="groupName" label="Group Name" />
        <TextField source="Person.givenName" label="Name" />
        <TextField source="Person.familyName" label="Family Name" />
        <TextField source="Person.gender" label="Gender" />

        <BooleanField source="isActive" label="Active" />
        <BooleanField source="isExpired" label="Expired" />
        <DateField source="validUntil" label="Valid Until" />
        <TextField source="Person.residence" label="Country" />
        <EmailField source="Person.email" label="Email" />
        <DateField source="Person.dob" label="Date of Birth" />
        <ChipField source="type" label="Membership Type" />
        <TextField source="martialArtsOrg" label="Martial Arts Organization" />
        {/* <ImageField source="profilePicture" label="Profile Picture" /> */}
        {/* <UrlField source="profilePicture" label="Profile Picture" /> */}
        <TextField source="Person.itfBackground" label="ITF Background" />
        {/* <TextField source="documents" label="Documents" />
        <TextField source="address1" label="Address " />
        <TextField source="address2" label="Additional Address " />
        <TextField source="city" label="City " />
        <TextField source="state" label="State " />
        <TextField source="postalCode" label="PostalCode " /> */}
        {/* <TextField source="paypalEmail" label="Paypal Email" /> */}
        <TextField source="Person.nationality" label="Nationality" />
        <DateField source="createdAt" label="Date Created" showTime />
        <DateField source="updatedAt" label="Date Modified" showTime />
        {/* <TextField source="createdBy" label="Created By" />
        <TextField source="lastModifiedBy" label="Last Modified By" /> */}
        {/* <TextField source="status" label="Status" /> */}
      </SimpleShowLayout>
    </Show>
  );
};
export const GroupMembershipEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="membershipNumber" label="Membership Number" />
        <TextInput source="groupName" label="Group Name" />

        <SelectInput
          source="isActive"
          label="Is Active"
          choices={[
            { id: true, name: "True" },
            { id: false, name: "False" },
          ]}
        />
        <SelectInput
          source="isExpired"
          label="Is Expired"
          choices={[
            { id: true, name: "True" },
            { id: false, name: "False" },
          ]}
        />
        <SelectInput
          source="type"
          label="Membership Type"
          choices={[
            { id: "dojang", name: "Dojang" },
            { id: "school", name: "School" },
            { id: "association", name: "Association" },
          ]}
        />
        <DateInput source="validUntil" label="Expiry Date" />
        <TextInput source="martialArtsOrg" label="Martial Arts Organization" />
      </SimpleForm>
    </Edit>
  );
};
export const GroupMembershipCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <Typography variant="h6">Personal Details</Typography>

        <TextInput source="givenName" label="First Name" />
        <TextInput source="familyName" label="Last Name" />
        <DateInput source="dob" label="Date of Birth" />
        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { id: "male", name: "Male" },
            { id: "female", name: "Female" },
            { id: "other", name: "Other" },
          ]}
        />
        <TextInput source="email" label="Email" />
        <CountriesSelect source="nationality" label="Nationality" />
        <CountriesSelect source="residence" label="Residence" />
        <TextInput source="groupName" label="Group Name" />
        {/* <ReferenceInput source="groupName" reference="membership/group">
          <SelectInput optionText="groupName" optionValue="groupName" />
        </ReferenceInput> */}
        <SelectInput
          source="membershipType"
          label="Membership Type"
          choices={[
            { id: "dojang", name: "Dojang" },
            { id: "school", name: "School" },
            { id: "association", name: "Association" },
          ]}
        />
        <TextInput source="itfBackground" label="ITF Background" />
        <TextInput source="martialArtsOrg" label="Martial Arts Organization" />
        <TextInput source="membershipNumber" label="Membership Number" />
        <BooleanInput
          source="isMembershipCardRequested"
          label="Membership Card Requested"
        />
        <DateInput source="validUntil" label="Membership Valid Until" />
        <DateInput source="createdAt" label="Membership Created At" />
      </SimpleForm>
    </Create>
  );
};
