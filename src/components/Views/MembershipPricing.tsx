import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

import { Divider } from "@material-ui/core";
import { NoListRecords } from "./Common";
import { v4 as uuidv4 } from "uuid";

const Filters = [
  <TextInput label="Search" source="q" alwaysOn key={uuidv4()} />,
];
export const MembershipPricingList = (props: any) => {
  return (
    <List {...props} filters={Filters}>
      <Datagrid rowClick="show" empty={<NoListRecords />}>
        <TextField source="id" label="ID" />
        <TextField source="country" label="Country" />
        <BooleanField source="isStandardFeeApplicable" label="Standard Fee" />

        <TextField source="serviceType" label="Service Type" />
        <TextField
          source="membershipPrice.regular"
          label="Regular Membership Price"
        />

        <TextField
          source="membershipPrice.premium"
          label="Premium Membership Price"
        />
        <TextField source="shippingType" label="Shipping Type" />
        <TextField
          source="shippingPrice.smallBatch"
          label="Small Batch Price"
        />
        <TextField
          source="shippingPrice.largeBatch"
          label="Large Batch Price"
        />

        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const MembershipPricingShow = (props: any) => {
  return (
    <Show {...props}>
      <SimpleShowLayout divider={<Divider flexItem />}>
        <TextField source="id" label="ID" />
        <TextField source="country" label="Country" />
        <BooleanField source="isStandardFeeApplicable" label="Standard Fee" />

        <TextField source="serviceType" label="Service Type" />
        <TextField
          source="membershipPrice.regular"
          label="Regular Membership Price"
        />

        <TextField
          source="membershipPrice.premium"
          label="Premium Membership Price"
        />
        <TextField source="shippingType" label="Shipping Type" />
        <TextField
          source="shippingPrice.smallBatch"
          label="Small Batch Price"
        />
        <TextField
          source="shippingPrice.largeBatch"
          label="Large Batch Price"
        />
      </SimpleShowLayout>
    </Show>
  );
};

const validateMembershipPricingEdit = (values: any) => {
  const errors: any = {};

  return errors;
};
export const MembershipPricingEdit = (props: any) => {
  return (
    <Edit {...props} redirect="list">
      <SimpleForm validate={validateMembershipPricingEdit}>
        <TextInput source="country" label="Country" disabled />
        <BooleanInput source="isStandardFeeApplicable" label="Standard Fee" />

        <TextInput source="serviceType" label="Service Type" />
        <NumberInput
          source="membershipPrice.regular"
          label="Regular Membership Price"
        />

        <NumberInput
          source="membershipPrice.premium"
          label="Premium Membership Price"
        />
        <TextInput source="shippingType" label="Shipping Type" />
        <NumberInput
          source="shippingPrice.smallBatch"
          label="Small Batch Price"
        />
        <NumberInput
          source="shippingPrice.largeBatch"
          label="Large Batch Price"
        />
      </SimpleForm>
    </Edit>
  );
};
