import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#171212] dark:text-white transition-colors duration-200">
      <PageHeader title="Configurações" />

      <div className="max-w-[500px] mx-auto min-h-screen flex flex-col pt-24 pb-32 px-4">
        <main className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h3 className="text-[#866565] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider px-1">
              Preferências
            </h3>
            <div className="bg-white dark:bg-[#2d1b1b] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4 px-4 min-h-[64px] border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                  <span className="material-symbols-outlined text-[22px]">
                    notifications
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium">Notificações</p>
                </div>
                <div className="shrink-0">
                  <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 transition-colors has-[:checked]:bg-primary">
                    <div
                      className={`h-full w-[27px] rounded-full bg-white shadow-sm transform transition-transform duration-200 ${notificationsEnabled ? "translate-x-5" : ""}`}
                    ></div>
                    <input
                      className="invisible absolute"
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() =>
                        setNotificationsEnabled(!notificationsEnabled)
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 min-h-[64px] border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                  <span className="material-symbols-outlined text-[22px]">
                    language
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-base font-medium">Idioma</p>
                  <p className="text-[#866565] dark:text-gray-400 text-xs">
                    Português (AO)
                  </p>
                </div>
                <div className="shrink-0 text-gray-400">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-[#866565] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider px-1">
              Segurança
            </h3>
            <div className="bg-white dark:bg-[#2d1b1b] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4 px-4 min-h-[64px] border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                  <span className="material-symbols-outlined text-[22px]">
                    lock
                  </span>
                </div>
                <div className="flex-1 text-base font-medium">
                  Alterar Palavra-passe
                </div>
                <div className="shrink-0 text-gray-400">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[64px] cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10">
                  <span className="material-symbols-outlined text-[22px]">
                    verified_user
                  </span>
                </div>
                <div className="flex-1 text-base font-medium">
                  Autenticação de dois fatores
                </div>
                <div className="shrink-0 text-gray-400">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-[#866565] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider px-1">
              Suporte e Legal
            </h3>
            <div className="bg-white dark:bg-[#2d1b1b] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4 px-4 min-h-[64px] border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex-1 text-base font-medium">
                  Sobre o TRALLO
                </div>
                <span className="material-symbols-outlined text-gray-400">
                  chevron_right
                </span>
              </div>
              <div className="flex items-center gap-4 px-4 min-h-[64px] cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex-1 text-base font-medium">
                  Termos de Serviço
                </div>
                <span className="material-symbols-outlined text-gray-400">
                  chevron_right
                </span>
              </div>
            </div>
          </section>

          <p className="text-center text-[#866565] dark:text-gray-400 text-xs mt-4">
            TRALLO v2.4.1 (Angola)
          </p>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default SettingsScreen;
