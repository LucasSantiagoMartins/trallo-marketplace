import React from "react";
import { UserResponseDTO } from "@/types/user";
import { getUserRoleColor, getUserRoleLabel } from "@/utils/mappers/user.mapper";

interface UserDetailsModalProps {
  user: UserResponseDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[24px] overflow-hidden shadow-2xl">
        <div className="relative h-24 bg-gradient-to-r from-slate-800 to-slate-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="px-6 pb-8">
          <div className="relative -mt-12 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&size=128`}
              alt={user.fullName}
              className="w-24 h-24 rounded-[20px] border-4 border-white shadow-lg object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{user.fullName}</h2>
                <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${getUserRoleColor(user.role)}`}>
                  {getUserRoleLabel(user.role)}
                </span>
              </div>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Status</span>
                <span className={`text-xs font-bold ${user.isSuspended ? "text-red-500" : "text-emerald-500"}`}>
                  {user.isSuspended ? "CONTA SUSPENSA" : "CONTA ATIVA"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">ID Usuário</span>
                <span className="text-xs font-bold text-slate-700 truncate block">#{user.id}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;