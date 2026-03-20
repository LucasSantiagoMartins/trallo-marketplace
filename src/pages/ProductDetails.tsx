import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import { SearchedProductDTO } from "@/types/product";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailSellerInfo from "@/components/ProductDetailSellerInfo";
import { checkoutFromProduct } from "@/services/checkout.service";
import { searchBySlug } from "@/services/product.service";
import { PaymentMethod, PaymentMode } from "@/enums/payment";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { UserRole } from "@/enums/user";
import ProductMainInfo from "@/components/ProductMainInfo";
import ProductDescription from "@/components/ProductDescription";
import { useProductGallery } from "@/hooks/useProductGallery";
import ProductDetailModals from "@/components/ProductDetailModals";

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [product, setProduct] = useState<SearchedProductDTO | null>(
    (location.state?.product as SearchedProductDTO) || null,
  );

  const [loading, setLoading] = useState(!product && !!slug);
  const [modalType, setModalType] = useState<
    "payment_choice" | "checkout" | "video" | "share" | null
  >(null);
  const [paymentType, setPaymentType] = useState<"online" | "presencial">(
    "online",
  );
  const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allImages = [product?.coverImage, ...(product?.images || [])].filter(
    Boolean,
  ) as string[];
  const gallery = useProductGallery(allImages.length);

  useEffect(() => {
    async function loadProduct() {
      if (product || !slug) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await searchBySlug(slug);
        if (response?.success) {
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          if (data) setProduct(data);
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading)
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </MobileLayout>
    );

  if (!product)
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
            className="mt-4 text-primary font-bold bg-primary/10 px-6 py-2 rounded-full"
          >
            Voltar para a Home
          </button>
        </div>
      </MobileLayout>
    );

  const handleConfirmCheckout = async () => {
    if (isSubmitting || !isAuthenticated) {
      !isAuthenticated && navigate("/entrar");
      return;
    }
    try {
      setIsSubmitting(true);
      const mode =
        paymentType === "online"
          ? PaymentMode.ONLINE_PAYMENT
          : PaymentMode.ONSITE_PAYMENT;
      const method =
        paymentType === "online"
          ? paymentMethod === "mcx"
            ? PaymentMethod.MULTICAIXA_EXPRESS
            : PaymentMethod.REFERENCE
          : undefined;

      const response = await checkoutFromProduct(product.id, {
        paymentMode: mode,
        paymentMethod: method,
      });
      if (response?.success) {
        toast.success("Pedido realizado com sucesso.");
        navigate("/meus-pedidos", { state: { order: response.data } });
      } else {
        toast.error(response.message || "Erro ao processar checkout.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliveryFee = paymentType === "presencial" ? 0 : 2500;
  const total = (product.price || 0) + deliveryFee;

  return (
    <MobileLayout>
      <PageHeader
        title="Detalhes do Produto"
        rightElement={
          <button
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-90 transition-transform"
            onClick={() => setModalType("share")}
          >
            <span className="material-symbols-outlined text-foreground">
              share
            </span>
          </button>
        }
      />

      <main className="pb-10 pt-14 lg:pt-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="relative group">
            <ProductImageGallery
              images={allImages}
              currentIndex={gallery.currentImageIndex}
              productName={product.name}
              category={product.category}
              onIndexChange={gallery.setCurrentImageIndex}
              onTouchStart={gallery.handleTouchStart}
              onTouchMove={gallery.handleTouchMove}
              onTouchEnd={gallery.handleTouchEnd}
            />
            {product.verificationVideo && (
              <div className="absolute top-4 right-4 z-30">
                <button
                  onClick={() => setModalType("video")}
                  className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-full border border-white/20"
                >
                  <span className="material-symbols-outlined text-xl">
                    play_circle
                  </span>
                  <span className="text-[10px] font-bold uppercase">
                    Ver Vídeo Real
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="px-4 space-y-4 relative z-20 -mt-10 lg:mt-0">
            <ProductMainInfo product={product} />
            <ProductDetailSellerInfo seller={product.seller} />
            <ProductDescription
              description={product.description}
              details={product.details}
            />
            {user?.role !== UserRole.SELLER && (
              <div className="pt-4">
                <button
                  disabled={(product.stock?.availableQuantity || 0) <= 0}
                  onClick={() =>
                    isAuthenticated
                      ? setModalType("payment_choice")
                      : navigate("/entrar")
                  }
                  className={`w-full ${(product.stock?.availableQuantity || 0) <= 0 ? "bg-slate-300" : "buy-gradient"} text-primary-foreground font-semibold text-lg rounded-full py-4 shadow-lg active:scale-[0.98] transition-transform`}
                >
                  {(product.stock?.availableQuantity || 0) <= 0
                    ? "Esgotado"
                    : "Comprar Agora"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <ProductDetailModals
        modalType={modalType}
        product={product}
        paymentType={paymentType}
        paymentMethod={paymentMethod}
        deliveryFee={deliveryFee}
        total={total}
        closeModal={() => setModalType(null)}
        setPaymentType={setPaymentType}
        setModalType={setModalType}
        setPaymentMethod={setPaymentMethod}
        handleConfirmCheckout={handleConfirmCheckout}
      />
    </MobileLayout>
  );
};

export default ProductDetails;
