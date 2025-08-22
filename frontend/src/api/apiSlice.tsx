import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetWorkspacesResponse,
  WorkspaceMutationResponse,
  NewWorkspace,
  EditWorkspace,
  GetWorkspaceByIdResponse,
  Invitation,
  getNotificationResponse,
} from "@/types/workspace.d";

import type {
  RegistrationResponse,
  CheckSessionResponse,
  RegisterUser,
  Loginuser,
  ForgotPasswordResponse,
  ResetPassword,
} from "@/types/users.d";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/projectManagementSystem/backend/public/",
    credentials: "include",
  }),
  tagTypes: ["Workspace", "User", "Notification"],

  endpoints: (builder) => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, void>({
      query: () => ({
        url: "getWorkspaces.php",
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
    registerUser: builder.mutation<RegistrationResponse, RegisterUser>({
      query: (user) => {
        const formData = new FormData();

        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);

        if (user.profileImage) {
          formData.append("profileImage", user.profileImage);
        }

        return {
          url: "register.php",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<RegistrationResponse, Loginuser>({
      query: (user) => ({
        url: "login.php",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    checkSession: builder.query<CheckSessionResponse, void>({
      query: () => "checkSession.php",
      providesTags: ["User"],
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "logout.php",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation<RegistrationResponse, FormData>({
      query: (formData) => ({
        url: "editProfile.php",
        method: "POST",
        body: formData
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
      query: (email) => ({
        url: 'forgotPassword.php',
        method: "POST",
        body: {email},
      })
    }),
    resetPassword: builder.mutation<ForgotPasswordResponse, ResetPassword>({
      query: (credentials) => ({
        url: 'resetPassword.php',
        method: 'POST',
        body: credentials,
      })
    }),
    sendInvitation: builder.mutation<WorkspaceMutationResponse, Invitation>({
      query: (invitation) => ({
        url: 'sendInvitation.php',
        method: 'POST',
        body: invitation,
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotifications: builder.query<getNotificationResponse, void>({
      query: () => ({
        url: 'getNotifications.php',
        method: 'GET',
      }),
      providesTags: ["Notification"],
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
  useLoginUserMutation,
  useCheckSessionQuery,
  useLogoutUserMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendInvitationMutation,
  useGetNotificationsQuery,
} = apiSlice;
