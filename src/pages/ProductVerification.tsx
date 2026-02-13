import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import ValidationModal from "@/components/ValidationModal";
import ProductReviewCard from "@/components/ProductReviewCard";
import TralloInput from "@/components/TralloInput";
import {
  PendingVerificationDTO,
  ProductVerificationType,
} from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { verifyProduct } from "@/services/product.service";
import { useAppToast } from "@/hooks/useAppToast";

const ProductVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const product = location.state?.product as PendingVerificationDTO;

  const [loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [productDescription, setProductDescription] = useState(
    product?.description || "",
  );
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  const colors = { primary: "hsl(262 91% 61%)" };

  if (!product) {
    return <div className="p-20 text-center">Produto não encontrado.</div>;
  }

  const getFullUrl = (path: string) =>
    path ? `${BASE_UPLOAD_URL}${path}` : "";
  const allImages = [
    getFullUrl(product.coverImage),
    ...product.images.map((img) => getFullUrl(img)),
  ].filter(Boolean);

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [product.id]);

  const handleOpenSelection = (approved: boolean) => {
    setIsApproved(approved);
    setShowTypeSelection(true);
  };

  const handleVerify = async (type: ProductVerificationType) => {
    if (isApproved === null) return;

    setLoading(true);
    try {
      const res = await verifyProduct(product.id, {
        isApproved,
        verificationType: type,
        description: productDescription,
      });

      if (res.success) {
        showToast(
          "success",
          res.message ||
            `Produto ${isApproved ? "aprovado" : "rejeitado"} com sucesso.`,
        );
        navigate("/area-operacional/verificacoes-pendentes");
      }
    } catch (err: any) {
      showToast("error", err.message || "Erro ao processar verificação.");
    } finally {
      setLoading(false);
      setShowTypeSelection(false);
    }
  };

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
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-slate-900 dark:text-white">
      <PageHeader title="Validação de Produto" backTo={-1} />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <span className="material-symbols-outlined">close</span>
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
        onSelectType={handleVerify}
        loading={loading}
        translateY={translateY}
        touchStart={touchStart}
        handlers={{
          onStart: handleTouchStart,
          onMove: handleTouchMove,
          onEnd: handleTouchEnd,
        }}
      />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <ProductReviewCard
              productData={{
                name: product.name,
                price: product.price.toLocaleString(),
                currency: "Kz",
                condition: product.condition,
                description: productDescription,
                videoUrl: getFullUrl(product.videoUrl || ""),
              }}
              imagesLoaded={imagesLoaded}
              thumbnail={getFullUrl(product.coverImage)}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              primaryColor={colors.primary}
            />

            <section className="p-6 bg-white dark:bg-gray-800/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-500 ml-2">
                Fotos do Produto
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {allImages.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(src)}
                    className="relative aspect-square rounded-2xl overflow-hidden border bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover transition group-hover:scale-110"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </section>

            <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h4 className="font-black text-lg mb-2 tracking-tight">
                Notas do Vendedor
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {product.notes ||
                  "O vendedor não enviou observações extras para esta revisão."}
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            {product.videoUrl && (
              <video
                src={getFullUrl(product.videoUrl)}
                controls
                className="w-full aspect-video rounded-3xl bg-black object-cover shadow-2xl"
              />
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-2">
                ATUALIZAR DESCRIÇÃO DO PRODUTO
              </label>
              <TralloInput
                placeholder="Edite a descrição do produto aqui..."
                value={productDescription}
                onChange={setProductDescription}
                multiline
                rows={8}
                className="!rounded-3xl"
              />
            </div>

            <div className="flex gap-3">
              <TralloButton
                variant="primary"
                className="flex-1"
                icon="check_circle"
                isLoading={loading && isApproved === true}
                onClick={() => handleOpenSelection(true)}
              >
                Aprovar
              </TralloButton>
              <button
                disabled={loading}
                onClick={() => handleOpenSelection(false)}
                className="flex-1 py-4 text-sm font-bold text-red-500 bg-red-500/5 rounded-full border border-red-500/20 disabled:opacity-50"
              >
                {loading && isApproved === false
                  ? "Processando..."
                  : "Rejeitar"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductVerification;
