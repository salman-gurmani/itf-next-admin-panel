import {
  List,
  Datagrid,
  DateField,
  TextField,
  FunctionField,
  ShowButton,
  EditButton,
  TextInput,
  BooleanField,
  BooleanInput,
  DateInput,
  Edit,
  NumberField,
  NumberInput,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  useRecordContext,
} from "react-admin";
import { NoListRecords } from "./Common";

import { v4 as uuidv4 } from "uuid";
import { Divider } from "@material-ui/core";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];

export const OrdersSeatsList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <DateField source="createdAt" label="Order Date" showTime />
        <TextField source="quantity" label="Quantity" />
        <FunctionField
          label="Order by"
          render={function (record: any) {
            return `${record.Person.givenName} ${record.Person.familyName}`;
          }}
        />
        <TextField source="Membership.groupName" label="Group Name" />
        <TextField source="item" label="Product" />
        <TextField source="Order.status" label="Status" />
        <ShowButton />

        <EditButton />
      </Datagrid>
    </List>
  );
};
export const OrderSeatsEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateInput source="createdAt" label="Order Date" disabled />
        <TextInput label="First Name" source="Person.givenName" disabled />
        <TextInput label="Last Name" source="Person.familyName" disabled />
        <NumberInput source="items" label="Item" disabled />
        <NumberInput source="price" label="Price" disabled />
        <TextInput source="Membership.groupName" label="Group Name" disabled />
        <TextInput source="Membership.type" label="Membership Type" disabled />
        <TextInput source="quantity" label="Number of Seats Ordered" disabled />
        <SelectInput
          source="Order.status"
          label="Status"
          isRequired
          choices={[
            { id: "cancelled", name: "Cancelled" },
            { id: "complete", name: "Complete" },
            { id: "submitted", name: "Submitted" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const OrderSeatsShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <DateField source="createdAt" label="Order Date" disabled />
        <TextField label="First Name" source="Person.givenName" disabled />
        <TextField label="Last Name" source="Person.familyName" disabled />
        <TextField label="Item" source="item" />
        <NumberField source="price" label="Price" disabled />
        <BooleanField source="Membership.isGroup" label="Group" disabled />
        <TextField source="Membership.groupName" label="Group Name" />
        <TextField source="Membership.type" label="Membership Type" />
        <TextField source="quantity" label="Number of Seats Ordered" />
        <TextField source="Order.status" label="Status" />
      </SimpleShowLayout>
    </Show>
  );
};