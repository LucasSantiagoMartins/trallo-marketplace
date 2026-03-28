import React, { useRef } from "react";
import TralloButton from "@/components/TralloButton";
import { getVideoRequirements } from "@/enums/video-requirements.enum";
import { ProductCategory } from "@/enums/product-category.enum";

interface VideoChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ProductCategory; // Usando o Enum aqui
  categoryLabel: string;
  onVideoSelected: (file: File) => void;
}

const VideoChecklistModal: React.FC<VideoChecklistModalProps> = ({
  isOpen,
  onClose,
  category,
  categoryLabel,
  onVideoSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const requirements = getVideoRequirements(category);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelected(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] bg-white dark:bg-[#141022] sm:rounded-[3.5rem] flex flex-col overflow-y-auto shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-500">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 size-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center hover:scale-110 hover:bg-slate-200 dark:hover:bg-white/10 transition-all z-50"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
            close
          </span>
        </button>

        <div className="flex flex-col lg:flex-row min-h-full sm:min-h-0">
          <div className="lg:w-[40%] p-8 sm:p-12 bg-slate-50 dark:bg-white/[0.02] border-r border-slate-100 dark:border-white/[0.05] flex flex-col justify-center text-center lg:text-left shrink-0">
            <div className="size-20 bg-[#8B5CF6] rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-purple-500/30 mx-auto lg:mx-0">
              <span className="material-symbols-outlined text-4xl text-white">
                movie_edit
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] mb-6">
              Guia de <br className="hidden lg:block" />
              <span className="text-[#8B5CF6]">Vídeo Prova</span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
              Para garantir a segurança da venda, precisamos que o seu vídeo de
              <span className="font-bold text-slate-900 dark:text-white">
                {" "}
                {categoryLabel}{" "}
              </span>
              siga estas diretrizes.
            </p>
          </div>

          <div className="lg:w-[60%] p-8 sm:p-12 flex flex-col justify-between flex-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Itens Obrigatórios
                </h3>
              </div>

              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-3 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-300"
                  >
                    <div className="size-5 shrink-0 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 flex items-center justify-center text-[9px] font-black group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4 pb-10 sm:pb-0">
              <TralloButton
                variant="primary"
                fullWidth
                icon="cloud_upload"
                onClick={handleButtonClick}
              >
                Selecionar Vídeo Gravado
              </TralloButton>

              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    timer
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    Máx 30s
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    inventory_2
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    MP4 / MOV
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChecklistModal;
