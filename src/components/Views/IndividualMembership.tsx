import { Divider } from "@material-ui/core";
import {
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EmailField,
  FunctionField,
  List,
  ReferenceField,
  SelectField,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  DeleteWithConfirmButton,
} from "react-admin";

import { NoListRecords } from "./Common";
import { startCase } from "lodash";
import { v4 as uuidv4 } from "uuid";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];
export const IndividualMembershipsList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <TextField source="membershipNumber" label="Membership Number" />

        <ReferenceField source="personId" reference="persons" link="show">
          <FunctionField
            sx={{ textDecoration: "underline", color: "blueviolet" }}
            label="Person"
            render={function (record: any) {
              return `${startCase(record.givenName)} ${startCase(
                record.familyName
              )}`;
            }}
          />
        </ReferenceField>

        <TextField source="Person.residence" label="Country" />
        <DateField source="Person.dob" label="Date of Birth" />
        <EmailField source="Person.email" label="Email" />
        <ChipField
          source="type"
          variant="filled"
          color="success"
          label="Membership Type"
        />
        <DateField source="validUntil" label="Expiry Date" />
        <BooleanField source="isActive" label="Active" />

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

export const IndividualMembershipShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="membershipNumber" label="Membership Number" />

        <SelectField
          source="Person.gender"
          label="Gender"
          choices={[
            { id: "male", name: "Male" },
            { id: "female", name: "Female" },
          ]}
        />
        <ReferenceField source="personId" reference="persons" link="show">
          <FunctionField
            sx={{ color: "blueviolet" }}
            label="Person"
            render={function (record: any) {
              return `${startCase(record.givenName)} ${startCase(
                record.familyName
              )}`;
            }}
          />
        </ReferenceField>

        <TextField source="Person.residence" label="Country" />
        <EmailField source="Person.email" label="Email" />
        <DateField source="Person.dob" label="Date of Birth" />
        <ChipField source="type" label="Membership Type" />
        <TextField source="martialArtsOrg" label="Martial Arts Organization" />
        {/* <ImageField source="profilePicture" label="Profile Picture" /> */}
        {/* <UrlField source="profilePicture" label="Profile Picture" /> */}
        <BooleanField source="isActive" label="Active" />
        <DateField source="validUntil" label="Valid Until" />
        <TextField source="Person.itfBackground" label="ITF Background" />

        <TextField source="Person.remarks" label="Remarks" />
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
      </SimpleShowLayout>
    </Show>
  );
};

// const IndividualMembershipEdit = (props: any) => {
//   return (
//     <Edit {...props}>
//       <SimpleForm validate={validateIndividualMembershipEdit}>
//         <TextInput source="givenName" />
//       </SimpleForm>
//     </Edit>
//   );
// };
export const IndividualMembershipEdit = (props: any) => {
  console.log("test");
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="membershipNumber" label="Membership Number" />
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
            { id: "regular", name: "Regular" },
            { id: "premium", name: "Premium" },
          ]}
        />
        <DateInput source="validUntil" label="Expiry Date" />
        <TextInput source="martialArtsOrg" label="Martial Arts Organization" />
      </SimpleForm>
    </Edit>
  );
};

// const IndividualMembershipCreate = (props: any) => {
//   return (
//     <Create {...props}>
//       <SimpleForm validate={validateSingleMembershipCreate}>
//         <TextInput source="givenName" />
//       </SimpleForm>
//     </Create>
//   );
// };

// const validateIndividualMembershipEdit = (values: any) => {
//   const errors: any = {};

//   if (!values.givenName) {
//     errors.givenName = { message: "Given Name is required" };
//   }

//   return errors;
// };
// const validateSingleMembershipCreate = (values: any) => {
//   const errors: any = {};

//   if (!values.givenName) {
//     errors.givenName = { message: "Given Name is required" };
//   }

//   return errors;
// };
