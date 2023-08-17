import React, { useState } from "react";
import loginService from "../services/signup";
import { useDispatch } from "react-redux";
import { updateNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.signup({ name, email, password });
      setEmail("");
      setName("");
      setPassword("");
      dispatch(
        updateNotification(
          `Email confirmation sent to ${user.email} please confirm and login`,
          "success",
          10
        )
      );
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      dispatch(updateNotification(err.response.data.error, "error", 10));
      setEmail("");
      setName("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={name}
              className="w-full border rounded-md py-2 px-3 mt-1"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 mt-3"
          >
            Sign in with Twitter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
