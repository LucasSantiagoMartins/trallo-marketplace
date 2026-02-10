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
  return (
    <section className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-base">Fotos do Produto</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${images.length === 4 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          {images.length} / 4
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border border-border"
          >
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}

        {images.length < 4 && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-2xl mb-1">
              add_a_photo
            </span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
              Adicionar
            </span>
          </div>
        )}
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
