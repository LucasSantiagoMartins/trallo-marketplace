import React from "react";
import TabButton from "./TabButton";

type TabType = "financeiro" | "pedidos" | "pagamentos" | "performance" | "crescimento" | "risco";

interface TabContainerProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabContainer: React.FC<TabContainerProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "financeiro", label: "Finanças", icon: "account_balance" },
    { id: "pedidos", label: "Pedidos", icon: "shopping_cart" },
    { id: "pagamentos", label: "Pagamentos", icon: "account_balance_wallet" },
    { id: "performance", label: "Performance", icon: "bolt" },
    { id: "crescimento", label: "Crescimento", icon: "trending_up" },
    { id: "risco", label: "Risco", icon: "security" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          id={tab.id as TabType}
          label={tab.label}
          icon={tab.icon}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
        />
      ))}
    </div>
  );
};

export default TabContainer;