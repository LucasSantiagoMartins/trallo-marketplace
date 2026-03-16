import React, { useState, useEffect, useRef } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const shareOptions = [
  {
    name: "WhatsApp",
    color: "bg-[#25D366]",
    icon: (
      <svg className="size-6 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    link: (u: string, t: string) =>
      `https://wa.me/?text=${encodeURIComponent(t + " " + u)}`,
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2]",
    icon: (
      <svg className="size-7 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    link: (u: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    name: "Instagram",
    color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    icon: (
      <svg className="size-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    link: () => `https://instagram.com`,
  },
  {
    name: "Copiar Link",
    color: "bg-gray-500",
    icon: (
      <svg className="size-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    link: null,
  },
];

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const touchStartY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsCopied(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleShareClick = async (option: (typeof shareOptions)[0]) => {
    const url = window.location.href;

    if (option.name === "Copiar Link") {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      
      // Espera 800ms para o utilizador ver o check antes de fechar
      setTimeout(() => {
        handleClose();
      }, 800);
      return;
    }

    if (option.link) {
      // @ts-ignore
      window.open(option.link(url, productName), "_blank");
      handleClose();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const diff = touchY - touchStartY.current;
    if (diff > 0 && modalRef.current) {
      currentY.current = diff;
      modalRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const onTouchEnd = () => {
    if (currentY.current > 100) {
      handleClose();
    } else if (modalRef.current) {
      modalRef.current.style.transform = "translateY(0)";
    }
    currentY.current = 0;
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`relative w-full sm:max-w-md bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-300 ease-out
          rounded-t-[32px] p-6 pb-10 
          sm:rounded-[24px] sm:pb-6
          ${isClosing ? "translate-y-full sm:scale-95 sm:opacity-0" : "translate-y-0 sm:scale-100 sm:opacity-100"}
          ${!isClosing ? "animate-in slide-in-from-bottom sm:zoom-in-95" : ""}
        `}
      >
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full mx-auto mb-6 sm:hidden cursor-grab active:cursor-grabbing" />

        <div className="flex justify-between items-start mb-2 px-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Partilhar Produto</h3>
          <button
            onClick={handleClose}
            className="hidden sm:block text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-zinc-500 text-sm mb-6 px-2 line-clamp-1">
          {productName}
        </p>

        <div className="grid grid-cols-4 gap-4 px-2">
          {shareOptions.map((option) => {
            const isCopyBtn = option.name === "Copiar Link";
            
            return (
              <button
                key={option.name}
                onClick={() => handleShareClick(option)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`size-14 rounded-full flex items-center justify-center shadow-lg text-white transition-all duration-300
                    ${isCopyBtn && isCopied ? "bg-green-500 scale-110" : option.color}
                    group-active:scale-90`}
                >
                  {isCopyBtn && isCopied ? (
                    <svg 
                      className="size-7 animate-in zoom-in duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    option.icon
                  )}
                </div>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 text-center">
                  {isCopyBtn && isCopied ? "Copiado" : option.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;