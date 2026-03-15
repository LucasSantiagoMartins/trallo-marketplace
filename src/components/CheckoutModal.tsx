import React, { useState, useEffect, useRef } from "react";
import mcxImg from "@/assets/images/banks/mcx_express.png";
import { formatPrice } from "@/utils/currency";

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
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);

  const touchStart = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    if (loading) return;
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStart.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    if (dragY > 100) {
      handleClose();
    } else {
      setDragY(0);
    }
  };

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

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "animate-in fade-in"
      }`}
    >
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform:
            window.innerWidth < 768 && dragY > 0
              ? `translateY(${dragY}px)`
              : undefined,
          transition: isDragging.current ? "none" : "transform 0.3s ease-out",
        }}
        className={`relative bg-white dark:bg-[#141022] w-full md:max-w-md max-h-[95vh] flex flex-col overflow-hidden shadow-2xl border border-white/10 rounded-t-[2.5rem] md:rounded-[2.5rem] transition-all duration-300 ease-in-out ${
          isClosing
            ? "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
            : "animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95"
        }`}
      >
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="relative flex items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold flex-1 text-center">
            Confirmar Pedido
          </h2>

          <button
            onClick={handleClose}
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
                  className={`flex items-center p-2 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    paymentMethod === "mcx"
                      ? "border-[#6d3ff8] bg-[#6d3ff8]/5"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl flex items-center justify-center overflow-hidden p-2">
                      <img
                        src={mcxImg}
                        alt="MCX Express"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
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
                  className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                    paymentMethod === "transfer"
                      ? "border-[#6d3ff8] bg-[#6d3ff8]/5"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="material-symbols-outlined text-[#6d3ff8]">
                      account_balance
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                O pagamento será feito presencialmente no ato da recolha.
              </p>
            </section>
          )}

          <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span>Taxa de Entrega</span>
              <span className="font-medium">
                {deliveryFee.toLocaleString("pt-AO")} Kz
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center">
              <span className="font-bold text-gray-400 text-[10px] uppercase">
                Total Final
              </span>
              <span className="text-[#6d3ff8] font-black text-2xl">
                {formatPrice(total, true)}
              </span>
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-gray-800 pb-10 md:pb-6">
          <button
            onClick={handleFinalize}
            disabled={loading}
            className="w-full h-14 bg-[#6d3ff8] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
