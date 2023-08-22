import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const addTopics = async (id, tags) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, { tags });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const topicService = {
  addTopics,
};

export default topicService;
