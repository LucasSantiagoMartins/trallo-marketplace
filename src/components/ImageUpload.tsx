import React from "react";

interface ImageUploadProps {
  images: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  fileInputRef,
  onUpload,
  onRemove,
}) => {
  const maxImages = 4;
  const slots = Array.from({ length: maxImages });

  return (
    <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-sm uppercase tracking-tight text-muted-foreground">
          Fotos do Produto
        </h2>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            images.length === maxImages
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {images.length} / {maxImages}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {slots.map((_, index) => {
          const imageSrc = images[index];

          if (imageSrc) {
            return (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted"
              >
                <img
                  src={imageSrc}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="material-symbols-outlined text-[12px]">
                    close
                  </span>
                </button>
              </div>
            );
          }

          const isNextSlot = index === images.length;

          return (
            <div
              key={index}
              onClick={() => isNextSlot && fileInputRef.current?.click()}
              className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                isNextSlot
                  ? "border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10"
                  : "border-border/40 bg-muted/10 cursor-default"
              }`}
            >
              {isNextSlot && (
                <>
                  <span className="material-symbols-outlined text-primary text-xl">
                    add_a_photo
                  </span>
                  <span className="text-[8px] font-bold text-primary uppercase mt-0.5">
                    Adicionar
                  </span>
                </>
              )}
            </div>
          );
        })}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={onUpload}
        />
      </div>
    </section>
  );
};

export default ImageUpload;