import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetWorkspacesResponse, AddWorkspaceResponse, NewWorkspace } from "@/types/workspace.d";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/projectManagementSystem/backend/public/",
        credentials: 'include',
    }),
    tagTypes: ['Workspace'],

    endpoints: (builder) => ({
        getWorkspaces: builder.query<GetWorkspacesResponse, number>({
            query: (userId) => ({
                url: `getWorkspaces.php?userId=${userId}`,
                method: 'GET'
            }),
            providesTags: ['Workspace']
        }),
        addWorkspace: builder.mutation<AddWorkspaceResponse, NewWorkspace>({
            query:(workspace) => ({
                url: 'addWorkspace.php',
                method: 'POST',
                body: workspace,
            }),
            invalidatesTags: ['Workspace']
        })
    }),
})

export const { useGetWorkspacesQuery, useAddWorkspaceMutation } = apiSlice;