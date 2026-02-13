import React, { useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import { SearchedProductDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";
import { getProductConditionLabel } from "@/utils/mappers/productMapper";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const product = location.state?.product as SearchedProductDTO;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

      <main className="pb-10 pt-16 md:pt-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div
            className="relative w-full h-[420px] md:h-[500px] lg:h-[600px] bg-card overflow-hidden lg:rounded-2xl touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={currentImageIndex}
              src={`${BASE_UPLOAD_URL}${allImages[currentImageIndex]}`}
              alt={product.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
            />

            {allImages.length > 1 && (
              <div className="absolute bottom-12 lg:bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "w-8 bg-white shadow-lg"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="absolute top-6 left-4">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category || "Produto"}
              </span>
            </div>
          </div>

          <div className="px-4 md:px-6 lg:px-0 -mt-8 lg:mt-0 space-y-4 relative z-10">
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight flex-1">
                  {product.name}
                </h1>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg">
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
              <div className="mt-4 flex items-center gap-2 text-muted-foreground text-sm">
                <span className="material-symbols-outlined text-sm">
                  inventory_2
                </span>
                <span>
                  {product.stock.availableQuantity} unidades disponíveis
                </span>
                <span className="mx-1">•</span>
                <span>ID: {product.id.substring(0, 8)}</span>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl shadow-soft border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      product.seller.profilePicture
                        ? `${BASE_UPLOAD_URL}${product.seller.profilePicture}`
                        : "/placeholder-user.png"
                    }
                    alt={product.seller.fullName}
                    className="size-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-primary-foreground size-5 rounded-full flex items-center justify-center border-2 border-card">
                    <span className="material-symbols-outlined text-[10px] font-bold">
                      verified
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {product.seller.fullName}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-xs">
                      star
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Vendedor
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-muted px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-muted/80 transition-colors">
                Perfil
              </button>
            </div>

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
              <button className="w-full buy-gradient text-primary-foreground font-semibold text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform py-4 lg:py-5">
                Comprar Agora
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};

export default ProductDetails;
