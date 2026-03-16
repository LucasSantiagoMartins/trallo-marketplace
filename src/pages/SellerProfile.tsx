import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import PageHeader from "../components/PageHeader";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SearchedProductDTO } from "@/types/product";
import {
  getProductConditionLabel,
  getProductConditionColor,
  getProductStatusLabel,
  getProductStatusColor,
} from "@/utils/mappers/product.mapper";
import { formatPrice } from "@/utils/currency";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/enums/user";
import ProductCard from "@/components/ProductCard";

// --- Interfaces ---

interface ReviewItemProps {
  name: string;
  initials: string;
  rating: number;
  comment: string;
  date: string;
  colorClass: string;
}

interface ProductCardProps {
  product: SearchedProductDTO;
  onAddToCart?: (id: string) => void;
}

 
// --- Componente Principal ---

const SellerProfileScreen: React.FC = () => {
  const seller = {
    fullName: "Lucas Santiago",
    profilePicture: null,
    address: "Viana, Luanda",
    isVerified: true,
    memberSince: "2024",
    stats: {
      sales: "1,482",
      rating: "4.9",
      responseTime: "< 15 min",
    },
  };

  // Mapeado para simular o SearchedProductDTO
  const listings: SearchedProductDTO[] = [
    {
      id: "1",
      name: "Apple Watch Series 9",
      price: 299000,
      coverImage:
        "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=500&auto=format&fit=crop",
      condition: "NEW",
      status: "AVAILABLE",
      description: "Apple Watch em estado impecável.",
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
      description: "Cancelamento de ruído top de linha.",
      category: "Audio",
    } as any,
    {
      id: "3",
      name: "Logitech MX Master 3S",
      price: 45000,
      coverImage:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500&auto=format&fit=crop",
      condition: "NEW",
      status: "AVAILABLE",
      description: "O melhor mouse para produtividade.",
      category: "Acessórios",
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
  ];

  return (
    <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <PageHeader title="Informações do Vendedor" backTo="/" />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-32 space-y-8">
        {/* Card de Perfil Centralizado e Compacto */}
        <section className="flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 shadow-inner">
                  {seller.profilePicture ? (
                    <img
                      className="w-full h-full object-cover"
                      src={BASE_UPLOAD_URL + seller.profilePicture}
                      alt={seller.fullName}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300">
                        person
                      </span>
                    </div>
                  )}
                </div>
                {seller.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-lg border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] fill-1">
                      verified
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold tracking-tight">
                  {seller.fullName}
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[8px] font-black rounded-lg uppercase tracking-wider">
                  Premium
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium mb-5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    location_on
                  </span>
                  {seller.address}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    calendar_today
                  </span>
                  Desde {seller.memberSince}
                </span>
              </div>

              <div className="grid grid-cols-3 w-full gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col items-center border-r border-slate-50 dark:border-slate-800">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Vendas
                  </span>
                  <span className="font-black text-base">
                    {seller.stats.sales}
                  </span>
                </div>
                <div className="flex flex-col items-center border-r border-slate-50 dark:border-slate-800">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Avaliação
                  </span>
                  <div className="flex items-center gap-0.5">
                    <span className="font-black text-base">
                      {seller.stats.rating}
                    </span>
                    <span className="material-symbols-outlined text-amber-400 fill-1 text-xs">
                      star
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Resposta
                  </span>
                  <div className="flex items-center gap-0.5 text-blue-500">
                    <span className="font-black text-base text-slate-900 dark:text-white">
                      {seller.stats.responseTime}
                    </span>
                    <span className="material-symbols-outlined text-xs">
                      bolt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Produtos
              </h3>
              <span className="text-[10px] font-black bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md">
                {listings.length} ITENS
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {listings.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Avaliações
              </h3>
              <button className="text-primary text-[10px] font-black uppercase">
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <ReviewItem key={idx} {...review} />
              ))}
            </div>
          </aside>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  initials,
  rating,
  comment,
  date,
  colorClass,
}) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${colorClass}`}
        >
          {initials}
        </div>
        <div>
          <p className="text-[11px] font-bold leading-none">{name}</p>
          <p className="text-[9px] text-slate-400 mt-1 uppercase font-medium">
            {date}
          </p>
        </div>
      </div>
      <div className="flex text-amber-400">
        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">
          {rating}.0
        </span>
        <span className="material-symbols-outlined text-[14px] fill-1 ml-0.5">
          star
        </span>
      </div>
    </div>
    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal italic">
      "{comment}"
    </p>
  </div>
);

export default SellerProfileScreen;
