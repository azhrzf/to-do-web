import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useApp } from "@/hooks/useApp";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const appContext = useApp();
  const { usersContext } = appContext;
  const { currentUser, registerUser } = usersContext;

  const navigate = useNavigate();

  const {
    state: userData,
    handleChange: handleUserChange,
    handleReset: handleUserReset,
  } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [messageSubmit, setMessageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  const handleUserFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });

      setMessageSubmit({
        appear: true,
        error: false,
        message: "User registered successfully! Redirecting to Login page",
      });
      handleUserReset();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessageSubmit({
        appear: true,
        error: true,
        message: `Error registering user: ${(error as Error).message}`,
      });
    }
  };

  if (currentUser && currentUser.loggedIn) {
    navigate("/");
  }

  return (
    <div>
      <div className="register__wrapper basic-space-y">
        <h2>Register User</h2>
        {messageSubmit.appear && (
          <p className={messageSubmit.error ? "color-danger" : "color-primary"}>
            {messageSubmit.message}
          </p>
        )}
        <form className="input__form" onSubmit={handleUserFormSubmit}>
          <div className="input__form_input">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleUserChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="input__form_input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="input__form_input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleUserChange}
              required
              autoComplete="password"
            />
          </div>
          <div className="input__form_input">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleUserChange}
              required
              autoComplete="confirmPassword"
            />
          </div>
          <div>
            <span>Already have an account? </span>
            <Link to="/login" className="primary-link">
              Login here.
            </Link>
          </div>
          <button type="submit" className="button-basic primary-link-bg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
