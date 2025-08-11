import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetWorkspacesResponse,
  WorkspaceMutationResponse,
  NewWorkspace,
  EditWorkspace,
  GetWorkspaceByIdResponse,
} from "@/types/workspace.d";

import type {
  RegisterUserResponse,
  RegisterUser,
} from "@/types/users.d"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/projectManagementSystem/backend/public/",
    credentials: "include",
  }),
  tagTypes: ["Workspace", "User"],

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
    registerUser: builder.mutation<RegisterUserResponse, RegisterUser>({
      query: (user) => {
        const formData = new FormData();

        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);

        // if (user.profileImage) {
        //   formData.append('profileImage', user.profileImage);
        // }

        return {
          url: 'register.php',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ["User"],
    })
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceByIdQuery,
  useAddWorkspaceMutation,
  useEditWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useDeleteTaskMutation,
  useRegisterUserMutation,
} = apiSlice;
