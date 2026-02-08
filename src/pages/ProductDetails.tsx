import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const product = {
    id: id || "1",
    name: "Sneakers Limited Edition 2024",
    price: 75000,
    currency: "Kz",
    location: "Talatona, Luanda",
    postedAt: "2 horas",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
      "https://images.unsplash.com/photo-1508138221679-760a23a2285b",
    ],
    seller: {
      name: "Mauro dos Santos",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGHeFky3iv08zPVeviYh1KRqWNEpy09Fe5yBuVTQ_xQxPC-ZckE78MsjiuuFxAcXukgqfThQGXleH-ER8KZ64QdofUmL9km0sEv9Kzxh_vesIeHRoxPh-suj_N8r7Bu5bBZK0HHaO6KW084buPltCKRZUCTS4gwe3YOeCaOXo75D07YVqn3LfDHlON8PXdExEe1gWTK_JMnsxr5wb7SxR-P_a8HyvHzwBhThSpu5fsnrPnCRkU-1VMK7PEjbjHu5xWQJF_5PbxEG36",
      rating: 4.9,
      sales: 124,
      verified: true,
    },
    description: `Estes ténis representam o auge do design urbano para 2024. Construídos com materiais de alta performance, oferecem conforto inigualável para o dia-a-dia em Luanda.

• Tamanhos disponíveis: 40-44
• Cor: Phantom Black & Purple
• Inclui caixa original e certificado de autenticidade.`,
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-AO");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50 && currentImageIndex < product.images.length - 1) {
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
            onPointerDown={(e) => {
              if (e.pointerType === "touch") {
                touchStartX.current = e.clientX;
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
            />

            <div className="absolute bottom-12 lg:bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
              {product.images.map((_, index) => (
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

            <div className="absolute top-6 left-4">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Edição limitada
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
                  <span className="text-xs font-bold">NOVO</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-price font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg md:text-xl font-price font-bold text-primary">
                  {product.currency}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-muted-foreground text-sm">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                <span>{product.location}</span>
                <span className="mx-1">•</span>
                <span>Publicado há {product.postedAt}</span>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl shadow-soft border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="size-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  {product.seller.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-primary-foreground size-5 rounded-full flex items-center justify-center border-2 border-card">
                      <span className="material-symbols-outlined text-[10px] font-bold">
                        verified
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {product.seller.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-xs">
                      star
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.seller.rating} ({product.seller.sales} vendas)
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
                  Pagamento Presencial TRALLO
                </h4>
                <p className="text-xs text-primary/80 leading-tight">
                  No pagamento presencial, o pedido fica reservado e o cliente
                  efetua o pagamento diretamente nas instalações.
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
