import { useApp } from "@/hooks/useApp";

const LogoutButton: React.FC = () => {
  const appContext = useApp();
  const { usersContext } = appContext;
  const { logoutUser } = usersContext;

  return (
    <button onClick={logoutUser} type="button" className="button-reset">
      <div className="button-basic danger-link-bg basic-flex-middle">Logout</div>
    </button>
  );
};

export default LogoutButton;
