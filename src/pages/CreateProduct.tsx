import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import TralloInput from "@/components/TralloInput";

const CATEGORIES = [
  "Eletrónicos",
  "Moda",
  "Casa",
  "Lazer",
  "Imóveis",
  "Veículos",
  "Saúde & Beleza",
  "Desporto",
  "Crianças",
  "Serviços",
  "Emprego",
  "Outros",
];

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "Novo",
  });

  const [images, setImages] = useState<string[]>([]);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [isClosingCategory, setIsClosingCategory] = useState(false);
  const [isClosingCondition, setIsClosingCondition] = useState(false);

  useEffect(() => {
    if (showConditionModal || showCategoryDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showConditionModal, showCategoryDrawer]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 4 - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const newImageUrls = filesToProcess.map((file) =>
      URL.createObjectURL(file),
    );
    setImages((prev) => [...prev, ...newImageUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const closeCategoryDrawer = () => {
    setIsClosingCategory(true);
    setTimeout(() => {
      setShowCategoryDrawer(false);
      setIsClosingCategory(false);
    }, 500);
  };

  const closeConditionModal = () => {
    setIsClosingCondition(true);
    setTimeout(() => {
      setShowConditionModal(false);
      setIsClosingCondition(false);
    }, 500);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    setFormData({
      ...formData,
      price: value,
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Product submitted:", { ...formData, images });
  };

  return (
    <MobileLayout className="pb-10">
      <PageHeader
        title="Criar Novo Produto"
        backTo={-1}
        rightElement={
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-primary"
          >
            Cancelar
          </button>
        }
      />

      <main className="px-4 md:px-6 lg:px-8 space-y-6 max-w-2xl mx-auto pt-16 md:pt-24">
        <section className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-base md:text-lg">Fotos do Produto</h2>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${images.length === 4 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
            >
              {images.length} / 4
            </span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
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
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
            ))}

            {images.length < 4 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-1">
                  add_a_photo
                </span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
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
              onChange={handleImageUpload}
            />
          </div>
        </section>

        <section className="space-y-4">
          <TralloInput
            label="Nome do Artigo"
            placeholder="Ex: iPhone 15 Pro Max Titanium"
            value={formData.name}
            onChange={(val) => updateField("name", val)}
          />
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight ml-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descreve o estado, cor, e detalhes técnicos..."
              rows={4}
              className="w-full p-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium resize-none"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 space-y-2">
          <div
            onClick={() => setShowCategoryDrawer(true)}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  category
                </span>
              </div>
              <span className="text-sm font-semibold">Categoria</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {formData.category || "Selecionar"}
              </span>
              <span className="material-symbols-outlined text-muted-foreground group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>
          </div>

          <div
            onClick={() => setShowConditionModal(true)}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  history_edu
                </span>
              </div>
              <span className="text-sm font-semibold">Estado do Produto</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {formData.condition}
              </span>
              <span className="material-symbols-outlined text-muted-foreground group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight ml-1">
            Preço de Venda
          </label>
          <div className="group relative w-full py-8 rounded-2xl bg-card border border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3 w-full px-4">
              <span className="font-grotesk text-2xl font-bold text-muted-foreground">
                Kz
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={formData.price}
                onChange={handlePriceChange}
                placeholder="0"
                className="font-grotesk text-4xl md:text-5xl font-bold bg-transparent border-none focus:ring-0 text-center w-full max-w-[400px] md:max-w-[500px] text-zinc-600 placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
        </section>

        <div className="pt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-2xl">add</span>
            <span>Adicionar Produto</span>
          </button>
        </div>
      </main>

      {showConditionModal && (
        <div
          className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isClosingCondition ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`bg-card w-full max-w-sm rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl border-t md:border border-border/40 transition-all duration-500 ease-in-out
            ${isClosingCondition ? "translate-y-full opacity-0" : "translate-y-0 opacity-100 animate-in slide-in-from-bottom"}`}
          >
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto md:hidden -mt-2 mb-4" />
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-tight">
                Estado do Artigo
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Como classificas a conservação?
              </p>
            </div>
            <div className="grid gap-3">
              {["Novo", "Semi-novo", "Usado"].map((opt) => (
                <div
                  key={opt}
                  onClick={() => updateField("condition", opt)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${formData.condition === opt ? "bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 text-primary shadow-sm" : "bg-muted/30 border-transparent text-foreground/70 hover:bg-muted/50"}`}
                >
                  <span className="font-bold tracking-tight">{opt}</span>
                  {formData.condition === opt && (
                    <span className="material-symbols-outlined text-primary">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={closeConditionModal}
                className="py-4 bg-muted text-muted-foreground font-bold rounded-2xl hover:bg-muted/80 transition-all active:scale-95"
              >
                Fechar
              </button>
              <button
                onClick={closeConditionModal}
                className="py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryDrawer && (
        <div
          className={`fixed inset-0 z-[100] flex justify-end transition-all duration-500 ${isClosingCategory ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={closeCategoryDrawer}
          />
          <div
            className={`relative w-[85%] md:w-[400px] h-full bg-card shadow-2xl flex flex-col p-6 md:p-8 border-l border-border/40 transition-all duration-500 ease-in-out
            ${isClosingCategory ? "translate-x-full opacity-0" : "translate-x-0 opacity-100 animate-in slide-in-from-right"}`}
          >
            <div className="flex items-center justify-between mb-8 shrink-0">
              <h3 className="text-2xl font-bold tracking-tight">Categorias</h3>
              <button
                onClick={closeCategoryDrawer}
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-foreground/70">
                  close
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 [scrollbar-width:none] pr-1">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  onClick={() => updateField("category", cat)}
                  className={`p-5 rounded-2xl cursor-pointer border flex items-center justify-between transition-all ${formData.category === cat ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 text-primary shadow-sm" : "bg-muted/30 border-transparent text-foreground/70 hover:bg-muted/50"}`}
                >
                  <span className="font-bold tracking-tight">{cat}</span>
                  {formData.category === cat && (
                    <span className="material-symbols-outlined text-primary scale-110">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 grid grid-cols-2 gap-3 shrink-0">
              <button
                onClick={closeCategoryDrawer}
                className="py-4 bg-muted text-muted-foreground font-bold rounded-2xl active:scale-95 transition-all"
              >
                Fechar
              </button>
              <button
                onClick={closeCategoryDrawer}
                className="py-4 bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default CreateProduct;
