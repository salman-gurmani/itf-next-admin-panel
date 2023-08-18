import {
  BooleanField,
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

const Filters = [<TextInput label="Search" source="q" alwaysOn />];
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
