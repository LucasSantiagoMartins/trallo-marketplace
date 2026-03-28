import React from "react";
import PaymentChoiceModal from "./PaymentChoiceModal";
import CheckoutModal from "./CheckoutModal";
import ShareModal from "./ShareModal";
import VideoPlayer from "./VideoPlayer";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SearchedProductDTO } from "@/types/product";

interface ProductDetailModalsProps {
  modalType: "payment_choice" | "checkout" | "video" | "share" | null;
  product: SearchedProductDTO;
  paymentType: "online" | "presencial";
  paymentMethod: "mcx" | "transfer";
  pricing: {
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    total: number;
  };
  closeModal: () => void;
  setPaymentType: (type: "online" | "presencial") => void;
  setModalType: (
    type: "payment_choice" | "checkout" | "video" | "share" | null,
  ) => void;
  setPaymentMethod: (method: "mcx" | "transfer") => void;
  handleConfirmCheckout: () => Promise<void>;
}

const ProductDetailModals: React.FC<ProductDetailModalsProps> = ({
  modalType,
  product,
  paymentType,
  paymentMethod,
  pricing,
  closeModal,
  setPaymentType,
  setModalType,
  setPaymentMethod,
  handleConfirmCheckout,
}) => {
  return (
    <>
      {modalType === "payment_choice" && (
        <PaymentChoiceModal
          onClose={closeModal}
          onSelect={(type) => {
            setPaymentType(type);
            setModalType("checkout");
          }}
        />
      )}

      {modalType === "checkout" && (
        <CheckoutModal
          paymentType={paymentType}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          subtotal={pricing.subtotal}
          deliveryFee={pricing.deliveryFee}
          serviceFee={pricing.serviceFee}
          total={pricing.total}
          onClose={() => setModalType(null)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      {modalType === "share" && (
        <ShareModal
          isOpen={true}
          onClose={closeModal}
          productName={product.name}
          slug={product.slug}
        />
      )}

      {modalType === "video" && product.verificationVideo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <div className="relative w-full h-full md:h-auto md:max-w-4xl md:rounded-3xl overflow-hidden z-[120]">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-[130] size-12 bg-black/30 text-white rounded-full"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <VideoPlayer
              src={
                product.verificationVideo.startsWith("http")
                  ? product.verificationVideo
                  : `${BASE_UPLOAD_URL}/${product.verificationVideo}`
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailModals;
