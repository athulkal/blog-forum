import { useEffect, useState } from "react";
import axios from "axios";

/*
        THIS IS DONE DONE 
what this section has to be done is we need a container like a whole box and inside each topic will be a small
box container with the which changes on select to green to indicate the topic selected and there will be a submit
button which will send a post request to the backend which will update the user's data on which topics he selected
    REFATOR THIS TO USE REDUX => next step
*/

const ChooseTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/tags").then((res) => {
      setTopics(res.data.map((topic) => ({ ...topic, selected: false })));
    });
  }, []);

  const toggleSelection = (id) => {
    setTopics((prevTopic) =>
      prevTopic.map((topic) =>
        topic.id === id ? { ...topic, selected: !topic.selected } : topic
      )
    );
  };

  const handleTopicSelection = () => {
    const selectedTopics = topics.filter((topic) => topic.selected);
    console.log(selectedTopics);
  };

  return (
    <div className="border-solid border-2 border-gray-200 h-2/3 w-3/5 mx-auto text-center mt-6 rounded-md shadow p-2">
      <h1 className="text-xl mt-2 mb-4">Choose your favourite topics</h1>
      <div className="grid-cols-4 grid-rows-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`border-solid border-gray-700 inline-block rounded mr-2 mb-2 p-2 cursor-pointer ${
              topic.selected
                ? "bg-zinc-900 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => toggleSelection(topic.id)}
          >
            {topic.name}
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4"
        onClick={handleTopicSelection}
      >
        Submit
      </button>
    </div>
  );
};

export default ChooseTopics;
