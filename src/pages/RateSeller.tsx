import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { getSellerProfile, reviewUser } from "@/services/user.service";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const RateSeller: React.FC = () => {
  const { sellerSlug } = useParams<{ sellerSlug: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [sellerData, setSellerData] = useState<any>(null);

  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerSlug) return;
      try {
        const response = await getSellerProfile(sellerSlug);
        if (response.data) {
          setSellerData(response.data.user);
        }
      } catch (err: any) {
        toast.error("Não foi possível carregar os dados do vendedor.");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchSeller();
  }, [sellerSlug]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Por favor, escreva um comentário antes de publicar.");
      return;
    }

    setIsSubmitting(true);

    const fakeOrderId = "550e8400-e29b-41d4-a716-446655440000";

    try {
      const res = await reviewUser({
        orderId: fakeOrderId,
        rating,
        comment,
      });

      toast.success(res.message ?? "Avaliação publicada com sucesso!");
      setTimeout(() => navigate(-1), 1500);
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao publicar avaliação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!starsRef.current) return;
    const touch = e.touches[0];
    const rect = starsRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const width = rect.width;
    const newRating = Math.ceil((x / width) * 5);

    if (newRating >= 1 && newRating <= 5) {
      setRating(newRating);
    }
  };

  if (loadingProfile) return <Loader />;

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col">
      <div className="w-full pt-2 px-6 shrink-0 z-10">
        <PageHeader title="Avaliar Vendedor" showUser={true} />
      </div>

      <div className="flex-1 flex flex-col w-full sm:items-center sm:justify-center sm:p-4 overflow-y-auto">
        <main className="w-full h-auto pt-[50px] max-w-4xl bg-white dark:bg-[#1c182d] rounded-none sm:rounded-[2.5rem] p-6 sm:p-16 shadow-xl dark:shadow-none border-none sm:border sm:border-transparent sm:dark:border-white/5 mt-6 sm:mt-0 mb-auto sm:mb-0">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 text-center lg:text-left">
              <div className="relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6d3ff8] to-purple-400 rounded-full blur opacity-25"></div>
                <div className="relative h-24 w-24 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg bg-slate-100">
                  {sellerData?.profilePicture ? (
                    <img
                      src={BASE_UPLOAD_URL + sellerData.profilePicture}
                      alt={sellerData.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                      <span className="text-2xl font-bold text-slate-400">
                        {sellerData?.fullName?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-[#6d3ff8] text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800">
                  <CheckCircle2 size={16} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="clash-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  {sellerData?.fullName || "Vendedor"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-[240px]">
                  Como foi sua experiência com este vendedor? Sua avaliação
                  ajuda a comunidade.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-y-4 sm:gap-y-6">
              <div className="flex flex-col items-center lg:items-start gap-3">
                <div
                  ref={starsRef}
                  onTouchMove={handleTouchMove}
                  className="flex justify-center gap-2 sm:gap-4 touch-none"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-125 focus:outline-none"
                    >
                      <Star
                        size={40}
                        className={`${
                          star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <TralloInput
                  label="Comentário"
                  placeholder="Conte sua experiência..."
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(val) => setComment(val)}
                />
              </div>

              <div className="pb-8 sm:pb-0">
                <TralloButton
                  fullWidth
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Publicar Avaliação
                </TralloButton>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RateSeller;
