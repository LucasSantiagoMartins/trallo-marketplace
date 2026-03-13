import React, { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import mcxImg from "@/assets/images/banks/mcx_express.png";

interface Props {
  paymentType: "online" | "presencial";
  paymentMethod: "mcx" | "transfer";
  setPaymentMethod: (method: "mcx" | "transfer") => void;
  deliveryFee: number;
  total: number;
  onClose: () => void;
  onConfirm: () => Promise<any>;
}

const CheckoutModal: React.FC<Props> = ({
  paymentType,
  paymentMethod,
  setPaymentMethod,
  deliveryFee,
  total,
  onClose,
  onConfirm,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [loading, setLoading] = useState(false);

  const handleFinalize = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Erro ao processar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (isMobile && info.offset.y > 100 && info.velocity.y > 20) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (!loading) onClose();
        }}
        className="absolute inset-0"
      />

      <motion.div
        initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
        animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
        exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
        className="relative bg-white dark:bg-[#141022] w-full md:max-w-md max-h-[95vh] flex flex-col overflow-hidden shadow-2xl border border-white/10 rounded-t-[2.5rem] md:rounded-[2.5rem] touch-none md:touch-auto"
      >
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="relative flex items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold flex-1 text-center">
            Confirmar Pedido
          </h2>

          <button
            onClick={onClose}
            className="hidden md:flex absolute right-4 size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all border border-gray-200 dark:border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {paymentType === "online" ? (
            <section>
              <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4 text-center">
                Método de Pagamento
              </h3>
              <div className="space-y-3">
                <div
                  onClick={() => !loading && setPaymentMethod("mcx")}
                  className={`flex items-center p-2 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "mcx" ? "border-[#6d3ff8] bg-[#6d3ff8]/5" : "border-gray-100 dark:border-gray-800"}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl flex items-center justify-center overflow-hidden p-2 transition-colors">
                      <img
                        src={mcxImg}
                        alt="MCX Express"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Multicaixa Express
                    </span>
                  </div>
                  {paymentMethod === "mcx" && (
                    <span className="material-symbols-outlined text-[#6d3ff8]">
                      check_circle
                    </span>
                  )}
                </div>
                <div
                  onClick={() => !loading && setPaymentMethod("transfer")}
                  className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "transfer" ? "border-[#6d3ff8] bg-[#6d3ff8]/5" : "border-gray-100 dark:border-gray-800"}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="material-symbols-outlined text-[#6d3ff8]">
                      account_balance
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Pagamento por referência
                    </span>
                  </div>
                  {paymentMethod === "transfer" && (
                    <span className="material-symbols-outlined text-[#6d3ff8]">
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="text-center p-6 bg-blue-50 dark:bg-blue-500/5 rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-[#6d3ff8] mb-2">
                store
              </span>
              <p className="font-bold text-gray-900 dark:text-white">
                Levantamento no Trallo
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                O pagamento será feito presencialmente no ato da recolha.
              </p>
            </section>
          )}

          <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Taxa de Entrega</span>
              <span className="font-medium">
                {deliveryFee.toLocaleString("pt-AO")} Kz
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center">
              <span className="font-bold text-gray-400 text-xs uppercase">
                Total Final
              </span>
              <span className="text-[#6d3ff8] font-black text-3xl">
                {total.toLocaleString("pt-AO")} Kz
              </span>
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-gray-800 pb-10 md:pb-6">
          <button
            onClick={handleFinalize}
            disabled={loading}
            className="w-full h-14 bg-[#6d3ff8] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-[#5b32d1] transition-colors disabled:opacity-70"
          >
            {loading ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
