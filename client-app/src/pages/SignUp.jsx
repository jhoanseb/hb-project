import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  username: "",
  displayName: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  username: "",
  displayName: "",
  password: "",
  confirmPassword: "",
  message: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.displayName) newErrors.displayName = "name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          {
            username: formData.username,
            password: formData.password,
            displayName: formData.displayName,
          }
        );
        console.log(response.data.message); // Registro exitoso
        setFormData(initialFormData);
        setErrors(initialErrors);
      } catch (error) {
        if (error.response) {
          setErrors((prev) => ({
            ...prev,
            message: error.response.data.message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            message: "Ocurrió un error inesperado",
          }));
        }
      }
      alert("Form submitted successfully!");
      navigate("/auth/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* name */}
                <div className="mb-3">
                  <label htmlFor="displayName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.displayName ? "is-invalid" : ""
                    }`}
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                  {errors.displayName && (
                    <div className="invalid-feedback">{errors.displayName}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Sign Up Button */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>

                {/* Login Link */}
                <p className="mt-3 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
