import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  Link,
  List,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
  BulkExportButton,
} from "react-admin";

import { NoListRecords } from "./Common";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  Button,
} from "@material-ui/core";
import { Person } from "@/helpers/types";
import { get, map } from "lodash";
import { json2csv } from "json-2-csv";

import { v4 as uuidv4 } from "uuid";
const Filters = [
  <TextInput key={uuidv4()} label="Search" source="q" alwaysOn />,
];

export const EventsList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid
        rowClick="show"
        empty={<NoListRecords />}
        bulkActionButtons={<PostBulkActionButtons />}
      >
        <TextField source="title" label="Title" />
        <TextField source="subTitle" label="Sub Title" />
        <DateField source="startingDate" label="Starting Date" />
        <DateField source="endingDate" label="Ending Date" />
        <BooleanField source="RegistertionOpen" label="Registration Open" />
        <TextField source="organizerName" label="Organizer Name" />
        <FunctionField
          label="Number of Registered Persons"
          render={(record: { registrations: any[] }) => {
            return record.registrations.length;
          }}
        />

        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
export const EventDetailsShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="data.attributes.title" label="Title" />
        <TextField source="data.attributes.subTitle" label="Sub Title" />
        <DateField
          source="data.attributes.startingDate"
          label="Starting Date"
        />
        <DateField source="data.attributes.endingDate" label="Ending Date" />
        <BooleanField
          source="data.attributes.RegistertionOpen"
          label="Registration Open"
        />
        <TextField
          source="data.attributes.organizerName"
          label="Organizer Name"
        />
        <Typography variant="h6">Persons Registered</Typography>
        <EventMembers />
      </SimpleShowLayout>
    </Show>
  );
};
export const TableCellLeft = styled(TableCell)({ textAlign: "left" });

const EventMembers = () => {
  const record = useRecordContext();
  const EventMembersList = get(record, "registrations", []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Person ID</Typography>{" "}
          </TableCell>
          <TableCellLeft>First Name</TableCellLeft>
          <TableCellLeft>Last Name</TableCellLeft>
          <TableCellLeft>Date of Birth</TableCellLeft>
          <TableCellLeft>Nationality</TableCellLeft>
          <TableCellLeft>Gender</TableCellLeft>
          <TableCellLeft>Email</TableCellLeft>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(EventMembersList, (persons: Person) => (
          <TableRow key={persons.id}>
            <TableCell>
              <Link to={`/persons/${persons.id}/show`}>{persons.id}</Link>
            </TableCell>
            <TableCellLeft>{persons.givenName}</TableCellLeft>
            <TableCellLeft>{persons.familyName}</TableCellLeft>
            <TableCellLeft>
              {new Date(persons.dob).toDateString()}
            </TableCellLeft>
            <TableCellLeft>{persons.nationality}</TableCellLeft>
            <TableCellLeft>{persons.gender}</TableCellLeft>
            <TableCellLeft>{persons.email}</TableCellLeft>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function PostBulkActionButtons() {
  return <BulkExportButton exporter={exporter} />;
}
const exporter = async (records: any) => {
  map(records, async (record) => {
    const EventDetailsJson = [];

    // Event details
    const eventDetails = {
      Title: record.title,
      "Sub Title": record.subTitle,
      "Short Description": record.shortDescription,
      Content: record.content,
      "Registration Open": record.RegistertionOpen,
      "Starting Date": record.startingDate,
      "Ending Date": record.endingDate,
      "Organizer Name": record.organizerName,
      "Organizer Email": record.organizerEmail,
      "Is Featured Event": record.isFeaturedEvent,
      "Created At": record.createdAt,
      "Updated At": record.updatedAt,
      "Published At": record.publishedAt,
    };
    EventDetailsJson.push(eventDetails);

    // Person details
    const eventMembersList = get(record, "registrations", []);
    map(eventMembersList, (persons) => {
      const personDetails = {
        "First Name": persons.givenName,
        "Last Name": persons.familyName,
        "Date of Birth": persons.dob,
        "Person ID": persons.id,
        Email: persons.email,
        Residence: persons.residence,
      };
      EventDetailsJson.push(personDetails);
    });

    // Convert the data to CSV
    const content = await json2csv(EventDetailsJson);
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });

    // Set the filename based on the event title
    a.href = URL.createObjectURL(file);
    a.download = `${record.title}.csv`;
    a.click();
  });
};
