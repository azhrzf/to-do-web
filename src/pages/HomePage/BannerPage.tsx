import { Link } from "react-router-dom";

const BannerPage: React.FC = () => {
  return (
    <div className="banner basic-space-y">
      <h2 className="banner__title">
        <span className="color-primary">To Do,</span> make things easier.
      </h2>
      <p className="color-secondary">
        This single-page application (SPA) allows users to manage tasks
        efficiently. Core features include adding, editing, and deleting to-dos,
        as well as managing labels for better task organization. User
        authentication is secured through password hashing. Data is stored
        locally using the browser's local storage, ensuring persistence even
        after page refreshes or browser restarts.
      </p>
      <div className="banner__cta">
        <Link to="/register" className="button-reset">
          <div className="button-basic primary-link-bg basic-flex-middle">
            Register
          </div>
        </Link>
        <Link to="/login" className="button-reset">
          <div className="button-basic primary-link-bg basic-flex-middle">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BannerPage;
