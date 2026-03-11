import React, { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import ConfirmAction from "@/components/ConfirmAction";
import ActionSheet, { TwoFactorMethod } from "@/components/ActionSheet";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getUserSecuritySettings,
  updateUserSecuritySettings,
} from "@/services/user-security.service";

export const CustomToggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <div
    className="shrink-0 relative cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
  >
    <div
      className={`w-10 sm:w-12 h-6 sm:h-7 rounded-full transition-colors shadow-inner ${checked ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
    />
    <div
      className={`absolute top-[3px] sm:top-[4px] left-[4px] bg-white rounded-full h-[18px] sm:h-[20px] w-[18px] sm:w-[20px] transition-all shadow-md ${checked ? "translate-x-4 sm:translate-x-5" : "translate-x-0"}`}
    />
  </div>
);

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState("Português (Angola)");

  const [is2FASheetOpen, setIs2FASheetOpen] = useState(false);
  const [isUpdatingSecurity, setIsUpdatingSecurity] = useState(false);

  const [secureLogin, setSecureLogin] = useState(false);
  const [secureOperations, setSecureOperations] = useState(false);
  const [activeTwoFAMethod, setActiveTwoFAMethod] =
    useState<TwoFactorMethod>("EMAIL");

  const [tempTwoFAMethod, setTempTwoFAMethod] =
    useState<TwoFactorMethod>("EMAIL");

  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    try {
      const response = await getUserSecuritySettings();
      if (response.success) {
        setSecureLogin(response.data.secureLogin);
        setSecureOperations(response.data.secureOperations);
        setActiveTwoFAMethod(response.data.twoFactorMethod);
        setTempTwoFAMethod(response.data.twoFactorMethod);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações de segurança", error);
    }
  };

  const handleConfirmSecurityUpdate = async (payload: any) => {
    setIsUpdatingSecurity(true);
    try {
      const response = await updateUserSecuritySettings({
        twoFactorMethod: payload.twoFactorMethod,
        secureLogin: payload.secureLogin,
        secureOperations: payload.secureOperations,
      });

      if (response.success) {
        setSecureLogin(response.data.secureLogin);
        setSecureOperations(response.data.secureOperations);
        setActiveTwoFAMethod(response.data.twoFactorMethod);
        setTempTwoFAMethod(response.data.twoFactorMethod);

        setIs2FASheetOpen(false);
        toast.success(
          response.message ??
            "Configurações de segurança atualizadas com sucesso",
        );
      }
    } catch (error: any) {
      console.error("Erro ao salvar segurança", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Falha ao atualizar configurações",
      );
    } finally {
      setIsUpdatingSecurity(false);
    }
  };

  const languages = [
    "Português (Angola)",
    "Português (Portugal)",
    "English (US)",
    "Français",
  ];

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }, 2000);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    children,
    onClick,
    to,
    danger = false,
  }: any) => {
    const Content = () => (
      <div className="flex items-center gap-4 px-4 sm:px-6 h-20 w-full group">
        <div
          className={`flex items-center justify-center rounded-2xl shrink-0 size-11 sm:size-12 transition-all group-hover:scale-110 ${danger ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"}`}
        >
          <span className="material-symbols-outlined text-[24px] sm:text-[26px]">
            {icon}
          </span>
        </div>
        <div className="flex-1 text-left min-w-0">
          <p
            className={`text-[14px] sm:text-base font-bold tracking-tight truncate ${danger ? "text-red-500" : ""}`}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-[#866565] dark:text-gray-400 text-[11px] sm:text-xs mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        {children ? (
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        ) : (
          <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">
            chevron_right
          </span>
        )}
      </div>
    );
    const baseClass =
      "w-full block transition-all active:scale-[0.99] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]";
    return to ? (
      <Link to={to} className={baseClass}>
        <Content />
      </Link>
    ) : (
      <button onClick={onClick} className={baseClass}>
        <Content />
      </button>
    );
  };

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#120F0F] min-h-screen font-display text-[#171212] dark:text-gray-100 transition-colors duration-500 overflow-x-hidden">
      <PageHeader title="Configurações" />

      <div className="max-w-7xl mx-auto flex flex-col pt-24 sm:pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <main className="flex flex-col gap-8 sm:gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <section className="flex flex-col gap-4">
              <h3 className="text-primary font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] ml-2 opacity-80">
                Preferências
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03]">
                <SettingItem
                  icon="notifications"
                  title="Notificações"
                  subtitle="Alertas do sistema"
                >
                  <CustomToggle
                    checked={notificationsEnabled}
                    onChange={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                  />
                </SettingItem>
                <div className="h-[1px] mx-6 bg-gray-50 dark:bg-white/5" />
                <SettingItem
                  icon="language"
                  title="Idioma"
                  subtitle={selectedLanguage}
                  onClick={() => setIsLanguageSheetOpen(true)}
                />
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-primary font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] ml-2 opacity-80">
                Segurança
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03]">
                <SettingItem
                  icon="lock_open"
                  title="Alterar Senha"
                  to="/alterar-senha"
                />
                <div className="h-[1px] mx-6 bg-gray-50 dark:bg-white/5" />
                <SettingItem
                  icon="verified_user"
                  title="Verificação de Segurança"
                  onClick={() => {
                    setTempTwoFAMethod(activeTwoFAMethod);
                    setIs2FASheetOpen(true);
                  }}
                />
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-red-500 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] ml-2 opacity-80">
                Conta
              </h3>
              <div className="bg-white dark:bg-[#1E1A1A] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm border border-black/[0.03] dark:border-white/[0.03]">
                <SettingItem
                  icon="no_accounts"
                  title="Eliminar Conta"
                  subtitle="Remover todos os dados permanentemente"
                  danger={true}
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </div>
            </section>
          </div>
        </main>
        <BottomNavigation />
      </div>

      <ActionSheet
        isOpen={isLanguageSheetOpen}
        onClose={() => setIsLanguageSheetOpen(false)}
        title="Escolher Idioma"
        type="language"
        data={{ languages, selectedLanguage }}
        onAction={(lang) => {
          setSelectedLanguage(lang);
          setIsLanguageSheetOpen(false);
          toast.success(`Idioma alterado para ${lang}`);
        }}
      />

      <ActionSheet
        isOpen={is2FASheetOpen}
        onClose={() => setIs2FASheetOpen(false)}
        title="Segurança 2FA"
        type="2fa"
        data={{
          secureLogin,
          setSecureLogin,
          secureOperations,
          setSecureOperations,
          tempTwoFAMethod,
          setTempTwoFAMethod,
          isUpdating: isUpdatingSecurity,
        }}
        onAction={handleConfirmSecurityUpdate}
      />

      <ConfirmAction
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
        title="Eliminar Conta?"
        description="Esta ação removerá todos os seus dados permanentemente."
        confirmText="Sim, Eliminar"
        variant="danger"
        icon="delete_forever"
      />
    </div>
  );
};

export default SettingsScreen;
