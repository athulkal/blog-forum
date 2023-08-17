import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const signup = async (userDetails) => {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

const loginService = {
  signup,
};

export default loginService;
