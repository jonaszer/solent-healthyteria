import React, { useEffect, useState } from "react";
import "./notification.css";

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isShrinking, setIsShrinking] = useState(false);

  useEffect(() => {
    setIsShrinking(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`notification ${isShrinking ? "shrinking" : ""}`}>
      {message}
    </div>
  );
};

export default Notification;
