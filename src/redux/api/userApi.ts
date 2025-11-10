import { BASE_URL } from "@/lib/Base_URL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../slices/authSlice";
import type { RootState } from "../store";
import { asBearer, getAuthToken } from "@/lib/authToken";

// Types for Wallets and Transactions (you can adjust these as needed)
export interface Wallet {
  _id: string;
  userId: string;
  balance: number;
  isBlocked: boolean;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  createdAt: string;
  status: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/admin`,
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState);
      const bearer = asBearer(token);

      if (bearer) headers.set("authorization", bearer);
      else headers.delete("authorization");

      return headers;
    },
  }),
  tagTypes: ["User", "Agent", "Wallet", "Transaction"],

  endpoints: (builder) => ({
    // --- USER PROFILE ---
    getProfile: builder.query<User, void>({
      query: () => "/profile",
      providesTags: ["User"],
    }),

    // --- USERS ---
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    approveUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `/approve-agent/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Agent"],
    }),

    suspendUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `/suspend-agent/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Agent"],
    }),

    // --- AGENTS ---
    getAgents: builder.query<User[], void>({
      query: () => "/agents",
      providesTags: ["Agent"],
    }),

    // --- WALLETS ---
    getWallets: builder.query<Wallet[], void>({
      query: () => "/wallets",
      providesTags: ["Wallet"],
    }),

    blockWallet: builder.mutation<Wallet, string>({
      query: (userId) => ({
        url: `/block-wallet/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wallet"],
    }),

    unblockWallet: builder.mutation<Wallet, string>({
      query: (userId) => ({
        url: `/unblock-wallet/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wallet"],
    }),

    // --- TRANSACTIONS ---
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useApproveUserMutation,
  useSuspendUserMutation,
  useGetAgentsQuery,
  useGetWalletsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
  useGetTransactionsQuery,
} = userApi;
