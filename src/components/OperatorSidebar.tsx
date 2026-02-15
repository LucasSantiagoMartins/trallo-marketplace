import React from "react";
import SidebarLink from "./SidebarLink";

interface OperatorSidebarProps {
  activePage:
    | "dashboard"
    | "verificacoes"
    | "estoque"
    | "configuracoes"
    | "none";
}

const OperatorSidebar: React.FC<OperatorSidebarProps> = ({ activePage }) => {
  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-[#F1F5F9] flex-col sticky top-0 h-screen p-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Painel Operacional</h2>
      </div>
      <nav className="space-y-3 flex-1">
        <SidebarLink
          icon="dashboard"
          label="Visão Geral"
          path="/area-operacional"
          active={activePage === "dashboard"}
        />
        <SidebarLink
          icon="pending_actions"
          label="Verificações Pendentes"
          path="/area-operacional/verificacoes-pendentes"
          active={activePage === "verificacoes"}
        />
     
        <SidebarLink
          icon="inventory_2"
          label="Gestão de Estoque"
          path="/area-operacional/gestao-estoque"
          active={activePage === "estoque"}
        />

        <div className="pt-4 mt-4 border-t border-slate-100">
          <SidebarLink
            icon="settings"
            label="Minhas Configurações"
            path="/configuracoes"
            active={activePage === "configuracoes"}
          />
        </div>
      </nav>
    </aside>
  );
};

export default OperatorSidebar;
