import React, { useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import { SearchedProductDTO } from "@/types/product";
import { formatPrice } from "@/utils/currency";
import {
  getProductConditionLabel,
  productConditionColor,
  productConditionIcon,
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
import { UserRole } from "@/enums/user";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!product) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-screen text-muted-foreground p-4 text-center">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-20">
            inventory_2
          </span>
          <p className="font-medium">
            Produto não encontrado ou link expirado.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-primary font-bold"
          >
            Voltar para a Home
          </button>
        </div>
      </MobileLayout>
    );
  }

  const allImages = [product.coverImage, ...(product.images || [])].filter(
    Boolean,
  );

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
    if (isSubmitting) return;

    const targetId = paramId || product.id;
    if (!targetId) {
      toast.error("ID do produto não encontrado.");
      return null;
    }

    try {
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
          <button
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-90 transition-transform"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  url: window.location.href,
                });
              }
            }}
          >
            <span className="material-symbols-outlined text-foreground">
              share
            </span>
          </button>
        }
      />

      <main className="pb-32 pt-14 lg:pt-20">
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
              <div className="absolute top-4 right-4 z-30 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                <button
                  onClick={() => setModalType("video")}
                  className="flex items-center gap-2 bg-black/60 hover:bg-primary backdrop-blur-md text-white px-3 py-2 rounded-full border border-white/20 transition-all duration-300 shadow-xl active:scale-95 group/vid lg:px-4 lg:py-2.5"
                >
                  <span className="material-symbols-outlined text-xl group-hover/vid:animate-pulse">
                    play_circle
                  </span>
                  <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider">
                    Ver Vídeo Real
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="px-4 md:px-6 lg:px-0 -mt-10 lg:mt-0 space-y-4 relative z-10">
            <div className="bg-card p-5 rounded-xl shadow-soft border border-border">
              {/* Título ocupando toda a largura */}
              <div className="mb-3">
                <h1 className="text-xl md:text-3xl font-bold leading-tight text-[#121118] dark:text-white">
                  {product.name}
                </h1>
              </div>

              {/* Preço com destaque */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-price font-bold text-primary">
                  {formatPrice(product.price, false)}
                </span>
                <span className="text-lg md:text-xl font-price font-bold text-primary">
                  Kz
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <div
                  className={`flex items-center gap-1.5 ${productConditionColor[product.condition]}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {productConditionIcon[product.condition]}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wide">
                    {getProductConditionLabel(product.condition)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="material-symbols-outlined text-[18px]">
                    inventory_2
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {product.stock.availableQuantity} disponíveis
                  </span>
                </div>
              </div>
            </div>

            <ProductDetailSellerInfo seller={product.seller} />

            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <h3 className="font-bold text-lg mb-4">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {product.description || "Sem descrição disponível."}
              </p>
            </div>

            {user?.role !== UserRole.SELLER && (
              <div className="pt-4 lg:pt-6">
                <button
                  disabled={product.stock.availableQuantity <= 0}
                  onClick={() => setModalType("payment_choice")}
                  className={`w-full ${product.stock.availableQuantity <= 0 ? "bg-slate-300 cursor-not-allowed" : "buy-gradient"} text-primary-foreground font-semibold text-lg rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform py-4 lg:py-5`}
                >
                  {product.stock.availableQuantity <= 0
                    ? "Esgotado"
                    : "Comprar Agora"}
                  
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black backdrop-blur-md animate-in fade-in duration-300"
          />

          <div className="relative w-full h-full md:h-auto md:max-w-4xl md:aspect-video md:rounded-3xl overflow-hidden shadow-2xl z-10 bg-black animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-300 ease-out">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 size-12 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors backdrop-blur-md border border-white/10 shadow-lg active:scale-90"
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
    </MobileLayout>
  );
};

export default ProductDetails;
