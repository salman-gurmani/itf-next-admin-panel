import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  FunctionField,
  List,
  NumberField,
  NumberInput,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { v4 as uuidv4 } from "uuid";
const validateCardOrderEdit = (values: any) => {
  const errors: any = {};

  return errors;
};
const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];
export const OrdersList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <DateField source="createdAt" label="Order Date" showTime />
        <TextField source="status" label="Status" />
        <FunctionField
          label="Order by"
          render={function (record: any) {
            return `${record.Person.givenName} ${record.Person.familyName}`;
          }}
        />
        <FunctionField
          label="Ship to"
          render={function (record: any) {
            return `${record.shippingDetails.city}, ${record.shippingDetails.country}`;
          }}
        />
        <NumberField source="items.length" label="Total cards" />
        <BooleanField source="Membership.isGroup" label="Group" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const OrderEdit = (props: any) => {
  console.log(props);
  const record = useRecordContext();
  console.log(record);
  return (
    <Edit {...props} redirect="list">
      <SimpleForm validate={validateCardOrderEdit}>
        <DateInput source="createdAt" label="Order Date" disabled />

        <TextInput label="First Name" source="Person.givenName" disabled />
        <TextInput label="Last Name" source="Person.familyName" disabled />
        <TextInput label="City" source="shippingDetails.city" disabled />
        <TextInput
          label="Address"
          source="shippingDetails.address"
          disabled
          fullWidth
        />
        <TextInput
          label="Additional Address"
          source="shippingDetails.address2"
          disabled
        />
        <TextInput label="Country" source="shippingDetails.country" disabled />
        <NumberInput source="items.length" label="Total cards" disabled />
        <BooleanInput source="Membership.isGroup" label="Group" disabled />
        <SelectInput
          source="status"
          label="Status"
          defaultValue="submitted"
          isRequired
          choices={[
            { id: "cancelled", name: "Cancelled" },
            { id: "complete", name: "Complete" },
            { id: "processing", name: "Processing" },
            { id: "readyToShip", name: "Ready To Ship" },
            { id: "submitted", name: "Submitted" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
