import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

interface PageHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
  backTo?: string;
  showUser?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  rightElement,
  backTo,
  showUser = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo, { replace: true });
      return;
    }

    if (window.history.length <= 1) {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  const renderUserInfo = () => {
    return (
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/perfil")}
      >
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-[#8c5f67] dark:text-gray-400 font-bold uppercase tracking-wider">
            Olá, {user?.fullName || "Usuário"}
          </p>
        </div>
        <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm overflow-hidden bg-card flex items-center justify-center">
          {user?.profilePicture ? (
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${BASE_UPLOAD_URL + user.profilePicture})`,
              }}
            />
          ) : (
            <span className="material-symbols-outlined text-foreground text-2xl">
              account_circle
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3 flex items-center justify-center border-b border-border/5">
      <div className="w-full max-w-7xl flex items-center justify-between relative min-h-[40px]">
        <button
          onClick={handleBack}
          type="button"
          aria-label="Voltar"
          className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-95 transition-transform z-10"
        >
          <span className="material-symbols-outlined text-foreground">
            arrow_back
          </span>
        </button>

        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground text-[10px] sm:text-sm font-bold uppercase tracking-widest truncate px-2 max-w-[55%] text-center">a
          {title}
        </h2>

        <div className="flex gap-2 min-w-10 justify-end z-10">
          {rightElement ? (
            rightElement
          ) : showUser ? (
            renderUserInfo()
          ) : (
            <div className="size-10" />
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
