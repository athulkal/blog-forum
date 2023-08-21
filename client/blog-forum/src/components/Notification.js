import React from "react";

const Notification = ({ message, type }) => {
  let notificationClasses = "p-4 rounded-md shadow-md ";
  let iconClasses = "";

  switch (type) {
    case "success":
      notificationClasses += "bg-green-500 text-white";
      iconClasses = "text-green-400";
      break;
    case "error":
      notificationClasses += "bg-red-500 text-white";
      iconClasses = "text-red-400";
      break;
    case "info":
      notificationClasses += "bg-blue-500 text-white";
      iconClasses = "text-blue-400";
      break;
    default:
      notificationClasses += "bg-gray-500 text-white";
      iconClasses = "text-gray-400";
      break;
  }

  return (
    <div className={notificationClasses}>
      <div className="flex items-center">
        <span className={`mr-2 text-lg ${iconClasses}`}>
          {type === "success" ? "✓" : "⚠"}
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
