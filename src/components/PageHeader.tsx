import React from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
  /** Rota de destino específica. Se não informada, tenta voltar ou ir para '/' */
  backTo?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  rightElement,
  backTo,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // 1. Se o desenvolvedor passou uma rota fixa, ignore o histórico e vá para ela.
    // Isso evita loops se o usuário ficar alternando entre duas telas.
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3 flex items-center justify-center border-b border-border/5">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <button
          onClick={handleBack}
          type="button"
          aria-label="Voltar"
          className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-foreground">
            arrow_back
          </span>
        </button>

        <h2 className="text-foreground text-sm font-bold uppercase tracking-widest truncate px-2">
          {title}
        </h2>

        <div className="flex gap-2 min-w-10 justify-end">
          {rightElement || <div className="size-10" />}{" "}
          {/* Espaçador para manter o título centralizado */}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
