import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <header className="main__header">
        <nav className="navbar">
          <h1>To Do Web</h1>
        </nav>
      </header>
      <main className="main__body">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
