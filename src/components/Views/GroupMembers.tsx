import {
  BooleanField,
  Create,
  Datagrid,
  DateField,
  DateInput,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { startCase } from "lodash";
import { v4 as uuidv4 } from "uuid";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
  <ReferenceInput
    source="parentMembership"
    reference="membership/group"
    key={uuidv4()}
  >
    <SelectInput optionText="groupName" />
  </ReferenceInput>,
];
export const GroupMembersList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
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
        <ReferenceField
          source="parentMembership"
          reference="membership/group"
          link="show"
        >
          <FunctionField
            sx={{ textDecoration: "underline", color: "blueviolet" }}
            label="Group Name"
            render={function (record: any) {
              return `${startCase(record.groupName)}`;
            }}
          />
        </ReferenceField>
        <TextField source="membershipNumber" label="Membership Number" />
        <BooleanField
          source="isMembershipCardRequested"
          label="Membership Card Requested"
        />

        <TextField source="currentRank" label="Current Rank" />
        <TextField source="martialArtsStyle" label="Martial Arts Style" />

        <DateField source="createdAt" label="Created At" />

        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const GroupMembersShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="membershipNumber" label="Membership Number" />

        <BooleanField
          source="isMembershipCardRequested"
          label="Membership Card Requested"
        />
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
        <TextField source="currentRank" label="Current Rank" />
        <TextField source="martialArtsStyle" label="Martial Arts Style" />

        <DateField source="createdAt" label="Created At" />
      </SimpleShowLayout>
    </Show>
  );
};

export const CreateGroupMember = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="groupMembershipId" reference="membership/group">
          <SelectInput optionText="groupName" optionValue="id" />

          {/* <SelectInput optionText="id" /> */}
        </ReferenceInput>
        <TextInput
          source="groupMembershipNumber"
          label="Group Membership Number"
        />
        <TextInput source="givenName" label="First Name" />
        <TextInput source="familyName" label="Last Name" />
        <DateInput source="dob" label="Date of Birth" />
        <TextInput source="nationality" label="Nationality" />
        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { id: "male", name: "Male" },
            { id: "female", name: "Female" },
          ]}
        />{" "}
        <TextInput source="residence" label="Residence" />
        <TextInput source="email" label="Email" />
        <TextInput source="itfBackground" label="ITF Background" />
        <TextInput source="currentRank" label="Current Rank" />
        <TextInput source="martialArtsStyle" label="Martial Arts Style" />
      </SimpleForm>
    </Create>
  );
};
