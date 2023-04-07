import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { saveUserNameToLocalStorage } from "../utils/localStorage";

export const LoginScreen = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      //we save the username to local storage so that we can use it as the key for the context
      saveUserNameToLocalStorage(username).then(() =>
        history.push("/dashboard")
      );
    }
  };

  return (
    <PageLayout className="login">
      <h1>Welcome back 👋</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </PageLayout>
  );
};
