import React, { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import VideoChecklistModal from "@/components/VideoChecklistModal";

const ProductValidationSubmission: React.FC = () => {
  const [currentStep] = useState(2);
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showVideoChecklist, setShowVideoChecklist] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const maxChars = 300;

  const productData = {
    name: "Samsung Galaxy S21 Ultra",
    price: "450.000",
    currency: "Kz",
    category: "Tech",
    condition: "Semi-novo",
  };

  const colors = {
    primary: "hsl(262 91% 61%)",
    success: "#22c55e",
    background: "#f6f5f8",
    darkBackground: "#141022",
  };

  const mockedImages = [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800",
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800",
    "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800",
    "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=800",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Produto submetido com sucesso!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-slate-900 dark:text-white transition-colors duration-300">
      <PageHeader title="Enviar para Análise" backTo={-1} />

      <VideoChecklistModal
        isOpen={showVideoChecklist}
        onClose={() => setShowVideoChecklist(false)}
        category={productData.category}
        onVideoSelected={(file) => {
          setSelectedVideo(file);
          setShowVideoChecklist(false);
        }}
      />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-white text-3xl">
              close
            </span>
          </button>
          <img
            src={selectedImage}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            alt="Preview"
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-10 max-w-[400px] mx-auto">
          {[1, 2].map((step) => (
            <div key={step} className="flex-1 flex flex-col gap-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 overflow-hidden ${
                  step <= currentStep ? "" : "bg-slate-200 dark:bg-slate-800"
                }`}
                style={{
                  backgroundColor:
                    step <= currentStep ? colors.primary : undefined,
                }}
              >
                {step === currentStep && (
                  <div
                    className="h-full bg-white/30 animate-in slide-in-from-left duration-1000"
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-bold uppercase text-center"
                style={{
                  color: step === currentStep ? colors.primary : "gray",
                }}
              >
                {step === 1 ? "Cadastro" : "Validação Final"}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl shadow-sm flex items-center gap-5 border border-white/5 backdrop-blur-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-white/10">
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
                  className="text-[10px] font-bold text-primary uppercase"
                  style={{ color: colors.primary }}
                >
                  {productData.category} • {productData.condition}
                </span>
                <h2 className="text-xl font-bold leading-tight mt-1">
                  {productData.name}
                </h2>
                <p className="text-2xl font-black mt-1">
                  {productData.price}{" "}
                  <span className="text-sm font-medium">
                    {productData.currency}
                  </span>
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Fotos Submetidas
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
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          src={src}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="material-symbols-outlined text-white">
                            visibility
                          </span>
                        </div>
                      </>
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
                  Estas provas garantem a sua aprovação na plataforma e aumentam
                  as suas chances de venda. Com elas, os compradores podem
                  atestar a qualidade do produto, gerando a segurança necessária
                  para concluir a compra.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Vídeo de Demonstração
              </h3>
              <div
                onClick={() => setShowVideoChecklist(true)}
                className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all bg-white dark:bg-white/5 p-8 text-center ${
                  selectedVideo
                    ? "border-green-500 bg-green-50/30 dark:bg-green-500/5"
                    : "border-slate-300 dark:border-white/10 hover:border-primary"
                }`}
              >
                <div
                  className={`size-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 ${
                    selectedVideo
                      ? "bg-green-100 dark:bg-green-500/20"
                      : "bg-primary/10"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{
                      color: selectedVideo ? colors.success : colors.primary,
                    }}
                  >
                    {selectedVideo ? "check_circle" : "videocam"}
                  </span>
                </div>
                <h4 className="font-bold">
                  {selectedVideo
                    ? "Vídeo Selecionado"
                    : "Adicionar Prova em Vídeo"}
                </h4>
                <p
                  className={`text-xs mt-2 font-medium ${selectedVideo ? "text-green-600 dark:text-green-400" : "text-slate-400"}`}
                >
                  {selectedVideo
                    ? selectedVideo.name
                    : "Opcional - Máximo 30 segundos"}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Notas Adicionais
              </h3>
              <div className="relative">
                <textarea
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 min-h-[160px] text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none shadow-sm"
                  placeholder="Ex: Possui um pequeno detalhe na borda..."
                  maxLength={maxChars}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={
                    { "--tw-ring-color": colors.primary } as React.CSSProperties
                  }
                ></textarea>
                <div className="absolute bottom-4 right-4 text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                  {notes.length} / {maxChars}
                </div>
              </div>
            </section>

            <TralloButton
              variant="primary"
              fullWidth
              icon="published_with_changes"
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              Submeter
            </TralloButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductValidationSubmission;
