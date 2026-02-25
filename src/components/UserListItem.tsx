import React from "react";
import { UserResponseDTO } from "@/types/user";
import { getUserRoleColor, getUserRoleLabel } from "@/utils/mappers/user.mapper";

interface UserListItemProps {
  user: UserResponseDTO;
  onActionClick?: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onActionClick }) => {
  const isSuspended = user.isSuspended;

  return (
    <div
      className={`bg-white ${
        isSuspended ? "opacity-75" : ""
      } p-4 rounded-[16px] shadow-sm border border-slate-50 flex items-center gap-4 transition-all hover:shadow-md`}
    >
      <div className="relative shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
          alt={user.fullName}
          className={`w-12 h-12 rounded-full object-cover ${
            isSuspended ? "grayscale" : ""
          }`}
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
            isSuspended ? "bg-red-500" : "bg-emerald-500"
          }`}
        ></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3
            className={`font-bold text-sm truncate ${
              isSuspended ? "text-slate-400" : "text-slate-900"
            }`}
          >
            {user.fullName}
          </h3>
          <span
            className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md ${getUserRoleColor(
              user.role,
            )}`}
          >
            {getUserRoleLabel(user.role)}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 truncate font-medium">
          {user.email}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded ${
              isSuspended
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {isSuspended ? "SUSPENSO" : "ATIVO"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button
          onClick={onActionClick}
          className={`p-1.5 rounded-xl transition-colors ${
            isSuspended
              ? "bg-purple-50 text-[#6C3EF8] hover:bg-purple-100"
              : "text-slate-300 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isSuspended ? "lock_open" : "block"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserListItem;
