import { useNavigate } from "react-router-dom";
import TralloButton from "./TralloButton";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon = "info",
  title = "Nenhum dado encontrado",
  description = "Não há informações disponíveis para exibir no momento.",
  buttonText = "Voltar para o Início",
  onAction,
}: EmptyStateProps) => {
  const navigate = useNavigate();
  const handleAction = onAction || (() => navigate("/"));

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-500">
      <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 max-w-sm w-full flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-primary/40">
            {icon}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          {description}
        </p>

        <TralloButton
          variant="primary" 
          onClick={handleAction}
          fullWidth
        >
          {buttonText}
        </TralloButton>
      </div>
    </div>
  );
};

export default EmptyState;