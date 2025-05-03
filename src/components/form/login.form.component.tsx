import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../store/auth/auth.selectors";
import { loginUser } from "../../store/auth/auth.thunk";

const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { email, password } = formFields;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="p-4 md:p-5 space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-blue-50/60 border border-blue-700/70 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 placeholder-blue-700/60"
            placeholder="name@gmail.com"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="bg-blue-50/60 border border-blue-700/70 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-blue-700/60"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
