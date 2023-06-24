import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { firestore } from "../app/firebase";
import { IPath, CreatePathParams } from "../types";

import {
  updateDoc,
  doc,
  collection,
  deleteDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

interface UpdatePathParams extends Partial<Omit<IPath, "id">> {
  id: string;
}

const fetchPaths = async () => {
  const ref = collection(firestore, "paths");
  const querySnapshot = await getDocs(
    query(ref, orderBy("inFavorites", "desc"))
  );
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as IPath)
  );
};

const createPath = async (path: CreatePathParams) => {
  const doc = await addDoc(collection(firestore, "paths"), {
    ...path,
    inFavorites: false,
  });
  return doc.id;
};

const updatePath = async ({ id, ...path }: UpdatePathParams) => {
  await updateDoc(doc(firestore, "paths", id), path);
};

const deletePath = async (id: string) => {
  await deleteDoc(doc(firestore, "paths", id));
};

export const pathsApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Paths"],
  endpoints: (builder) => ({
    fetchPaths: builder.query<IPath[], void>({
      async queryFn() {
        try {
          const paths = await fetchPaths();
          return {
            data: paths,
          };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Paths"],
    }),
    createPath: builder.mutation({
      async queryFn(params: CreatePathParams) {
        try {
          const id = await createPath(params);
          return {
            data: id,
          };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Paths"],
    }),
    updatePath: builder.mutation({
      async queryFn(params: UpdatePathParams) {
        try {
          await updatePath(params);
          return {
            data: null,
          };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Paths"],
    }),
    deletePath: builder.mutation({
      async queryFn(id: string) {
        try {
          await deletePath(id);
          return {
            data: null,
          };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Paths"],
    }),
  }),
});

export const {
  useFetchPathsQuery,
  useCreatePathMutation,
  useUpdatePathMutation,
  useDeletePathMutation,
} = pathsApi;

export const usePathsApi = () => {
  const { data: paths } = useFetchPathsQuery();
  const [createPath] = useCreatePathMutation();
  const [updatePath] = useUpdatePathMutation();
  const [deletePath] = useDeletePathMutation();

  return { paths, createPath, updatePath, deletePath };
};
