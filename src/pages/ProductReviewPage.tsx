import React, { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import ValidationModal from "@/components/ValidationModal";
import ProductReviewCard from "@/components/ProductReviewCard";
import TralloInput from "@/components/TralloInput";

const ProductReview: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showTypeSelection, setShowTypeSelection] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  const maxChars = 300;
  const colors = { primary: "hsl(262 91% 61%)" };

  const productData = {
    name: "Samsung Galaxy S21 Ultra",
    price: "450.000",
    currency: "Kz",
    category: "Tech",
    condition: "Semi-novo",
    description:
      "O aparelho está em perfeito estado, sem riscos na tela. Acompanha carregador original.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  };

  const mockedImages = [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800",
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800",
    "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800",
    "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=800",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientY);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.targetTouches[0].clientY - touchStart;
    if (diff > 0) setTranslateY(diff);
  };
  const handleTouchEnd = () => {
    if (translateY > 100) setShowTypeSelection(false);
    setTouchStart(null);
    setTranslateY(0);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-slate-900 dark:text-white transition-colors duration-300">
      <PageHeader title="Revisão do Produto" backTo={-1} />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 size-14 bg-white/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-4xl">
              close
            </span>
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            alt="Preview"
          />
        </div>
      )}

      <ValidationModal
        isOpen={showTypeSelection}
        onClose={() => setShowTypeSelection(false)}
        translateY={translateY}
        touchStart={touchStart}
        handlers={{
          onStart: handleTouchStart,
          onMove: handleTouchMove,
          onEnd: handleTouchEnd,
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8 animate-in fade-in duration-700">
            <ProductReviewCard
              productData={productData}
              imagesLoaded={imagesLoaded}
              thumbnail={mockedImages[0]}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              primaryColor={colors.primary}
            />

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Fotos do Produto
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockedImages.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(src)}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                  >
                    {!imagesLoaded ? (
                      <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-700" />
                    ) : (
                      <>
                        <img
                          alt={`P ${index}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={src}
                        />
                        {/* Overlay com ícone limpo */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <span className="material-symbols-outlined text-white text-2xl drop-shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            visibility
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Card Informativo */}
              <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                </div>
                <h4 className="font-black text-lg mb-2 tracking-tight">
                  Análise de Conformidade
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Verifique cuidadosamente as evidências acima. Sua validação
                  confirma a autenticidade do item e assegura a integridade do
                  catálogo para o comprador.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <section className="space-y-4">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5">
                <video
                  src={productData.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Notas da Revisão
              </h3>
              <div className="relative">
                <TralloInput
                  placeholder="Adicione observações..."
                  value={reviewNotes}
                  onChange={(val) => setReviewNotes(val)}
                  multiline={true}
                  rows={5}
                  className="!rounded-3xl"
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                  {reviewNotes.length} / {maxChars}
                </div>
              </div>
            </section>

            {/* Ações Equalizadas */}
            <div className="flex gap-3">
              <div className="flex-1">
                <TralloButton
                  variant="primary"
                  fullWidth
                  icon="check_circle"
                  isLoading={isProcessing}
                  onClick={() => setShowTypeSelection(true)}
                >
                  Aprovar
                </TralloButton>
              </div>
              <button
                onClick={() => setShowTypeSelection(true)}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-full transition-colors border border-red-500/20"
              >
                <span className="material-symbols-outlined text-lg">
                  cancel
                </span>
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductReview;
