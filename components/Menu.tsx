import { useGlobalContext } from "@/context/store";
import Resize from "@/components/UI/Resize";
import Blur from "@/components/UI/Blur";
import Flip from "@/components/UI/Flip";
import Rotate from "@/components/UI/Rotate";
import Filter from "@/components/UI/Filter";

const Menu: React.FC = () => {
  const { selectTab } = useGlobalContext();

  const getActiveComponent = () => {
    switch (selectTab) {
      case "Resize":
        return <Resize />;
      case "Blur":
        return <Blur />;
      case "Flip":
        return <Flip />;
      case "Rotate":
        return <Rotate />;
      case "Filter":
        return <Filter />;
      default:
        return <Resize />;
    }
  };

  return <div>{getActiveComponent()}</div>;
};

export default Menu;
