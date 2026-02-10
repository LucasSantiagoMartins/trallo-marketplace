import React from "react";

const ValidationInfoCard: React.FC = () => (
  <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm min-w-[280px]">
    <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
      <span className="material-symbols-outlined">verified_user</span>
    </div>
    <h4 className="font-black text-lg mb-2 tracking-tight">
      Critérios de Aprovação
    </h4>
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      Verifique se as fotos são reais, o preço é condizente com o mercado e se a descrição não viola as diretrizes da comunidade.
    </p>
  </div>
);

export default ValidationInfoCard;