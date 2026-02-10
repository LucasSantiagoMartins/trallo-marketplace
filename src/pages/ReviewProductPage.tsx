import React, { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";

const ProductReview: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showTypeSelection, setShowTypeSelection] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  const maxChars = 300;

  const productData = {
    name: "Samsung Galaxy S21 Ultra",
    price: "450.000",
    currency: "Kz",
    category: "Tech",
    condition: "Semi-novo",
    description:
      "O aparelho está em perfeito estado, sem riscos na tela. Acompanha carregador original.",
    specs: {
      storage: "256GB",
      ram: "12GB",
      color: "Phantom Black",
      battery: "92%",
      imei: "354678*********",
    },
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  };

  const colors = {
    primary: "hsl(262 91% 61%)",
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;
    if (diff > 0) setTranslateY(diff);
  };

  const handleTouchEnd = () => {
    if (translateY > 100) {
      setShowTypeSelection(false);
    }
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

      {showTypeSelection && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTypeSelection(false)}
          />

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform:
                translateY > 0 ? `translateY(${translateY}px)` : undefined,
              transition:
                touchStart === null ? "transform 0.3s ease-out" : "none",
            }}
            className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-500"
          >
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6 sm:hidden" />

            <button
              onClick={() => setShowTypeSelection(false)}
              className="absolute top-4 right-4 size-14 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <h3 className="text-xl font-black mb-2 tracking-tight">
              Tipo de Validação
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Como deseja finalizar este processo de análise para o vendedor?
            </p>

            <div className="grid gap-4">
              <button className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary transition-all group text-left">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <div>
                  <p className="font-bold">Online</p>
                  <p className="text-xs text-slate-500">
                    Aprovação digital imediata
                  </p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary transition-all group text-left">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">
                    person_pin_circle
                  </span>
                </div>
                <div>
                  <p className="font-bold">Presencial</p>
                  <p className="text-xs text-slate-500">
                    Agendar verificação física
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8 animate-in fade-in duration-700">
            <section className="bg-white dark:bg-slate-900/50 rounded-3xl shadow-sm border border-white/5 overflow-hidden transition-all duration-300">
              <div className="p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                  {!imagesLoaded ? (
                    <div className="w-full h-full animate-pulse bg-slate-300 dark:bg-slate-700" />
                  ) : (
                    <img
                      alt="Produto"
                      className="w-full h-full object-cover"
                      src={mockedImages[0]}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className="text-[10px] font-bold uppercase"
                    style={{ color: colors.primary }}
                  >
                    {productData.category} • {productData.condition}
                  </span>
                  <h2 className="text-lg font-bold leading-tight">
                    {productData.name}
                  </h2>
                  <p className="text-xl font-black">
                    {productData.price} {productData.currency}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Object.entries(productData.specs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          {key}
                        </p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    "{productData.description}"
                  </p>
                </div>
              )}
            </section>

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
                      <img
                        alt={`P ${index}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        src={src}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                </div>
                <h4 className="font-black text-lg mb-2 tracking-tight">
                  Validação e Credibilidade
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Estas provas garantem a aprovação na plataforma e aumentam as
                  chances de venda.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Vídeo de Validação
              </h3>
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
                <textarea
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 min-h-[120px] text-sm focus:ring-2 outline-none transition-all resize-none shadow-sm"
                  placeholder="Adicione observações..."
                  maxLength={maxChars}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  style={
                    { "--tw-ring-color": colors.primary } as React.CSSProperties
                  }
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                  {reviewNotes.length} / {maxChars}
                </div>
              </div>
            </section>

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
                className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-2xl transition-colors border border-red-500/20"
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
