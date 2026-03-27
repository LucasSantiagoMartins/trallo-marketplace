import React, { useEffect, useState } from "react";
import TralloButton from "@/components/TralloButton";
import { DeliveryResponseDto } from "@/dtos/delivery-response";

interface DeliveryDetailsModalProps {
  delivery: DeliveryResponseDto;
  onClose: () => void;
  isAdminView?: boolean;
}

const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  delivery,
  onClose,
  isAdminView = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-[#1c182d] w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-white/10 transition-all duration-300 transform ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Detalhes da Entrega
            </h2>
            <p className="text-sm text-gray-500 italic">
              Pedido: {delivery.order.orderNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="size-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          {!isAdminView && (
            <section>
              <h4 className="text-[10px] uppercase font-bold text-[#6d3ff8] mb-3 tracking-widest">
                Informações do Cliente
              </h4>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                <p className="font-bold text-gray-900 dark:text-white">
                  {delivery.order.buyerName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {delivery.order.address}
                </p>
              </div>
            </section>
          )}

          {delivery.deliverer && (
            <section>
              <h4 className="text-[10px] uppercase font-bold text-[#6d3ff8] mb-3 tracking-widest">
                Entregador Responsável
              </h4>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#6d3ff8]/10 flex items-center justify-center text-[#6d3ff8]">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {delivery.deliverer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-white/5">
                  <span className="material-symbols-outlined text-sm text-[#6d3ff8]">
                    call
                  </span>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {delivery.deliverer.phone}
                  </p>
                </div>
              </div>
            </section>
          )}

          <div className="pt-2">
            <TralloButton
              variant="gray"
              onClick={handleClose}
              className="w-full !h-12"
            >
              Fechar
            </TralloButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsModal;
