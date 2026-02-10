import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import { motion } from "framer-motion";

const ReviewProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock de dados que viriam do ID
  const productData = {
    name: "iPhone 15 Pro Max",
    spec: "Titânio Natural • 256GB",
    price: "1.200.000",
    seller: "Mauro Silva",
    rating: "4.9",
    description: "Produto selado na caixa, nunca usado. Inclui factura de compra e garantia de 1 ano. Entrega imediata em Luanda. Verificado em condições perfeitas para venda premium no TRALLO.",
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800",
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=800",
      "https://images.unsplash.com/photo-1695048132833-5cf398031590?q=80&w=800",
    ],
    videoThumb: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800"
  };

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (type: 'approve' | 'reject') => {
    if (type === 'approve') setIsApproving(true);
    else setIsRejecting(true);

    setTimeout(() => {
      navigate('/validacao'); // Volta para a fila
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white transition-colors duration-300">
      <PageHeader title="Analisar Produto" backTo="/validacao" />

      {/* Lightbox de Imagem */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" alt="Preview" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LADO ESQUERDO: VISUAIS */}
          <div className="space-y-8">
            <section>
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-soft border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900">
                {!imagesLoaded ? (
                  <div className="w-full h-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                ) : (
                  <img src={productData.images[0]} className="w-full h-full object-cover" alt="Main" />
                )}
                <div className="absolute top-6 left-6 bg-[#6C3EF8] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Moderador
                </div>
              </div>

              <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar py-2">
                {productData.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className="min-w-[80px] h-20 rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#6C3EF8] transition-all bg-white shadow-sm"
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </div>
            </section>

            {/* VIDEO DE INSPEÇÃO SUBMETIDO */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-header text-sm font-bold uppercase tracking-widest text-slate-400">Vídeo de Inspeção</h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg font-black">SUBMETIDO • 30s</span>
              </div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black group cursor-pointer shadow-xl">
                <img src={productData.videoThumb} className="w-full h-full object-cover opacity-60" alt="Video Placeholder" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl fill-1">play_arrow</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* LADO DIREITO: INFO E AÇÃO */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-soft">
              <h2 className="font-header text-3xl font-bold leading-none">{productData.name}</h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-slate-500 font-medium">{productData.spec}</p>
                <p className="text-[#6C3EF8] font-bold text-3xl">{productData.price} <span className="text-sm font-medium">Kz</span></p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#6C3EF8] mb-3">Notas do Vendedor</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {productData.description}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                <div className="size-12 rounded-full overflow-hidden bg-slate-200">
                  <img src="https://i.pravatar.cc/150?u=mauro" className="w-full h-full object-cover" alt="Seller" />
                </div>
                <div>
                  <p className="text-sm font-bold">{productData.seller}</p>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500">
                    <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                    <span className="font-bold">{productData.rating} • Vendedor Verificado</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CARD INFORMATIVO ESTILO WALLET */}
            <div className="p-8 bg-gradient-to-br from-[#6C3EF8] to-[#4F2FD7] rounded-[2.5rem] text-white shadow-lg shadow-primary/20">
              <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined font-bold">policy</span>
              </div>
              <h4 className="font-black text-xl mb-2">Protocolo de Revisão</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Certifique-se que o vídeo demonstra o funcionamento real e que as fotos coincidem com a descrição. Em caso de dúvida, rejeite com uma nota específica.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER FIXO DE AÇÃO */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <TralloButton
            variant="primary"
            fullWidth
            icon="verified"
            isLoading={isApproving}
            onClick={() => handleAction('approve')}
            className="h-16 !rounded-2xl !bg-[#6C3EF8]"
          >
            APROVAR PRODUTO
          </TralloButton>

          <button
            onClick={() => handleAction('reject')}
            disabled={isRejecting}
            className="h-16 w-full rounded-2xl border-2 border-[#FF4D6D] text-[#FF4D6D] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-[#FF4D6D]/5 transition-all active:scale-95"
          >
            {isRejecting ? "Processando..." : (
              <>
                <span className="material-symbols-outlined">block</span>
                REJEITAR PRODUTO
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const AnimatePresence = ({ children }: any) => <>{children}</>;

export default ReviewProductPage;