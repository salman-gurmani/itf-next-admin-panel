import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
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
import { v4 as uuidv4 } from "uuid";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useTranslate, useGetMany, useRecordContext } from "react-admin";

import { styled } from "@mui/material/styles";
import { get, map, startCase } from "lodash";
import {
  IndividualMembership,
  LeaderOfGroup,
  MemberOfGroups,
} from "@/helpers/types";
import { CountriesSelect } from "@/helpers/helpers";

export const TableCellRight = styled(TableCell)({ textAlign: "right" });
const IndividualMemberships = () => {
  const record = useRecordContext();
  const individualMemberships = get(
    record,
    "history.individualMemberships",
    []
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Membership Number</Typography>{" "}
          </TableCell>
          <TableCellRight>Type</TableCellRight>
          <TableCellRight>Valid Until</TableCellRight>
          <TableCellRight>Expired</TableCellRight>
          <TableCellRight>Active</TableCellRight>
          <TableCellRight>Deleted</TableCellRight>
          <TableCellRight>Created At</TableCellRight>
          <TableCellRight>Updated At</TableCellRight>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(individualMemberships, (membership: IndividualMembership) => (
          <TableRow key={membership.id}>
            <TableCell>
              <Link to={`/membership/individual/${membership.id}/show`}>
                {membership.membershipNumber}
              </Link>
            </TableCell>
            <TableCellRight>{startCase(membership.type)}</TableCellRight>
            <TableCellRight>
              {new Date(membership.validUntil).toDateString()}
            </TableCellRight>
            <TableCellRight>
              {membership.isExpired ? "Yes" : "No"}
            </TableCellRight>
            <TableCellRight>
              {membership.isActive ? "Yes" : "No"}
            </TableCellRight>
            <TableCellRight>
              {membership.isDeleted ? "Yes" : "No"}
            </TableCellRight>
            <TableCellRight>
              {new Date(membership.createdAt).toDateString()}
            </TableCellRight>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const MemberOfGroupsView = () => {
  const record = useRecordContext();
  const memberOfGroups = get(record, "history.memberOfGroups", []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Parent Membrship</Typography>{" "}
          </TableCell>
          <TableCell>Membership Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(memberOfGroups, (member: MemberOfGroups) => (
          <TableRow key={uuidv4()}>
            <TableCell>
              <Link to={`/membership/group/${member.parentMembership}/show`}>
                {member.parentMembership}
              </Link>
            </TableCell>
            <TableCell>{member.membershipNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const LeaderOfGroupsView = () => {
  const record = useRecordContext();
  const leaderOfGroups = get(record, "history.leaderOfGroups", []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Group Name</Typography>{" "}
          </TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Membership Number</TableCell>
          <TableCell>Expired</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Deleted</TableCell>
          <TableCell>Valid Until</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(leaderOfGroups, (member: LeaderOfGroup) => (
          <TableRow key={uuidv4()}>
            <TableCell>
              {member.isDeleted ? (
                <span>{member.groupName}</span>
              ) : (
                <Link to={`/membership/group/${member.id}/show`}>
                  {member.groupName}
                </Link>
              )}
            </TableCell>
            <TableCell>{member.type}</TableCell>
            <TableCell>{member.membershipNumber}</TableCell>
            <TableCell>{member.isExpired ? "Yes" : "No"}</TableCell>
            <TableCell>{member.isActive ? "Yes" : "No"}</TableCell>
            <TableCell>{member.isDeleted ? "Yes" : "No"}</TableCell>
            <TableCell>{new Date(member.validUntil).toDateString()}</TableCell>
            <TableCell>{new Date(member.createdAt).toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

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
        <Typography variant="h6">Individual Memberships</Typography>
        <IndividualMemberships />
        <Typography variant="h6">Member of Groups</Typography>
        <MemberOfGroupsView />
        <Typography variant="h6">Leader of Groups</Typography>
        <LeaderOfGroupsView />
      </SimpleShowLayout>
    </Show>
  );
};

const validateCardOrderEdit = (values: any) => {
  const errors: any = {};

  return errors;
};

export const PersonEdit = (props: any) => {
  const record = useRecordContext();

  return (
    <Edit {...props} redirect="list">
      <SimpleForm validate={validateCardOrderEdit}>
        <TextInput source="givenName" label="Given Name" />
        <TextInput source="familyName" label="Family Name" />
        <DateInput source="dob" label="DOB" />

        <CountriesSelect source="nationality" label="Nationality" />
        <TextInput source="email" label="Email" />

        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { id: "male", name: "Male" },
            { id: "female", name: "Female" },
          ]}
        />
        <CountriesSelect source="residence" label="Residence" />
        <TextInput source="itfBackground" label="ITF Background" />
        <TextInput source="remarks" label="Remarks" fullWidth />
      </SimpleForm>
    </Edit>
  );
};
