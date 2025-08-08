import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetWorkspacesResponse,
  WorkspaceMutationResponse,
  NewWorkspace,
  EditWorkspace,
  GetWorkspaceByIdResponse,
} from "@/types/workspace.d";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/projectManagementSystem/backend/public/",
    credentials: "include",
  }),
  tagTypes: ["Workspace"],

  endpoints: (builder) => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, number>({
      query: (userId) => ({
        url: `getWorkspaces.php?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
    addWorkspace: builder.mutation<WorkspaceMutationResponse, NewWorkspace>({
      query: (workspace) => ({
        url: "addWorkspace.php",
        method: "POST",
        body: workspace,
      }),
      invalidatesTags: ["Workspace"],
    }),
    getWorkspaceById: builder.query<GetWorkspaceByIdResponse, number>({
      query: (workspaceId) => ({
        url: `getWorkspaceById.php?workspaceId=${workspaceId}`,
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
    editWorkspace: builder.mutation<WorkspaceMutationResponse, EditWorkspace>({
      query: (workspace) => ({
        url: "editWorkspace.php",
        method: "POST",
        body: workspace,
      }),
      invalidatesTags: ["Workspace"],
    }),
    deleteWorkspace: builder.mutation<WorkspaceMutationResponse, number>({
      query: (workspaceId) => ({
        url: `deleteWorkspace.php?workspaceId=${workspaceId}`,
        method: "DELETE",
        body: { workspaceId },
      }),
      invalidatesTags: ["Workspace"],
    }),
    deleteTask: builder.mutation<WorkspaceMutationResponse, number>({
      query: (workspaceId) => ({
        url: `deleteWorkspace.php?workspaceId=${workspaceId}`,
        method: "DELETE",
        body: { workspaceId },
      }),
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceByIdQuery,
  useAddWorkspaceMutation,
  useEditWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useDeleteTaskMutation,
} = apiSlice;
