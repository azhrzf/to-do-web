import { useApp } from "@/hooks/useApp";
import TodoPage from "./TodoPage";
import BannerPage from "./BannerPage";

const HomePage: React.FC = () => {
  const appContext = useApp();
  const { usersContext } = appContext;
  const { currentUser } = usersContext;

  return (
    <div className="center-start">
      {currentUser && currentUser.loggedIn ? <TodoPage /> : <BannerPage />}
    </div>
  );
};

export default HomePage;
