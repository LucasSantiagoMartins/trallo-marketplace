import React, { useState, useEffect, useRef } from "react";
import mcxImg from "@/assets/images/banks/mcx_express.png";
import { formatPrice } from "@/utils/currency";
import TralloButton from "@/components/TralloButton";

interface Props {
  paymentType: "online" | "presencial";
  paymentMethod: "mcx" | "transfer";
  setPaymentMethod: (method: "mcx" | "transfer") => void;
  subtotal: number;
  deliveryFee?: number;
  serviceFee?: number;
  total: number;
  onClose: () => void;
  onConfirm: () => Promise<any>;
}

const CheckoutModal: React.FC<Props> = ({
  paymentType,
  paymentMethod,
  setPaymentMethod,
  subtotal,
  deliveryFee,
  serviceFee,
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
    if (deltaY > 0) setDragY(deltaY);
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

  const hasFees = deliveryFee !== undefined || serviceFee !== undefined;

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
        className={`relative bg-white dark:bg-[#1c182d] w-full md:max-w-md max-h-[95vh] flex flex-col overflow-hidden shadow-2xl border border-white/10 rounded-t-[2.5rem] md:rounded-[2.5rem] transition-all duration-300 ease-in-out ${
          isClosing
            ? "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
            : "animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95"
        }`}
      >
        <div className="flex justify-center md:justify-end pt-4 pb-2 px-6">
          <div className="md:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />

          <button
            onClick={handleClose}
            className="hidden md:flex items-center justify-center size-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold text-center">
            {paymentType === "online"
              ? "Método de Pagamento"
              : "Confirmar Pedido"}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
          {paymentType === "online" ? (
            <div className="space-y-3">
              <div
                onClick={() => !loading && setPaymentMethod("mcx")}
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                  paymentMethod === "mcx"
                    ? "border-[#6d3ff8] bg-[#6d3ff8]/5"
                    : "border-gray-100 dark:border-gray-800"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="size-10 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg flex items-center justify-center overflow-hidden p-1.5">
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
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
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
          ) : (
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-500/5 rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-[#6d3ff8] mb-2">
                store
              </span>
              <p className="font-bold text-gray-900 dark:text-white">
                Levantamento no Trallo
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                O pagamento será feito presencialmente no ato da recolha.
              </p>
            </div>
          )}

          {hasFees && (
            <div className="space-y-2 border-t border-gray-100 dark:border-white/5 pt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {deliveryFee !== undefined && (
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Taxa de Entrega</span>
                  <span className="font-semibold">
                    {deliveryFee === 0
                      ? "Grátis"
                      : `${formatPrice(deliveryFee)} `}
                  </span>
                </div>
              )}

              {serviceFee !== undefined && serviceFee > 0 && (
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Taxa de Serviço (3.5%)</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {formatPrice(serviceFee)}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
              Total Final a Pagar
            </span>
            <span className="font-black text-3xl text-[#6d3ff8]">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <TralloButton
            onClick={handleFinalize}
            disabled={loading}
            className="w-full h-14 bg-[#6d3ff8] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all disabled:opacity-70"
          >
            {loading ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
