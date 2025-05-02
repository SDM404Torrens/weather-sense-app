import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../store/auth/auth.selectors";
import { signUpUser } from "../../store/auth/auth.thunk";

const defaultFormFields = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ onClose }: { onClose: () => void }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { name, lastName, email, password, confirmPassword } = formFields;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    const last_Name = lastName;
    dispatch(signUpUser({ name, last_Name, email, password })).then(() => {
      onClose();
    });
  };

  const handleChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="p-4 md:p-5 space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-blue-50/60 border border-blue-700/70 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 placeholder-blue-700/60"
              placeholder="Thais"
              required
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="bg-blue-50/60 border border-blue-700/70 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 placeholder-blue-700/60"
              placeholder="Contreras"
              required
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            className="bg-blue-50/60 border border-blue-700/70 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-blue-700/60"
            required
            value={confirmPassword}
            onChange={handleChange}
          />
          {password !== confirmPassword && confirmPassword && (
            <p className="mt-1 text-sm text-red-600">Passwords don't match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || password !== confirmPassword}
          className="w-full text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
