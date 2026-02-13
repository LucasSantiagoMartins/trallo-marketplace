import React from "react";
import SidebarLink from "./SidebarLink";

interface AdminSidebarProps {
  activePage:
    | "dashboard"
    | "usuarios"
    | "transacoes"
    | "pagamentos"
    | "operadores"
    | "configuracoes"
    | "none";
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage }) => {
  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-[#F1F5F9] flex-col sticky top-0 h-screen p-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Painel Administrativo</h2>
      </div>
      <nav className="space-y-3 flex-1">
        <SidebarLink
          icon="dashboard"
          label="Visão Geral"
          path="/area-administrativa"
          active={activePage === "dashboard"}
        />
        <SidebarLink
          icon="group"
          label="Usuários"
          path="/area-administrativa/usuarios"
          active={activePage === "usuarios"}
        />
        <SidebarLink
          icon="receipt_long"
          label="Transações"
          path="/area-administrativa/transacoes"
          active={activePage === "transacoes"}
        />
        <SidebarLink
          icon="payments"
          label="Pagamentos"
          path="/area-administrativa/pagamentos"
          active={activePage === "pagamentos"}
        />
        <SidebarLink
          icon="engineering"
          label="Operadores"
          path="/area-administrativa/operadores"
          active={activePage === "operadores"}
        />

        <div className="pt-4 mt-4 border-t border-slate-100">
          <SidebarLink
            icon="settings"
            label="Configurações"
            path="/area-administrativa/configuracoes"
            active={activePage === "configuracoes"}
          />
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
