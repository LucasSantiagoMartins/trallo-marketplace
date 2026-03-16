import React, { useState, useRef } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

const RateSeller: React.FC = () => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
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
                <div className="relative h-24 w-24 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop"
                    alt="Nivaldo Manuel"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-[#6d3ff8] text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800">
                  <CheckCircle2 size={16} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="clash-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  Nivaldo Manuel
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
                  placeholder="O Nivaldo foi muito atencioso e o produto chegou em perfeitas condições..."
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
