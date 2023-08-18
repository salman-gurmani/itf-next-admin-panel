import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { startCase } from "lodash";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn />,
  <ReferenceInput source="parentMembership" reference="membership/group">
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
