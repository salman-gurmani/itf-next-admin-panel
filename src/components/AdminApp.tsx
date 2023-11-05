"use client"; // only needed if you choose App Router
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { FirebaseAuthProvider, RAFirebaseOptions } from "react-admin-firebase";
import {
  GroupMembershipShow,
  GroupMembershipsList,
  GroupMembershipEdit,
  GroupMembershipCreate,
  IndividualMembershipShow,
  IndividualMembershipsList,
  IndividualMembershipCreate,
  IndividualMembershipEdit,
  OrderEdit,
  OrderShow,
  OrdersList,
} from "./Views";

import { DataProvider } from "./DataProvider";
import { LoginPage } from "./LoginPage";
import { defaultTheme } from "react-admin";
import firebase from "firebase/compat/app";
import firebaseConfig from "../../firebase.config";
import { PersonEdit, PersonList, PersonShow } from "./Views/Persons";

import { EventsList, EventDetailsShow } from "./Views/Events";
import {
  GroupMembersList,
  GroupMembersShow,
  CreateGroupMember,
} from "./Views/GroupMembers";

import {
  MembershipPricingEdit,
  MembershipPricingList,
  MembershipPricingShow,
} from "./Views/MembershipPricing";

const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    RaDatagrid: {
      styleOverrides: {
        root: {
          backgroundColor: "Lavender",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "MistyRose",
          },
        },
      },
    },
  },
};
const options: RAFirebaseOptions = {};
firebase.initializeApp(firebaseConfig);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => (
  <Admin
    dataProvider={DataProvider}
    authProvider={authProvider}
    requireAuth
    loginPage={LoginPage}
  >
    <Resource
      name="membership/individual"
      options={{ label: "Individual Memberships" }}
      list={IndividualMembershipsList}
      show={IndividualMembershipShow}
      edit={IndividualMembershipEdit}
      create={IndividualMembershipCreate}
    />
    <Resource
      name="membership/group"
      options={{ label: "Group Memberships" }}
      list={GroupMembershipsList}
      show={GroupMembershipShow}
      edit={GroupMembershipEdit}
      create={GroupMembershipCreate}
    />

    <Resource
      name="orders/cards"
      options={{ label: "Orders" }}
      list={OrdersList}
      edit={OrderEdit}
      show={OrderShow}
    />
    <Resource
      name="persons"
      options={{ label: "Persons" }}
      list={PersonList}
      show={PersonShow}
      edit={PersonEdit}
    />
    <Resource
      name="groupMembers"
      options={{ label: "Group Members" }}
      list={GroupMembersList}
      show={GroupMembersShow}
      create={CreateGroupMember}
    />
    <Resource
      name="price"
      options={{ label: "Membership Pricing" }}
      list={MembershipPricingList}
      show={MembershipPricingShow}
      edit={MembershipPricingEdit}
    />
    <Resource
      name="events"
      options={{ label: "Events" }}
      list={EventsList}
      show={EventDetailsShow}
    />
  </Admin>
);

export default AdminApp;
