import { useState } from "react";
import axios from "axios";

const LoginPage = ({ logIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      setError("");
      logIn(response.data.user);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error");
      }
    }
  };

  const handleGitHubLogin = () => {
    const popup = window.open(
      "http://localhost:3000/auth/github",
      "targetWindow",
      `toolbar=no,
          location=no,
          status=no,
          manubar=no,
          scrolbars=yes,
          resizable=yes,
          width=620,
          height=700`
    );

    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:3000") {
        if (event.data) {
          logIn(event.data);
          popup?.close();
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Log In
                </button>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={handleGitHubLogin}
                >
                  Log In with GitHub
                </button>
              </div>
              <div className="mb-3">
                <a
                  type="button"
                  className="btn btn-secondary w-100"
                  href="/auth/signup"
                >
                  Create new account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
