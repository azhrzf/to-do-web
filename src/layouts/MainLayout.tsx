import { Outlet } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import { useApp } from "@/hooks/useApp";

const MainLayout: React.FC = () => {
  const appContext = useApp();
  const { usersContext } = appContext;
  const { currentUser } = usersContext;

  return (
    <div className="wrapper">
      <header className="main__header">
        <nav className="navbar">
          <h1>To Do Web</h1>
          {currentUser && currentUser.loggedIn && <LogoutButton />}
        </nav>
      </header>
      <main className="main__body">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
