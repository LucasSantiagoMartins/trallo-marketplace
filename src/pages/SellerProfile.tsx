import React, { useState, useRef } from "react";
import BottomNavigation from "../components/BottomNavigation";
import PageHeader from "../components/PageHeader";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SearchedProductDTO } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ReviewItem from "@/components/reviewItem";

const SellerProfileScreen: React.FC = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const seller = {
    fullName: "Lucas Santiago",
    profilePicture: null,
    address: "Viana, Luanda",
    isVerified: true,
    memberSince: "2024",
    stats: {
      sales: "1,482",
      rating: "4.9",
      responseTime: "15 min",
    },
  };

  const listings: SearchedProductDTO[] = [
    {
      id: "1",
      name: "Apple Watch Series 9",
      price: 299000,
      coverImage:
        "https://images.unsplash.com/photo-1546868891-d5b8ad0b9044?q=80&w=500&auto=format&fit=crop",
      condition: "NEW",
      status: "AVAILABLE",
      category: "Wearables",
    } as any,
    {
      id: "2",
      name: "Sony WH-1000XM5",
      price: 189500,
      coverImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
      condition: "USED",
      status: "AVAILABLE",
      category: "Audio",
    } as any,
    {
      id: "3",
      name: "Logitech MX Master 3S",
      price: 45000,
      coverImage:
        "https://images.unsplash.com/photo-1625773753120-15f8f30026b7?q=80&w=500&auto=format&fit=crop",
      condition: "NEW",
      status: "AVAILABLE",
      category: "Acessórios",
    } as any,
    {
      id: "4",
      name: "iPhone 15 Pro Max",
      price: 1250000,
      coverImage:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500&auto=format&fit=crop",
      condition: "NEW",
      status: "AVAILABLE",
      category: "Smartphones",
    } as any,
  ];

  const reviews = [
    {
      name: "Elena J.",
      initials: "EJ",
      rating: 5,
      comment: "Qualidade impressionante. Envio super rápido para Luanda!",
      date: "há 2 dias",
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      name: "Marcos W.",
      initials: "MW",
      rating: 5,
      comment: "Vendedor muito atencioso, produto original e bem embalado.",
      date: "há 1 semana",
      colorClass: "bg-emerald-100 text-emerald-600",
    },
    {
      name: "Sara P.",
      initials: "SP",
      rating: 4,
      comment: "Ótima experiência de compra, recomendo a todos!",
      date: "há 2 semanas",
      colorClass: "bg-purple-100 text-purple-600",
    },
    {
      name: "Ricardo M.",
      initials: "RM",
      rating: 5,
      comment: "Entrega feita em Viana em menos de 2 horas. Excelente.",
      date: "há 3 semanas",
      colorClass: "bg-amber-100 text-amber-600",
    },
  ];

  const doubleReviews = [...reviews, ...reviews];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex < reviews.length) {
      setActiveReviewIndex(newIndex);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (min-width: 768px) {
          .animate-desktop-scroll {
            display: flex;
            width: max-content;
            animation: scroll 30s linear infinite;
          }
          .animate-desktop-scroll:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      <PageHeader title="Informações do Vendedor" backTo="/" />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-32 space-y-16">
        <section className="flex justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-md">
                  {seller.profilePicture ? (
                    <img
                      className="w-full h-full object-cover"
                      src={BASE_UPLOAD_URL + seller.profilePicture}
                      alt={seller.fullName}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-slate-300">
                        person
                      </span>
                    </div>
                  )}
                </div>
                {seller.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] font-bold">
                      check
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  {seller.fullName}
                </h2>
                
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-6">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">
                    location_on
                  </span>
                  {seller.address}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">
                    calendar_today
                  </span>
                  Desde {seller.memberSince}
                </span>
              </div>

              <div className="grid grid-cols-3 w-full gap-4 pt-5 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Vendas
                  </span>
                  <span className="font-black text-lg">
                    {seller.stats.sales}
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-800 px-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Avaliação
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-lg">
                      {seller.stats.rating}
                    </span>
                    <span className="material-symbols-outlined text-amber-400 fill-1 text-sm">
                      star
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Resposta
                  </span>
                  <div className="flex items-center gap-1 text-blue-500">
                    <span className="material-symbols-outlined text-sm">
                      bolt
                    </span>
                    <span className="font-black text-lg text-slate-900 dark:text-white">
                      {seller.stats.responseTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Produtos Disponíveis
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        <section className="space-y-8 overflow-hidden">
          <div className="flex items-center px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Avaliações dos Clientes
            </h3>
          </div>

          <div className="relative group">
            <div className="hidden md:flex animate-desktop-scroll gap-6">
              {doubleReviews.map((review, idx) => (
                <div key={`desktop-${idx}`} className="w-[300px] flex-shrink-0">
                  <ReviewItem {...review} />
                </div>
              ))}
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex md:hidden flex-nowrap gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2"
            >
              {reviews.map((review, idx) => (
                <div
                  key={`mobile-${idx}`}
                  className="w-[calc(100vw-3rem)] flex-shrink-0 snap-center"
                >
                  <ReviewItem {...review} />
                </div>
              ))}
            </div>

            <div className="hidden md:block absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-50 dark:from-background-dark to-transparent z-10" />
            <div className="hidden md:block absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-50 dark:from-background-dark to-transparent z-10" />
          </div>

          <div className="flex md:hidden justify-center gap-2 mt-4">
            {reviews.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeReviewIndex === idx
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SellerProfileScreen;
