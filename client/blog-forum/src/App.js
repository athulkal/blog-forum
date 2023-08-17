import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const notification = useSelector((state) => state.notification.message);
  const notificationState = useSelector((state) => state.notification.type);
  const user = useSelector((state) => state.user.user);
  console.log(notification);
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
