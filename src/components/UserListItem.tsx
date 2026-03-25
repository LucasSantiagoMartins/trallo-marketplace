import React, { useState } from "react";
import { UserResponseDTO } from "@/types/user";
import {
  getUserRoleColor,
  getUserRoleLabel,
} from "@/utils/mappers/user.mapper";
import UserDetailsModal from "./UserDetailsModal";

interface UserListItemProps {
  user: UserResponseDTO;
  onSuspendClick: () => void;
  onReactivateClick: () => void;
  onDeleteClick: () => void;
  styleDelay: number;
  isMounted: boolean;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onSuspendClick,
  onReactivateClick,
  onDeleteClick,
  styleDelay,
  isMounted,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSuspended = user.isSuspended;

  return (
    <>
      <div
        style={{
          transitionDelay: `${styleDelay}ms`,
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? "translateY(0)" : "translateY(10px)",
        }}
        className={`bg-white ${isSuspended ? "bg-slate-50/50" : ""} p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 relative transition-all hover:shadow-md ${
          isMenuOpen ? "z-[100] ring-2 ring-slate-200" : "z-10"
        }`}
      >
        <div className="relative shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
            alt={user.fullName}
            className={`w-12 h-12 rounded-full object-cover ${isSuspended ? "grayscale opacity-50" : ""}`}
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
        </div>

        <div className="relative flex items-center gap-1">
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="p-2 text-slate-400 hover:text-[#6C3EF8] transition-colors rounded-full"
          >
            <span className="material-symbols-outlined text-[20px]">
              visibility
            </span>
          </button>

          <div className="relative" onMouseLeave={() => setIsMenuOpen(false)}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all text-slate-400 ${
                isMenuOpen ? "bg-slate-100" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                more_vert
              </span>
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[40]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-[50] animate-in fade-in zoom-in duration-200 origin-top-right">
                  {isSuspended ? (
                    <button
                      onClick={() => {
                        onReactivateClick();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        lock_open
                      </span>
                      Reativar Conta
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onSuspendClick();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        block
                      </span>
                      Suspender
                    </button>
                  )}
                  <div className="h-[1px] bg-slate-100 my-1" />
                  <button
                    onClick={() => {
                      onDeleteClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                    Excluir Usuário
                  </button>
                </div>
              </>
            )}
          </div>
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
