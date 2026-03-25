import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; 
import { UserResponseDTO } from "@/types/user";
import {
  getUserRoleColor,
  getUserRoleLabel,
} from "@/utils/mappers/user.mapper";
import { formatDateFriendly } from "@/utils/date";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserResponseDTO;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchTranslation, setTouchTranslation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;
    if (diff > 0) setTouchTranslation(diff);
  };

  const handleTouchEnd = () => {
    if (touchTranslation > 100) onClose();
    setTouchTranslation(0);
    setTouchStart(null);
  };

  if (!isRendered) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-end md:items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${touchTranslation}px)` }}
        className={`bg-white w-full md:max-w-md rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 shadow-2xl relative z-[10000] transition-all duration-300 ease-out ${
          isOpen 
            ? "translate-y-0 scale-100" 
            : "translate-y-full md:scale-95 md:translate-y-10"
        }`}
      >
        <div className="md:hidden flex justify-center mb-6 -mt-2">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="hidden md:flex absolute right-6 top-6 size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-8">
          <p className="text-[#6C3EF8] font-black text-[10px] tracking-[0.2em] uppercase mb-4">
            Perfil do Usuário
          </p>

          <div className="flex flex-col items-center">
            <div className="relative mb-3">
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] leading-tight">
              {user.fullName}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Cargo
            </span>
            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${getUserRoleColor(user.role)}`}
            >
              {getUserRoleLabel(user.role)}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              E-mail
            </span>
            <span className="text-xs font-bold text-slate-900 truncate ml-4">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Telefone
            </span>
            <span className="text-xs font-bold text-slate-900">
              {user.phoneNumber}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Endereço
            </span>
            <span className="text-xs font-bold text-slate-900 text-right">
              {user.address || "---"}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Membro desde
            </span>
            <span className="text-xs font-bold text-slate-900">
              {formatDateFriendly(user.createdAt, true)}
            </span>
          </div>

          {user.isSuspended && (
            <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-[10px] font-black text-red-400 uppercase mb-1">
                Motivo da Suspensão
              </p>
              <p className="text-xs font-medium text-red-700 leading-relaxed">
                {user.suspensionReason || "Nenhum motivo especificado."}
              </p>
            </div>
          )}
        </div>
        
       
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UserDetailsModal;