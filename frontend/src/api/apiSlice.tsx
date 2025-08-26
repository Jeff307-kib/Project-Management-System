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

import type { GetTasksResponse, TaskMutationResponse, AddTask } from "@/types/tasks.d";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/projectManagementSystem/backend/public/",
    credentials: "include",
  }),
  tagTypes: ["Workspace", "User", "Notification", "Task"],

  endpoints: (builder) => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, void>({
      query: () => ({
        url: "getWorkspaces.php",
        method: "GET",
      }),
      providesTags: ["Workspace", "User"],
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
        body: formData,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
      query: (email) => ({
        url: "forgotPassword.php",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<ForgotPasswordResponse, ResetPassword>({
      query: (credentials) => ({
        url: "resetPassword.php",
        method: "POST",
        body: credentials,
      }),
    }),
    sendInvitation: builder.mutation<WorkspaceMutationResponse, Invitation>({
      query: (invitation) => ({
        url: "sendInvitation.php",
        method: "POST",
        body: invitation,
      }),
      invalidatesTags: ["Notification"],
    }),
    getNotifications: builder.query<getNotificationResponse, string>({
      query: (userId) => ({
        url: `getNotifications.php?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    acceptInviation: builder.mutation<WorkspaceMutationResponse, string>({
      query: (notificationId) => ({
        url: "acceptInvitation.php",
        method: "POST",
        body: { notificationId },
      }),
      invalidatesTags: ["Workspace", "Notification"],
    }),
    declineInvitation: builder.mutation<WorkspaceMutationResponse, string>({
      query: (notificationId) => ({
        url: "declineInvitation.php",
        method: "POST",
        body: { notificationId },
      }),
      invalidatesTags: ["Workspace", "Notification"],
    }),
    deleteNotification: builder.mutation<WorkspaceMutationResponse, string>({
      query: (notificationId) => ({
        url: "deleteNotification.php",
        method: "POST",
        body: { notificationId },
      }),
      invalidatesTags: ["Notification"],
    }),
    getTasks: builder.query<GetTasksResponse, string>({
      query: (workspaceId) => ({
        url: `getTasks.php?workspaceId=${workspaceId}`,
        method: "GET",
      }),
      providesTags: ['Task'],
    }),
    addTask: builder.mutation<TaskMutationResponse, AddTask>({
      query: (task) => ({
        url: 'addTask.php',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
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
  useAcceptInviationMutation,
  useDeclineInvitationMutation,
  useDeleteNotificationMutation,
  useGetTasksQuery,
  useAddTaskMutation,
} = apiSlice;
