import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import VideoChecklistModal from "@/components/VideoChecklistModal";
import { ProductDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";
import { submitProductForValidation } from "@/services/product.service";
import { useAppToast } from "@/hooks/useAppToast";

const ProductValidationSubmission: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useAppToast();

  const product = location.state?.product as ProductDTO;

  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoChecklist, setShowVideoChecklist] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      navigate("/meus-produtos");
    } else {
      const timer = setTimeout(() => setImagesLoaded(true), 800);
      return () => clearTimeout(timer);
    }
  }, [product, navigate]);

  if (!product) return null;

  const maxChars = 300;
  const colors = {
    primary: "hsl(262 91% 61%)",
    success: "#22c55e",
  };

  const handleSubmit = async () => {
    if (!selectedVideo) {
      showToast(
        "error",
        "Por favor, adicione um vídeo de prova para continuar.",
      );
      return;
    }

    if (notes.length < 10) {
      showToast(
        "error",
        "Adicione uma nota um pouco mais detalhada (mínimo 10 caracteres).",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitProductForValidation(
        product.id,
        notes,
        selectedVideo,
      );

      if (res.success) {
        showToast(
          "success",
          res.message ?? "Produto enviado para análise com sucesso!",
        );
        navigate("/meus-produtos");
      } else {
        showToast(
          "error",
          res.message ?? "Não foi possível processar o envio.",
        );
      }
    } catch (err: any) {
      showToast("error", err.message ?? "Erro ao conectar ao servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-slate-900 dark:text-white transition-colors duration-300">
      <PageHeader title="Enviar para Análise" backTo={-1} />

      <VideoChecklistModal
        isOpen={showVideoChecklist}
        onClose={() => setShowVideoChecklist(false)}
        category={"Tech"}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl shadow-sm flex items-center gap-5 border border-white/5 backdrop-blur-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-white/10">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover"
                  src={BASE_UPLOAD_URL + product.coverImage}
                />
              </div>
              <div className="flex-1">
                <span
                  className="text-[10px] font-bold text-primary uppercase"
                  style={{ color: colors.primary }}
                >
                  {product.condition}
                </span>
                <h2 className="text-xl font-bold leading-tight mt-1">
                  {product.name}
                </h2>
                <p className="text-2xl font-black mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
            </section>

            {product.images && product.images.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Fotos Submetidas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.images.map((img, index) => {
                    const fullUrl = BASE_UPLOAD_URL + img;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(fullUrl)}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                      >
                        {!imagesLoaded ? (
                          <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-700" />
                        ) : (
                          <>
                            <img
                              alt={`P ${index}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              src={fullUrl}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="material-symbols-outlined text-white">
                                visibility
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h4 className="font-black text-lg mb-2 tracking-tight">
                Validação e Credibilidade
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Estas provas garantem a sua aprovação na plataforma e aumentam
                as suas chances de venda. Com elas, os compradores podem atestar
                a qualidade do produto.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Vídeo de Demonstração
              </h3>
              <div
                onClick={() => setShowVideoChecklist(true)}
                className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all p-8 text-center ${
                  selectedVideo
                    ? "border-green-500 bg-green-50/30"
                    : "border-slate-300 hover:border-primary"
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
                <h4 className="font-bold mt-2">
                  {selectedVideo
                    ? "Vídeo Selecionado"
                    : "Adicionar Prova em Vídeo"}
                </h4>
                {selectedVideo && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    {selectedVideo.name}
                  </p>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Notas Adicionais
              </h3>
              <div className="relative">
                <textarea
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-5 min-h-[160px] outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Detalhes sobre o estado do produto, funcionamento, etc..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={maxChars}
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
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
              Submeter Agora
            </TralloButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductValidationSubmission;
