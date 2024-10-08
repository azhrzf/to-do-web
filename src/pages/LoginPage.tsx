import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useApp } from "@/hooks/useApp";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const appContext = useApp();
  const { usersContext } = appContext;
  const { currentUser, loginUser } = usersContext;

  const navigate = useNavigate();

  const {
    state: userData,
    handleChange: handleUserChange,
    handleReset: handleUserReset,
  } = useForm({
    email: "",
    password: "",
  });

  const [messageSubmit, setMessageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  const handleUserFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      loginUser({
        email: userData.email,
        password: userData.password,
      });

      setMessageSubmit({
        appear: true,
        error: false,
        message: "Login successful!",
      });
      handleUserReset();
      navigate("/");
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
        <h2>Login User</h2>
        {messageSubmit.appear && (
          <p className={messageSubmit.error ? "color-danger" : "color-primary"}>
            {messageSubmit.message}
          </p>
        )}
        <form className="input__form" onSubmit={handleUserFormSubmit}>
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
          <div>
            <span>Don't have an account yet? </span>
            <Link to="/register" className="primary-link">
              Register here.
            </Link>
          </div>
          <button type="submit" className="button-basic primary-link-bg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
