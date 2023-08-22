import {
  Datagrid,
  DateField,
  EditButton,
  List,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { v4 as uuidv4 } from "uuid";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];
export const PersonList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <TextField source="givenName" label="Given Name" />
        <TextField source="familyName" label="Family Name" />
        <DateField source="dob" label="DOB" />

        <TextField source="nationality" label="Nationality" />
        <TextField source="email" label="Email" />

        <TextField source="gender" label="Gender" />
        <TextField source="residence" label="Residence" />
        <TextField source="itfBackground" label="ITF Background" />

        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const PersonShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="id" label="ID" />
        <TextField source="givenName" label="Given Name" />
        <TextField source="familyName" label="Family Name" />
        <DateField source="dob" label="DOB" />

        <TextField source="nationality" label="Nationality" />
        <TextField source="email" label="Email" />

        <TextField source="gender" label="Gender" />
        <TextField source="residence" label="Residence" />
        <TextField source="itfBackground" label="ITF Background" />
        <TextField source="remarks" label="Remarks" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
