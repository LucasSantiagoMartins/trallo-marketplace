import React from "react";
import TabButton from "./TabButton";

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabContainerProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContainer: React.FC<TabContainerProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex gap-2 min-w-max px-2 overflow-x-auto pb-2 lg:pb-0">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          id={tab.id}
          label={tab.label}
          icon={tab.icon || "analytics"}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabContainer;
