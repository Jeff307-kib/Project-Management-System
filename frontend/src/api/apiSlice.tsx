import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetWorkspacesResponse } from "@/types/workspace.d";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/projectManagementSystem/backend/public/",
        credentials: 'include',
    }),
    tagTypes: ['workspace'],

    endpoints: (builder) => ({
        getWorkspaces: builder.query<GetWorkspacesResponse, number>({
            query: (userId) => ({
                url: `getWorkspaces.php?userId=${userId}`,
                method: 'GET'
            }),
            providesTags: ['workspace']
        })
    }),
})

export const { useGetWorkspacesQuery } = apiSlice;