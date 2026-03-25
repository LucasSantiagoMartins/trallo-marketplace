import React, { useState } from "react";
import { UserResponseDTO } from "@/types/user";
import {
  getUserRoleColor,
  getUserRoleLabel,
} from "@/utils/mappers/user.mapper";
import UserDetailsModal from "./UserDetailsModal";

interface UserListItemProps {
  user: UserResponseDTO;
  onActionClick?: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onActionClick }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const isSuspended = user.isSuspended;

  return (
    <>
      <div
        className={`bg-white ${
          isSuspended ? "opacity-75" : ""
        } p-4 rounded-[16px] shadow-sm border border-slate-50 flex items-center gap-4 transition-all hover:shadow-md`}
      >
        <div className="relative shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
            alt={user.fullName}
            className={`w-12 h-12 rounded-full object-cover ${isSuspended ? "grayscale" : ""}`}
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${isSuspended ? "bg-red-500" : "bg-emerald-500"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3
              className={`font-bold text-sm truncate ${isSuspended ? "text-slate-400" : "text-slate-900"}`}
            >
              {user.fullName}
            </h3>
            <span
              className={`shrink-0 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full ${getUserRoleColor(user.role)}`}
            >
              {getUserRoleLabel(user.role)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate font-medium">
            {user.email}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isSuspended ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}
            >
              {isSuspended ? "SUSPENSO" : "ATIVO"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          {/* Botão Visualizar Detalhes */}
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="size-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#6C3EF8] hover:text-white transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">
              visibility
            </span>
          </button>

          {/* Botão Bloquear/Desbloquear */}
          <button
            onClick={onActionClick}
            className={`size-9 flex items-center justify-center rounded-full transition-all active:scale-90 ${
              isSuspended
                ? "bg-purple-50 text-[#6C3EF8] hover:bg-purple-100"
                : "bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSuspended ? "lock_open" : "block"}
            </span>
          </button>
        </div>
      </div>

      <UserDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        user={user}
      />
    </>
  );
};

export default UserListItem;
