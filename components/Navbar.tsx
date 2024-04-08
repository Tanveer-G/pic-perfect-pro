"use client";
import { useGlobalContext } from "@/context/store";

interface TabButtonProps {
  name: string;
}

const TabButton: React.FC<TabButtonProps> = ({ name }) => {
  const { selectTab, setSelectTab } = useGlobalContext();
  return (
    <button
      className={`${selectTab === name ? "bg-[#4fa83d]" : "bg-transparent"} rounded-sm hover:bg-[#4fa83d] text-center px-3 py-2`}
      onClick={() => setSelectTab(name)}
    >
      {name}
    </button>
  );
};

const NavBar: React.FC = () => {
  const tabs: string[] = ["Resize", "Blur", "Flip", "Rotate", "Filter"];
  return (
    <div className="mx-auto container rounded-t-md mb-8">
      <nav className="flex justify-around bg-[#4fa83d]/20 backdrop-blur-md p-4 text-white rounded-t-3xl">
        {tabs.map((tab) => (
          <TabButton key={tab} name={tab} />
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
