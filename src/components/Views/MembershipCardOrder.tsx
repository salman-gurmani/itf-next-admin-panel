import {
  BooleanField,
  BooleanInput,
  BulkExportButton,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  FunctionField,
  Link,
  List,
  NumberField,
  NumberInput,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { NoListRecords } from "./Common";
import { v4 as uuidv4 } from "uuid";
import { filter, get, map, startCase } from "lodash";
import { styled } from "@mui/material/styles";
import { Item } from "@/helpers/types";
import { json2csv } from "json-2-csv";
const validateCardOrderEdit = (values: any) => {
  const errors: any = {};

  return errors;
};
const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];

function getFormattedDate(dd: Date) {
  var date = new Date(dd);
  const year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

const exporter = async (records: any[]) => {
  const groupOrderJson: any = [];
  const IndividualOrderJson: any = [];
  const date = new Date();
  const fullDate =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  map(
    filter(records, (rec: any) => rec.Membership.isGroup),
    (record) => {
      const groupName = record.Membership.groupName;
      const membershipType = record.Membership.type;
      const isExpired = record.Membership.isExpired;
      const validUntil = getFormattedDate(record.Membership.validUntil);
      const shippingAddress =
        record.shippingDetails.address +
        "," +
        record.shippingDetails.additionalAddress +
        "," +
        record.shippingDetails.postalCode +
        "," +
        record.shippingDetails.city +
        "," +
        record.shippingDetails.state +
        "," +
        record.shippingDetails.country;
      const billingAddress =
        record.billingAddress.address +
        "," +
        record.billingAddress.additionalAddress +
        "," +
        record.billingAddress.postalCode +
        "," +
        record.billingAddress.city +
        "," +
        record.billingAddress.state +
        "," +
        record.billingAddress.country;
      const phone = record.shippingDetails.phone;
      const group = {
        "Group Name": groupName,
        "Membership Type": membershipType,
        "Member Type": "Leader",
        Expired: isExpired,
        "Validity:": validUntil,
        Name: record.Person.givenName + " " + record.Person.familyName,
        Nationality: record.Person.nationality,
        "Membership Number": record.Membership.membershipNumber,
        "Date of Birth": getFormattedDate(record.Person.dob),
        "Shipping Address": shippingAddress,
        "Billing Address": billingAddress,

        Phone: phone,
      };
      groupOrderJson.push(group);

      map(get(record, "items", []), (item: Item) => {
        const Person = {
          "Group Name": groupName,
          "Membership Type": membershipType,
          "Member Type": "Member",
          Name: item.Person.givenName + " " + item.Person.familyName,
          Nationality: item.Person.nationality,
          "Date of Birth": getFormattedDate(item.Person.dob),
          "Shipping Address": shippingAddress,
          "Billing Address": billingAddress,
          Expired: isExpired,
          "Validity:": validUntil,
          Phone: phone,
        };
        groupOrderJson.push(Person);
      });
    }
  );
  if (groupOrderJson.length > 0) {
    const content = await json2csv(groupOrderJson);
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Group-Membership-Orders-" + fullDate + ".csv";
    a.click();
  }
  // Individual Membership
  map(
    filter(records, (rec: any) => !rec.Membership.isGroup),
    (record) => {
      const membershipType = startCase(record.Membership.type);
      const isExpired = record.Membership.isExpired;
      const validUntil = getFormattedDate(record.Membership.validUntil);
      const shippingAddress =
        record.shippingDetails.address +
        "," +
        record.shippingDetails.additionalAddress +
        "," +
        record.shippingDetails.postalCode +
        "," +
        record.shippingDetails.city +
        "," +
        record.shippingDetails.state +
        "," +
        record.shippingDetails.country;
      const billingAddress =
        record.billingAddress.address +
        "," +
        record.billingAddress.additionalAddress +
        "," +
        record.billingAddress.postalCode +
        "," +
        record.billingAddress.city +
        "," +
        record.billingAddress.state +
        "," +
        record.billingAddress.country;
      const phone = record.shippingDetails.phone;
      const person = {
        Name: record.Person.givenName + " " + record.Person.familyName,
        Nationality: record.Person.nationality,
        Expired: isExpired,
        "Validity:": validUntil,
        "Membership Type": membershipType,
        "Membership Number": record.Membership.membershipNumber,
        "Date of Birth": getFormattedDate(record.Person.dob),
        "Shipping Address": shippingAddress,
        "Billing Address": billingAddress,

        Phone: phone,
      };
      IndividualOrderJson.push(person);
    }
  );
  if (IndividualOrderJson.length > 0) {
    const content = await json2csv(IndividualOrderJson);
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Individial-Memberships-Orders-" + fullDate + ".csv";
    a.click();
  }
};

export const TableCellRight = styled(TableCell)({ textAlign: "right" });
const OrderDetails = () => {
  const record = useRecordContext();
  const individualMemberships = get(record, "items", []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Item</Typography>{" "}
          </TableCell>

          <TableCellRight>Person Id</TableCellRight>
          <TableCellRight>Membership Id</TableCellRight>
          <TableCellRight>Group Member Id</TableCellRight>
          <TableCellRight>Name</TableCellRight>
          <TableCellRight>Date of Birth</TableCellRight>
          <TableCellRight>Nationality</TableCellRight>

          <TableCellRight>Price</TableCellRight>
          <TableCellRight>Quantity</TableCellRight>
          <TableCellRight>Created At</TableCellRight>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(individualMemberships, (item: Item) => (
          <TableRow key={item.id}>
            <TableCellRight>{startCase(item.item)}</TableCellRight>
            <TableCell>
              <Link to={`/persons/${item.personId}/show`}>{item.personId}</Link>
            </TableCell>
            <TableCell>
              <Link to={`/membership/group/${item.membershipId}/show`}>
                {item.membershipId}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`/groupMembers/${item.groupMemberId}/show`}>
                {item.groupMemberId}
              </Link>
            </TableCell>

            <TableCellRight>
              {item.Person.givenName + " " + item.Person.familyName}
            </TableCellRight>
            <TableCellRight>{getFormattedDate(item.Person.dob)}</TableCellRight>
            <TableCellRight>{item.Person.nationality}</TableCellRight>
            <TableCellRight>{item.price}</TableCellRight>
            <TableCellRight>{item.quantity}</TableCellRight>

            <TableCellRight>
              {new Date(item.createdAt).toDateString()}
            </TableCellRight>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
function PostBulkActionButtons() {
  return <BulkExportButton exporter={exporter} />;
}
export const OrdersList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid
        rowClick="show"
        empty={<NoListRecords />}
        bulkActionButtons={<PostBulkActionButtons />}
      >
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
  const record = useRecordContext();

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

export const OrderShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <DateField source="createdAt" label="Order Date" disabled />

        <TextField label="First Name" source="Person.givenName" disabled />
        <TextField label="Last Name" source="Person.familyName" disabled />
        <TextField label="City" source="shippingDetails.city" disabled />
        <TextField
          label="Address"
          source="shippingDetails.address"
          disabled
          fullWidth
        />
        <TextField
          label="Additional Address"
          source="shippingDetails.address2"
          disabled
        />
        <TextField label="Country" source="shippingDetails.country" disabled />
        <NumberField source="items.length" label="Total cards" disabled />
        <BooleanField source="Membership.isGroup" label="Group" disabled />
        <TextField source="status" label="Status" />
        <Typography variant="h6">Order Details</Typography>
        <OrderDetails />
      </SimpleShowLayout>
    </Show>
  );
};
