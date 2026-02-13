import React from "react";

interface OperatorListItemProps {
  name: string;
  email: string;
  role: "Administrador" | "Suporte" | "Logística" | "Financeiro";
  status: "ATÍVO" | "INATIVO" | "OCUPADO";
  image: string;
}

const OperatorListItem: React.FC<OperatorListItemProps> = ({
  name,
  email,
  role,
  status,
  image,
}) => {
  const isInactive = status === "INATIVO";
  const isBusy = status === "OCUPADO";

  const statusStyles = {
    ATÍVO: "bg-emerald-50 text-emerald-600",
    INATIVO: "bg-slate-100 text-slate-500",
    OCUPADO: "bg-orange-50 text-orange-600",
  };

  const statusDots = {
    ATÍVO: "bg-emerald-500",
    INATIVO: "bg-slate-300",
    OCUPADO: "bg-orange-500",
  };

  return (
    <div
      className={`bg-white ${isInactive ? "opacity-70" : ""} p-4 rounded-[20px] shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md hover:border-purple-100 group`}
    >
      <div className="relative shrink-0">
        <img
          src={image}
          alt={name}
          className={`w-14 h-14 rounded-2xl object-cover ${isInactive ? "grayscale" : ""}`}
        />
        <span
          className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${statusDots[status]}`}
        ></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3
            className={`font-bold text-sm truncate ${isInactive ? "text-slate-400" : "text-slate-900"}`}
          >
            {name}
          </h3>
          <span
            className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-lg ${
              role === "Administrador"
                ? "bg-purple-100 text-[#6C3EF8]"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {role}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 truncate font-medium mb-2">
          {email}
        </p>

        <div className="flex items-center gap-1">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="size-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#6C3EF8] transition-all">
          <span className="material-symbols-outlined text-[18px]">
            manage_accounts
          </span>
        </button>
        <button className="size-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
          <span className="material-symbols-outlined text-[18px]">
            settings_power
          </span>
        </button>
      </div>
    </div>
  );
};

export default OperatorListItem;
