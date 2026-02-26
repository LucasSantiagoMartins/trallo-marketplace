import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const SettingItem = ({
    icon,
    title,
    subtitle,
    children,
    onClick,
    to,
    danger = false
  }: any) => {
    const Content = () => (
      <div className="flex items-center gap-4 px-4 h-16 w-full group">
        <div className={`flex items-center justify-center rounded-2xl shrink-0 size-11 transition-colors ${danger ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'
          }`}>
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <div className="flex-1 text-left">
          <p className={`text-[15px] font-bold tracking-tight ${danger ? 'text-red-500' : ''}`}>{title}</p>
          {subtitle && <p className="text-[#866565] dark:text-gray-400 text-xs leading-none mt-1">{subtitle}</p>}
        </div>
        {children ? children : <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>}
      </div>
    );

    const baseClass = "w-full block transition-all active:scale-[0.98] hover:bg-black/[0.03] dark:hover:bg-white/[0.03]";

    if (to) return <Link to={to} className={baseClass}><Content /></Link>;
    return <button onClick={onClick} className={baseClass}><Content /></button>;
  };

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#120F0F] min-h-screen font-display text-[#171212] dark:text-gray-100 transition-colors duration-300">
      <PageHeader title="Configurações" />

      <div className="max-w-6xl mx-auto flex flex-col pt-28 pb-32 px-5 lg:px-10">
        <main className="flex flex-col gap-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <section className="flex flex-col h-full">
              <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.15em] mb-4 ml-2 opacity-80">
                Preferências
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03] flex-1">
                <SettingItem icon="notifications" title="Notificações" subtitle="Alertas e sons do sistema">
                  <div className="shrink-0 relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <div className="w-12 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </div>
                </SettingItem>
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="language" title="Idioma" subtitle="Português (AO)" />
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="palette" title="Aparência" subtitle="Modo Escuro / Claro" />
              </div>
            </section>

            <section className="flex flex-col h-full">
              <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.15em] mb-4 ml-2 opacity-80">
                Segurança
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03] flex-1">
                <SettingItem icon="lock_open" title="Alterar Senha" to="/alterar-senha" />
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="verified_user" title="Autenticação em 2 Etapas" />
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="devices" title="Dispositivos Conectados" />
              </div>
            </section>

            <section className="flex flex-col h-full lg:col-span-1 md:col-span-2 lg:col-auto">
              <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.15em] mb-4 ml-2 opacity-80">
                Sobre
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03] flex-1">
                <SettingItem icon="info" title="Sobre o TRALLO" />
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="description" title="Termos de Serviço" />
                <div className="h-[1px] mx-4 bg-gray-50 dark:bg-white/5" />
                <SettingItem icon="shield_lock" title="Privacidade" />
              </div>
            </section>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-primary dark:text-primary/80 text-[10px] font-bold tracking-widest uppercase">
                Versão 2.4.1 (Angola)
              </p>
            </div>
            <div className="h-1 w-8 bg-primary/20 rounded-full"></div>
            <p className="text-gray-400 text-[11px] font-medium">© 2026 Trallo Corporation</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default SettingsScreen;