import React, { useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import { SearchedProductDTO } from "@/types/product";
import { formatPrice } from "@/utils/currency";
import {
  getProductConditionLabel,
  getProductStatusColor,
  getProductStatusLabel,
} from "@/utils/mappers/product.mapper";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailSellerInfo from "@/components/ProductDetailSellerInfo";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product as SearchedProductDTO;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalType, setModalType] = useState<
    "payment_choice" | "checkout" | null
  >(null);
  const [paymentType, setPaymentType] = useState<"online" | "presencial">(
    "online",
  );
  const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!product) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-screen text-muted-foreground">
          Produto não encontrado.
        </div>
      </MobileLayout>
    );
  }

  const allImages = [product.coverImage, ...(product.images || [])];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50 && currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else if (distance < -50 && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const closeModal = () => setModalType(null);

  const deliveryFee = paymentType === "presencial" ? 0 : 2500;
  const total = product.price + deliveryFee;

  return (
    <MobileLayout>
      <PageHeader
        title="Detalhes do Produto"
        backTo={-1}
        rightElement={
          <button className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft">
            <span className="material-symbols-outlined text-foreground">
              share
            </span>
          </button>
        }
      />

      <main className="pb-32 pt-16 md:pt-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-7xl lg:mx-auto lg:px-8">
          <ProductImageGallery
            images={allImages}
            currentIndex={currentImageIndex}
            productName={product.name}
            category={product.category}
            onIndexChange={setCurrentImageIndex}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          <div className="px-4 md:px-6 lg:px-0 -mt-8 lg:mt-0 space-y-4 relative z-10">
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <div className="flex justify-between items-start mb-2 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight flex-1">
                  {product.name}
                </h1>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg shrink-0">
                  <span className="text-xs font-bold uppercase">
                    {getProductConditionLabel(product.condition)}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-price font-bold text-primary">
                  {formatPrice(product.price, false)}
                </span>
                <span className="text-lg md:text-xl font-price font-bold text-primary">
                  Kz
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-y-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    inventory_2
                  </span>
                  <span>{product.stock.availableQuantity} disponíveis</span>
                </div>

                <span className="mx-2 text-border">•</span>

                <div
                  className={`flex items-center gap-1 ${getProductStatusColor(product.status)} bg-transparent font-bold`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span className="text-xs uppercase tracking-wide">
                    {getProductStatusLabel(product.status)}
                  </span>
                </div>
              </div>
            </div>

            <ProductDetailSellerInfo seller={product.seller} />

            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <h3 className="font-bold text-lg mb-4">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary">
                security
              </span>
              <div>
                <h4 className="text-sm font-bold text-primary">
                  Compra Segura TRALLO
                </h4>
                <p className="text-xs text-primary/80 leading-tight">
                  Este produto está coberto pelo sistema de proteção ao
                  comprador. Pagamento seguro e garantia de entrega.
                </p>
              </div>
            </div>

            <div className="pt-4 lg:pt-6">
              <button
                onClick={() => setModalType("payment_choice")}
                className="w-full buy-gradient text-primary-foreground font-semibold text-lg rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform py-4 lg:py-5"
              >
                Comprar Agora
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
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
            deliveryFee={deliveryFee}
            total={total}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default ProductDetails;
