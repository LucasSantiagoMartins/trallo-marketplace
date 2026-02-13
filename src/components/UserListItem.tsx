import React from "react";

interface UserListItemProps {
  name: string;
  email: string;
  role: "Vendedor" | "Comprador";
  status: "ATÍVO" | "SUSPENSO";
  image: string;
}

const UserListItem: React.FC<UserListItemProps> = ({
  name,
  email,
  role,
  status,
  image,
}) => {
  const isSuspended = status === "SUSPENSO";

  return (
    <div
      className={`bg-white ${isSuspended ? "opacity-70" : ""} p-4 rounded-[16px] shadow-sm border border-slate-50 flex items-center gap-4 transition-all`}
    >
      <div className="relative shrink-0">
        <img
          src={image}
          alt={name}
          className={`w-12 h-12 rounded-full object-cover ${isSuspended ? "grayscale" : ""}`}
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${isSuspended ? "bg-red-500" : "bg-emerald-500"}`}
        ></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3
            className={`font-bold text-sm truncate ${isSuspended ? "text-slate-400" : "text-slate-900"}`}
          >
            {name}
          </h3>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-wider rounded-md">
            {role}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 truncate font-medium">
          {email}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded ${
              isSuspended
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button className="p-1.5 text-slate-300 hover:text-[#6C3EF8] transition-colors">
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button
          className={`p-1.5 transition-colors ${isSuspended ? "text-[#6C3EF8]" : "text-slate-300 hover:text-red-500"}`}
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
