import React from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
  backTo?: string | number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  rightElement,
  backTo,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo !== undefined) {
      navigate(backTo as any);
      return;
    }

    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3 flex items-center justify-center border-b border-border/5">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <button
          onClick={handleBack}
          className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft"
        >
          <span className="material-symbols-outlined text-foreground">
            arrow_back
          </span>
        </button>

        <h2 className="text-foreground text-sm font-bold uppercase tracking-widest">
          {title}
        </h2>

        {/* Elemento da direita */}
        <div className="flex gap-2 min-w-10 justify-end">{rightElement}</div>
      </div>
    </header>
  );
};

export default PageHeader;
