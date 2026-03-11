import React, { useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import VideoPlayer from "@/components/VideoPlayer";
import { checkoutFromProduct } from "@/services/checkout.service";
import { PaymentMethod, PaymentMode } from "@/enums/payment";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const product = location.state?.product as SearchedProductDTO;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalType, setModalType] = useState<
    "payment_choice" | "checkout" | "video" | null
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

  const handleConfirmCheckout = async () => {
    const targetId = paramId || product.id;

    if (!targetId) {
      toast.error("ID do produto não encontrado.");
      return null;
    }

    try {
      const mode =
        paymentType === "online"
          ? PaymentMode.ONLINE_PAYMENT
          : PaymentMode.ONSITE_PAYMENT;

      let method;
      if (paymentType === "online") {
        method =
          paymentMethod === "mcx"
            ? PaymentMethod.MULTICAIXA_EXPRESS
            : PaymentMethod.REFERENCE;
      }

      const response = await checkoutFromProduct(targetId, {
        paymentMode: mode,
        paymentMethod: method,
      });

      if (response && response.success) {
        toast.success("Pedido realizado com sucesso.");
        navigate("/meus-pedidos", { state: { order: response.data } });
        return response.data;
      } else {
        toast.error(response.message || "Erro ao processar checkout.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao conectar com o servidor.",
      );
    }
  };

  const closeModal = () => setModalType(null);

  const deliveryFee = paymentType === "presencial" ? 0 : 2500;
  const total = product.price + deliveryFee;

  return (
    <MobileLayout>
      <PageHeader
        title="Detalhes do Produto"
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
          <div className="relative group">
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

            {product.verificationVideo && (
              <div className="hidden lg:block absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setModalType("video")}
                  className="flex items-center gap-2 bg-black/60 hover:bg-primary backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-white/20 transition-all duration-300 shadow-xl active:scale-95 group/vid"
                >
                  <span className="material-symbols-outlined text-xl group-hover/vid:animate-pulse">
                    play_circle
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Ver Vídeo Real
                  </span>
                </button>
              </div>
            )}
          </div>

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

            {product.verificationVideo && (
              <button
                onClick={() => setModalType("video")}
                className="block lg:hidden w-full bg-card p-4 rounded-xl flex items-center gap-4 active:scale-[0.98] transition-all group relative overflow-hidden border-2 border-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]"
              >
                <div className="relative size-14 shrink-0 rounded-lg overflow-hidden bg-primary/5 flex items-center justify-center border border-primary/20">
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-primary text-2xl fill-1">
                      play_circle
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="material-symbols-outlined text-primary text-lg">
                      verified_user
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-tight text-foreground">
                      Verificação Real
                    </h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    Toque para confirmar o estado do produto em vídeo.
                  </p>
                </div>
                <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">
                    chevron_right
                  </span>
                </div>
              </button>
            )}

            {user?.role !== "SELLER" && (
              <div className="pt-4 lg:pt-6">
                <button
                  onClick={() => setModalType("payment_choice")}
                  className="w-full buy-gradient text-primary-foreground font-semibold text-lg rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform py-4 lg:py-5"
                >
                  Comprar Agora
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            )}
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
            onConfirm={handleConfirmCheckout}
          />
        )}

        {modalType === "video" && product.verificationVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full h-full md:h-auto md:max-w-4xl md:aspect-video md:rounded-3xl overflow-hidden shadow-2xl z-10 bg-black"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 size-12 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors backdrop-blur-md border border-white/10 shadow-lg active:scale-90"
              >
                <span className="material-symbols-outlined text-3xl">
                  close
                </span>
              </button>
              <VideoPlayer
                src={`${BASE_UPLOAD_URL}/${product.verificationVideo}`}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default ProductDetails;
