import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "./auth.slice";

interface LoginCredentials {
  email: string;
  password: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/Authentication";
console.log("API_BASE_URL", API_BASE_URL);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(loginStart());

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      // const response = {
      //   ok: true,
      //   json: async () => ({
      //     user: { id: 1, name: "John Doe", email: credentials.email },
      //     token: "fake-jwt-token",
      //     message: null,
      //   }),
      // };

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

interface SignUpDetails {
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (userDetails: SignUpDetails, { dispatch }) => {
    dispatch(signUpStart());
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    //  console.log("JSON.stringify(userDetails)", JSON.stringify(userDetails));
    //   const response = {
    //     ok: true,
    //     json: async () => ({
    //       // user: { name: "John Doe", email: credentials.email },
    //       token: "fake-jwt-token",
    //       message: null,
    //     }),
    //   };

    if (!response.ok) {
      dispatch(signUpFailure("Failed to sign up"));
      throw new Error("Failed to sign up");
    }

    const data = await response.json();
    dispatch(
      signUpSuccess({
        token: data.token,
      })
    );
    return data;
  }
);
