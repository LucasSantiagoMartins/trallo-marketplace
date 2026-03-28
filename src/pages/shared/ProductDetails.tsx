import React from "react";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailSellerInfo from "@/components/ProductDetailSellerInfo";
import ProductMainInfo from "@/components/ProductMainInfo";
import ProductDescription from "@/components/ProductDescription";
import ProductDetailModals from "@/components/ProductDetailModals";
import EmptyState from "@/components/EmptyState";
import { useProductGallery } from "@/hooks/useProductGallery";
import { UserRole } from "@/enums/user";
import { useProductDetails } from "@/hooks/useProductDetails";

const ProductDetails: React.FC = () => {
  const {
    product,
    dispatchStatus,
    loading,
    modalType,
    setModalType,
    paymentType,
    setPaymentType,
    paymentMethod,
    setPaymentMethod,
    pricing,
    handleBuyClick,
    handleConfirmCheckout,
    user,
  } = useProductDetails();

  const allImages = [product?.coverImage, ...(product?.images || [])].filter(
    Boolean,
  ) as string[];
  const gallery = useProductGallery(allImages.length);

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
        <EmptyState />
      </MobileLayout>
    );

  return (
    <MobileLayout>
      <PageHeader
        title="Detalhes do Produto"
        rightElement={
          <button
            onClick={() => setModalType("share")}
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft"
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
            <ProductMainInfo
              product={product}
              dispatchStatus={dispatchStatus}
            />
            <ProductDetailSellerInfo seller={product.seller} />
            <ProductDescription
              description={product.description}
              details={product.details}
            />

            {user?.role === UserRole.BUYER && (
              <div className="pt-4">
                <button
                  disabled={(product.stock?.availableQuantity || 0) <= 0}
                  onClick={handleBuyClick}
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
        pricing={pricing}
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
