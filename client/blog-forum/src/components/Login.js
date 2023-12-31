import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const error = useSelector((state) => state.user.error);
  const userStatus = useSelector((state) => state.user.status);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(error);
  console.log(userStatus);
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(getUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/choose-topics");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
          <button
            type="button"
            className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 mt-3"
          >
            Login with Twitter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
