import React, { useEffect, useState } from "react";

interface Props {
  onSelect: (type: "online" | "presencial") => void;
  onClose: () => void;
}

const PaymentChoiceModal: React.FC<Props> = ({ onSelect, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "animate-in fade-in"
      }`}
    >
      <div
        className={`bg-white dark:bg-[#1c182d] w-full max-w-sm rounded-3xl p-6 shadow-2xl transition-all duration-200 ease-in-out ${
          isClosing ? "opacity-0 scale-95" : "animate-in fade-in zoom-in-95"
        }`}
      >
        <h3 className="text-xl font-black mb-6 text-center text-gray-900 dark:text-white">
          Tipo de Pagamento
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => onSelect("online")}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-[#6d3ff8] transition-all bg-gray-50 dark:bg-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[#6d3ff8] text-3xl">
              language
            </span>
            <div className="text-left text-gray-900 dark:text-white">
              <p className="font-bold">Pagamento Online</p>
              <p className="text-xs text-gray-500">
                MCX Express ou Transferência
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelect("presencial")}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-[#6d3ff8] transition-all bg-gray-50 dark:bg-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[#6d3ff8] text-3xl">
              handshake
            </span>
            <div className="text-left text-gray-900 dark:text-white">
              <p className="font-bold">Pagamento Presencial</p>
              <p className="text-xs text-gray-500">Pague e levante no Trallo</p>
            </div>
          </button>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-6 py-3 rounded-2xl border-2 border-[#6d3ff8] text-[#6d3ff8] font-bold active:bg-[#6d3ff8] active:text-white transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PaymentChoiceModal;
