import Masonry from "react-masonry-css";
import CounterCard from "../components/usedurum/CounterCard";
import StateViewerCard from "../components/usedurum/StateViewerCard";
import Calculator from "../components/usedurum/CalculatorCard";
import Cart from "../components/usedurum/Cart";
import ClockCard from "../components/usedurum/ClockCard";
import CountdownCard from "../components/usedurum/CountdownCard";
import ThemeSelectorCard from "../components/usedurum/ThemeSelectorCard";
import NotificationSystemCard from "../components/usedurum/NotificationSystemCard";
import { IntroCard } from "../components/IntroCard";

const Home: React.FC = () => {
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="container py-6">
      <IntroCard />
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        <div className="mb-4">
          <CounterCard />
        </div>
        <div className="mb-4">
          <Calculator />
        </div>
        <div className="mb-4">
          <Cart />
        </div>
        <div className="mb-4">
          <ClockCard />
        </div>
        <div className="mb-4">
          <CountdownCard />
        </div>
        <div className="mb-4">
          <ThemeSelectorCard />
        </div>
        <div className="mb-4">
          <NotificationSystemCard />
        </div>
      </Masonry>
      <div className="mb-4">
        <StateViewerCard />
      </div>
    </div>
  );
};

export default Home;
