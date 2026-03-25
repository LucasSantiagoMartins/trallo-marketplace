import React from "react";
import { UserRole } from "@/enums/user";
import { getUserRoleLabel } from "@/utils/mappers/user.mapper";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: UserRole | "";
  onSelect: (role: UserRole) => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedRole,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Selecionar Cargo
            </h3>
            <p className="text-sm text-slate-500">Escolha o nível de acesso</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">
              close
            </span>
          </button>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onSelect(UserRole.OPERATOR)}
            className={`w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left ${
              selectedRole === UserRole.OPERATOR
                ? "border-purple-500 bg-purple-50"
                : "border-slate-50 bg-slate-50 hover:border-purple-200"
            }`}
          >
            <div
              className={`p-3 rounded-2xl ${
                selectedRole === UserRole.OPERATOR
                  ? "bg-purple-500 text-white"
                  : "bg-white text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <p className="font-bold text-slate-700">
                {getUserRoleLabel(UserRole.OPERATOR)}
              </p>
              <p className="text-xs text-slate-500">
                Gestão de pedidos e suporte
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelect(UserRole.DELIVERER)}
            className={`w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left ${
              selectedRole === UserRole.DELIVERER
                ? "border-purple-500 bg-purple-50"
                : "border-slate-50 bg-slate-50 hover:border-purple-200"
            }`}
          >
            <div
              className={`p-3 rounded-2xl ${
                selectedRole === UserRole.DELIVERER
                  ? "bg-purple-500 text-white"
                  : "bg-white text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined">moped</span>
            </div>
            <div>
              <p className="font-bold text-slate-700">
                {getUserRoleLabel(UserRole.DELIVERER)}
              </p>
              <p className="text-xs text-slate-500">
                Logística e entregas em campo
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
