import React from "react";
import { auth } from "./firebase";
import { signOut } from 'firebase/auth';

function HomePage() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Hello, {user ? user.email : "Guest"}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
