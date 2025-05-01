import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginStart, loginSuccess, loginFailure } from "./auth.slice";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(loginStart());

      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(credentials),
      // });
      const response = {
        ok: true,
        json: async () => ({
          user: { id: 1, name: "John Doe", email: credentials.email },
          token: "fake-jwt-token",
          message: null,
        }),
      };

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(
        loginSuccess({
          user: data.user,
          token: data.token,
        })
      );

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);
