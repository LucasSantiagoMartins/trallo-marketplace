import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import ValidationModal from "@/components/ValidationModal";
import ProductReviewCard from "@/components/ProductReviewCard";
import TralloInput from "@/components/TralloInput";
import { PendingVerificationDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

const ProductVerification: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as PendingVerificationDTO;

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  const maxChars = 300;
  const colors = { primary: "hsl(262 91% 61%)" };

  if (!product) {
    return <div className="p-20 text-center">Produto não encontrado.</div>;
  }

  const getFullUrl = (path: string) => (path ? `${BASE_UPLOAD_URL}${path}` : "");
  
  const allImages = [
    getFullUrl(product.coverImage),
    ...product.images.map((img) => getFullUrl(img)),
  ].filter(Boolean);

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [product.id]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientY);
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
      <PageHeader title="Revisão do Produto" backTo={-1} />

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} className="max-w-full max-h-[90vh] object-contain rounded-2xl" alt="Preview" />
        </div>
      )}

      <ValidationModal 
        isOpen={showTypeSelection} 
        onClose={() => setShowTypeSelection(false)} 
        translateY={translateY} 
        touchStart={touchStart} 
        handlers={{ onStart: handleTouchStart, onMove: handleTouchMove, onEnd: handleTouchEnd }} 
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
                description: product.description,
                videoUrl: getFullUrl(product.videoUrl || ""),
              }}
              imagesLoaded={imagesLoaded}
              thumbnail={getFullUrl(product.coverImage)}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              primaryColor={colors.primary}
            />

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-500">Fotos do Produto</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {allImages.map((src, index) => (
                  <div key={index} onClick={() => setSelectedImage(src)} className="relative aspect-square rounded-2xl overflow-hidden border bg-slate-100 dark:bg-slate-800 cursor-pointer group">
                    <img src={src} className="w-full h-full object-cover transition group-hover:scale-110" alt="" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            {product.videoUrl && (
              <video src={getFullUrl(product.videoUrl)} controls className="w-full aspect-video rounded-3xl bg-black object-cover shadow-2xl" />
            )}

            <TralloInput
              placeholder="Notas da revisão..."
              value={reviewNotes}
              onChange={setReviewNotes}
              multiline rows={5}
              className="!rounded-3xl"
            />

            <div className="flex gap-3">
              <TralloButton variant="primary" className="flex-1" icon="check_circle" onClick={() => setShowTypeSelection(true)}>Aprovar</TralloButton>
              <button onClick={() => setShowTypeSelection(true)} className="flex-1 py-4 text-sm font-bold text-red-500 bg-red-500/5 rounded-full border border-red-500/20">Rejeitar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductVerification;