import { BooleanField, Datagrid, DateField, Edit, EditButton, FunctionField, List, NumberField, ShowButton, SimpleForm, TextField, TextInput, useRecordContext } from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";

const Filters = [<TextInput label="Search" source="q" alwaysOn />];
export const OrdersList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <DateField source="createdAt" label="Order Date" showTime />
        <TextField source="status" label="Status" />
        <FunctionField label="Order by" render={function (record: any) {
          return `${record.Person.givenName} ${record.Person.familyName}`;
        }}/>
        <FunctionField label="Ship to" render={function (record: any) {
          return `${record.shippingDetails.city}, ${record.shippingDetails.country}`;
        }}/>
        <NumberField source="items.length" label="Total cards" />
        <BooleanField source="Membership.isGroup" label="Group" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const OrderEdit = (props: any) => {
  console.log(props)
  const record = useRecordContext();
  console.log(record)
  return (
    <Edit {...props}>
      <SimpleForm divider={<Divider flexItem />}>
        <TextField source="id" label="id" />
        <TextField source="status" label="Status" />
        <TextField source="membershipId" label="Membership" />
        {/* <NumberField source="_count.items" label="Total items" /> */}
        
        <DateField source="createdAt" label="Date Created" showTime />
        <DateField source="updatedAt" label="Date Modified" showTime />
      </SimpleForm>
    </Edit>
  );
};
