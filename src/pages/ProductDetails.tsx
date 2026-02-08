import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock product data
  const product = {
    id: id || "1",
    name: "Sneakers Limited Edition 2024",
    price: 75000,
    currency: "Kz",
    location: "Talatona, Luanda",
    postedAt: "2 horas",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCK-hYGdMcQg1wQy4Qf_CHpyGBAqzQ0A7uCRc4oN9ix3AzSxLpmHlkWs4_t4Xv1qxWznOoUJrV-wiG-w4srZLf7bSAU23kSASToyKOkv9LHxIHGg-46orI0r0FRNNUxes9d0DTR8bnvo_ULYImuFriNMgejYwriUmiJeMOlMbNfADcctMhrffBRvsDwE2zudtWfH4yqSzaps1ObOE3Fj2nsdWiStH2zQjzq6y-QEITmpjV-PJxdhaFa9bBgOU__3suutf_U62XrOVLC",
    ],
    seller: {
      name: "Mauro dos Santos",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGHeFky3iv08zPVeviYh1KRqWNEpy09Fe5yBuVTQ_xQxPC-ZckE78MsjiuuFxAcXukgqfThQGXleH-ER8KZ64QdofUmL9km0sEv9Kzxh_vesIeHRoxPh-suj_N8r7Bu5bBZK0HHaO6KW084buPltCKRZUCTS4gwe3YOeCaOXo75D07YVqn3LfDHlON8PXdExEe1gWTK_JMnsxr5wb7SxR-P_a8HyvHzwBhThSpu5fsnrPnCRkU-1VMK7PEjbjHu5xWQJF_5PbxEG36",
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

  return (
    <MobileLayout>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-6 lg:px-8 py-3 flex items-center justify-center border-b border-border/5">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft"
          >
            <span className="material-symbols-outlined text-foreground">arrow_back</span>
          </button>
          <h2 className="text-foreground text-sm font-bold uppercase tracking-widest">TRALLO</h2>
          <div className="flex gap-2">
            <button className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft">
              <span className="material-symbols-outlined text-foreground">share</span>
            </button>
            <button className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft">
              <span className="material-symbols-outlined text-foreground">favorite</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pb-32">
        {/* Product Layout - Desktop uses side-by-side */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-7xl lg:mx-auto lg:pt-20 lg:px-8">
          {/* Product Image Gallery */}
          <div className="relative w-full h-[420px] md:h-[500px] lg:h-[600px] bg-card overflow-hidden lg:rounded-2xl">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Image Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              <div className="w-8 h-1 rounded-full bg-primary-foreground" />
              <div className="w-8 h-1 rounded-full bg-primary-foreground/40" />
              <div className="w-8 h-1 rounded-full bg-primary-foreground/40" />
              <div className="w-8 h-1 rounded-full bg-primary-foreground/40" />
            </div>
            {/* Premium Badge */}
            <div className="absolute top-24 lg:top-6 left-4">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Premium Selection
              </span>
            </div>
          </div>

          {/* Product Info Cards */}
          <div className="px-4 md:px-6 lg:px-0 -mt-6 lg:mt-0 relative z-10 space-y-4">
            {/* Main Info Card */}
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight flex-1">{product.name}</h1>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold">NOVO</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-price font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg md:text-xl font-price font-bold text-primary">{product.currency}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-muted-foreground text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{product.location}</span>
                <span className="mx-1">•</span>
                <span>Publicado há {product.postedAt}</span>
              </div>
            </div>

            {/* Seller Card */}
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
                      <span className="material-symbols-outlined text-[10px] font-bold">verified</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{product.seller.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-xs">star</span>
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

            {/* Description Card */}
            <div className="bg-card p-6 rounded-xl shadow-soft border border-border">
              <h3 className="font-bold text-lg mb-4">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {product.description}
              </p>
              <button className="mt-4 text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                Ver especificações técnicas
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
            </div>

            {/* Security Notice */}
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary">security</span>
              <div>
                <h4 className="text-sm font-bold text-primary">Compra Segura TRALLO</h4>
                <p className="text-xs text-primary/80 leading-tight">
                  Recomendamos sempre o encontro em locais públicos para a entrega de artigos.
                </p>
              </div>
            </div>

            {/* Desktop CTA - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex gap-4 pt-4">
              <button className="size-14 shrink-0 flex items-center justify-center bg-card rounded-xl border border-border text-primary shadow-soft active:scale-95 transition-transform hover:bg-muted">
                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
              </button>
              <button className="flex-1 buy-gradient text-primary-foreground font-semibold text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform py-4">
                Comprar Agora
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 glass-header border-t border-border/10 z-[100] safe-area-bottom lg:hidden">
        <div className="flex gap-4 px-4 py-4 max-w-md mx-auto">
          <button className="size-14 shrink-0 flex items-center justify-center bg-card rounded-xl border border-border text-primary shadow-soft active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
          </button>
          <button className="flex-1 buy-gradient text-primary-foreground font-semibold text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            Comprar Agora
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProductDetails;
