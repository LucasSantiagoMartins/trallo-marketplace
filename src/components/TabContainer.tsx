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
    /* Adicionado pb-4 e -mb-4 para permitir que a sombra apareça no overflow */
    <div className="flex gap-2 min-w-max px-2 overflow-x-auto pb-4 -mb-4 no-scrollbar">
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