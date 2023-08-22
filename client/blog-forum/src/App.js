import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import ChooseTopics from "./components/ChooseTopics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  const notification = useSelector((state) => state.notification.message);
  const notificationState = useSelector((state) => state.notification.type);
  const user = useSelector((state) => state.user.user);
  console.log("no log coming from here", notification);
  console.log(user);

  return (
    <BrowserRouter>
      {notification && (
        <Notification type={notificationState} message={notification} />
      )}
      <Routes>
        <Route path="/" element={user && <Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose-topics" element={<ChooseTopics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
