"use client"; // only needed if you choose App Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { FirebaseAuthProvider, RAFirebaseOptions } from "react-admin-firebase";
import {
  GroupMembershipShow,
  GroupMembershipsList,
  IndividualMembershipShow,
  IndividualMembershipsList,
  OrderEdit,
  OrdersList,
} from "./Views";

import { DataProvider } from "./DataProvider";
import { LoginPage } from "./LoginPage";
import { defaultTheme } from "react-admin";
import firebase from "firebase/compat/app";
import firebaseConfig from "../../firebase.config";
import { PersonList, PersonShow } from "./Views/Persons";
import { GroupMembersList, GroupMembersShow } from "./Views/GroupMembers";
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
    />
    <Resource
      name="membership/group"
      options={{ label: "Group Memberships" }}
      list={GroupMembershipsList}
      show={GroupMembershipShow}
    />

    <Resource
      name="orders/cards"
      options={{ label: "Orders" }}
      list={OrdersList}
      edit={OrderEdit}
    />
    <Resource
      name="persons"
      options={{ label: "Persons" }}
      list={PersonList}
      show={PersonShow}
    />
    <Resource
      name="groupMembers"
      options={{ label: "Group Members" }}
      list={GroupMembersList}
      show={GroupMembersShow}
    />
    <Resource
      name="price"
      options={{ label: "Membership Pricing" }}
      list={MembershipPricingList}
      show={MembershipPricingShow}
      edit={MembershipPricingEdit}
    />
  </Admin>
);

export default AdminApp;
