import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import PageHeader from "../components/PageHeader";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SearchedProductDTO } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ReviewItem from "@/components/reviewItem";
import { getSellerProfile, reviewUser } from "@/services/user.service";
import { sellerProducts } from "@/services/product.service";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import MobileLayout from "@/layouts/MobileLayout";
import EmptyState from "@/components/EmptyState";

const SellerProfileScreen: React.FC = () => {
  const { sellerSlug } = useParams<{ sellerSlug: string }>();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [listings, setListings] = useState<SearchedProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!sellerSlug) return;
      setLoading(true);
      try {
        const [profileRes, productsRes] = await Promise.all([
          getSellerProfile(sellerSlug),
          sellerProducts(sellerSlug),
        ]);

        if (profileRes.data) setProfileData(profileRes.data);
        if (productsRes.data) setListings(productsRes.data);
      } catch (err) {
        // toast.error(err.message ?? "Erro ao buscar dados do vendedor");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sellerSlug]);

  const handleQuickReview = async () => {
    if (!profileData?.user?.id) return;

    setIsSubmittingReview(true);
    try {
      await reviewUser({
        orderId: "fake-order-id-123",
        rating: 5,
        comment: "Excelente vendedor! (Avaliação de teste)",
      });
      toast.success("Avaliação enviada com sucesso!");
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao enviar avaliação");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (
      profileData?.recentReviews &&
      newIndex < profileData.recentReviews.length
    ) {
      setActiveReviewIndex(newIndex);
    }
  };

  if (loading) return <Loader />;

  if (!profileData || !profileData.user) {
    return (
      <MobileLayout>
        <EmptyState
          icon="storefront"
          title="Vendedor não encontrado"
          description="O perfil que você está tentando acessar não existe ou foi removido da plataforma."
          buttonText="Voltar ao Início"
          onAction={() => navigate("/")}
        />
      </MobileLayout>
    );
  }

  const { user, stats, recentReviews = [] } = profileData;
  const doubleReviews = [...recentReviews, ...recentReviews];

  const getColorClass = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-emerald-100 text-emerald-600",
      "bg-purple-100 text-purple-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
    ];
    return colors[(name || "").length % colors.length];
  };

  return (
    <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (min-width: 768px) { .animate-desktop-scroll { display: flex; width: max-content; animation: scroll 30s linear infinite; } .animate-desktop-scroll:hover { animation-play-state: paused; } }
      `}</style>

      <PageHeader title="Informações do Vendedor" backTo="/" />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-32 space-y-16">
        <section className="flex justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="size-32 rounded-full border-[3px] border-accent p-1 flex items-center justify-center overflow-hidden">
                    {user.profilePicture ? (
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${BASE_UPLOAD_URL + user.profilePicture})`,
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400 text-6xl">
                          account_circle
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[18px]">
                      verified
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h2 className="clash-font text-2xl lg:text-3xl font-extrabold">
                    {user?.fullName || "Usuário"}
                  </h2>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-4">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      location_on
                    </span>
                    {user.location}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">
                      calendar_today
                    </span>
                    Desde {user.memberSince}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 w-full gap-4 pt-5 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Vendas
                  </span>
                  <span className="font-black text-lg">
                    {stats?.totalSales ?? 0}
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-800 px-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                    Avaliação
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-lg">
                      {stats?.averageRating ?? "0.0"}
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
                      {stats?.responseTime ?? "--"} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">
            Produtos Disponíveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
            {listings.length === 0 && (
              <p className="text-slate-500 text-sm">Nenhum produto listado.</p>
            )}
          </div>
        </section>

        {recentReviews.length > 0 && (
          <section className="space-y-8 overflow-hidden">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">
              Avaliações dos Clientes
            </h3>
            <div className="relative group">
              <div className="hidden md:flex animate-desktop-scroll gap-6">
                {doubleReviews.map((review, idx) => (
                  <div
                    key={`desktop-${idx}`}
                    className="w-[300px] flex-shrink-0"
                  >
                    <ReviewItem
                      name={review.buyerName}
                      comment={review.comment}
                      rating={review.rating}
                      date={new Date(review.createdAt).toLocaleDateString()}
                      initials={review.buyerName.substring(0, 2).toUpperCase()}
                      colorClass={getColorClass(review.buyerName)}
                    />
                  </div>
                ))}
              </div>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex md:hidden flex-nowrap gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2"
              >
                {recentReviews.map((review: any, idx: number) => (
                  <div
                    key={`mobile-${idx}`}
                    className="w-[calc(100vw-3rem)] flex-shrink-0 snap-center"
                  >
                    <ReviewItem
                      name={review.buyerName}
                      comment={review.comment}
                      rating={review.rating}
                      date={new Date(review.createdAt).toLocaleDateString()}
                      initials={review.buyerName.substring(0, 2).toUpperCase()}
                      colorClass={getColorClass(review.buyerName)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {recentReviews.map((_: any, idx: number) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeReviewIndex === idx ? "w-6 bg-primary" : "w-1.5 bg-slate-300 dark:bg-slate-700"}`}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default SellerProfileScreen;
