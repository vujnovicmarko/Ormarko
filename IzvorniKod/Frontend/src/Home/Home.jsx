import Header from "../Header/Header";
import LoggedInHeader from "../Header/LoggedInHeader";
import ItemDisplay from "../ItemDisplay";

export default function Home({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LoggedInHeader /> : <Header />}
      <ItemDisplay />
    </div>
  );
}
