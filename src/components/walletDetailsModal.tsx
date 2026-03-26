import React, { useEffect } from "react";
import { AdminWallet } from "@/dtos/admin-management";
import { formatPrice } from "@/utils/currency";
import { Clock, ShieldCheck, Store, X } from "lucide-react";
import { formatDateFriendly } from "@/utils/date";

interface WalletDetailsModalProps {
  wallet: AdminWallet | null;
  onClose: () => void;
}

export const WalletDetailsModal: React.FC<WalletDetailsModalProps> = ({
  wallet,
  onClose,
}) => {
  useEffect(() => {
    if (wallet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [wallet]);

  if (!wallet) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2rem] p-6 shadow-xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
          <X size={20} />
        </button>

        <header className="flex items-center gap-3 mb-6">
          <div
            className={`p-3 rounded-xl ${
              wallet.walletType === "PLATFORM"
                ? "bg-slate-100 text-slate-600"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {wallet.walletType === "PLATFORM" ? (
              <ShieldCheck size={24} />
            ) : (
              <Store size={24} />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight truncate">
              {wallet.owner.fullName}
            </h2>
            <p className="text-xs text-slate-500 truncate">
              {wallet.owner.email}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tipo de Conta
            </p>
            <p className="text-xs font-semibold text-slate-700">
              {wallet.walletType === "PLATFORM" ? "Sistema" : "Vendedor"}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              ID Carteira
            </p>
            <p className="text-xs font-semibold text-slate-700 truncate">
              #{wallet.id.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 space-y-5">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Saldo Disponível
            </p>
            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(wallet.availableBalance)}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Saldo Retido
              </p>
              <p className="text-sm font-bold text-slate-600">
                {formatPrice(wallet.heldBalance)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-slate-400 mb-0.5">
                <Clock size={12} />
                <span className="text-[9px] font-bold uppercase tracking-tight">
                  Atualizado
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500">
                {formatDateFriendly(wallet.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
