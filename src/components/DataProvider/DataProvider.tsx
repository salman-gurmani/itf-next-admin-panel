import firebase from "firebase/compat/app";
// import { FirebaseAuthProvider, RAFirebaseOptions } from "react-admin-firebase";

import _, { has } from "lodash";
import { stringify } from "query-string";
import { fetchUtils } from "react-admin";

import firebaseConfig from "../../../firebase.config";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const httpClient = fetchUtils.fetchJson;

// const options: RAFirebaseOptions = {};
firebase.initializeApp(firebaseConfig);

// const authProvider = FirebaseAuthProvider(firebaseConfig, options);
const DataProvider = {
  getList: (resource: any, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      if (has(json, "result.data"))
        return {
          ...json.result,
        };
      else
        return {
          data: { ...json.result },
        };
    });
  },

  getOne: (resource: any, params: any) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => json.result
    );
  },

  getMany: (resource: any, params: any) => {
    const query = {
      ids: JSON.stringify({ id: params.ids }),
      range: JSON.stringify([0, params.ids.length]),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      return { data: json.result.data };
    });
  },

  getManyReference: (resource: any, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json,
      // total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: async (resource: any, params: any) => {
    try {
      const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...params.data,
        }),
      });

      const result = JSON.parse(response.body);

      return {
        ...result.result,
      };
    } catch (error: any) {
      throw new Error(
        error?.body?.result?.message ||
          error?.body?.result?.meta?.target ||
          "unknown error"
      );
    }
  },

  updateMany: (resource: any, params: any) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.body }));
  },

  create: async (resource: any, params: any) => {
    try {
      const response: any = await httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify({
          ...params.data,
        }),
      });

      return {
        data: { ...params.data, id: JSON.parse(response?.body).result.id },
      };
    } catch (error: any) {
      throw new Error(
        error?.body?.result?.message ||
          error?.body?.result?.meta?.target ||
          "unknown error"
      );
    }
  },

  delete: (resource: any, params: any) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource: any, params: any) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "DELETE",
      body: JSON.stringify({ id: params.ids }),
    }).then(({ json }) => ({ data: json }));
  },
};

export { DataProvider };
