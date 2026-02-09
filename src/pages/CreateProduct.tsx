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
  const [isOpeningCategory, setIsOpeningCategory] = useState(false);
  const [isOpeningCondition, setIsOpeningCondition] = useState(false);

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

  const openCategoryDrawer = () => {
    setShowCategoryDrawer(true);
    setIsOpeningCategory(true);
    setTimeout(() => setIsOpeningCategory(false), 10);
  };

  const openConditionModal = () => {
    setShowConditionModal(true);
    setIsOpeningCondition(true);
    setTimeout(() => setIsOpeningCondition(false), 10);
  };

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

      <main className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto pt-24 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
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
                  onChange={handleImageUpload}
                />
              </div>
            </section>

            <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 space-y-3">
              <h2 className="font-bold text-base px-1">
                Detalhes de Classificação
              </h2>
              <div
                onClick={openCategoryDrawer}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    category
                  </span>
                  <span className="text-sm font-semibold">Categoria</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {formData.category || "Selecionar"}
                </span>
              </div>

              <div
                onClick={openConditionModal}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    history_edu
                  </span>
                  <span className="text-sm font-semibold">Estado</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {formData.condition}
                </span>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="space-y-4">
              <TralloInput
                label="Nome do Artigo"
                placeholder="Ex: iPhone 15 Pro Max Titanium"
                value={formData.name}
                onChange={(val) => updateField("name", val)}
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Descreve o estado, cor, e detalhes técnicos..."
                  rows={6}
                  className="w-full p-4 rounded-xl bg-card border border-border focus:border-primary transition-all outline-none text-sm font-medium resize-none"
                />
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
                Preço de Venda
              </label>
              <div className="relative w-full py-6 rounded-2xl bg-card border border-border focus-within:border-primary transition-all flex items-center justify-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  className="text-3xl font-bold bg-transparent border-none text-center w-full outline-none"
                />
                <span className="absolute right-6 font-bold text-muted-foreground">
                  AOA
                </span>
              </div>
            </section>

            <div className="pt-2">
              <button
                onClick={handleSubmit}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Adicionar produto</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {showConditionModal && (
        <div
          className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-[4px] transition-opacity duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isClosingCondition || isOpeningCondition ? "opacity-0" : "opacity-100"}`}
          onClick={closeConditionModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-card w-full max-w-sm rounded-t-[32px] md:rounded-[32px] p-6 space-y-6 shadow-2xl transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) relative ${isClosingCondition || isOpeningCondition ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
          >
            <button
              onClick={closeConditionModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="text-center pt-2">
              <h3 className="text-xl font-bold">Estado do Artigo</h3>
              <p className="text-sm text-muted-foreground">
                Como classificas a conservação?
              </p>
            </div>
            <div className="grid gap-3">
              {["Novo", "Semi-novo", "Usado"].map((opt) => (
                <div
                  key={opt}
                  onClick={() => updateField("condition", opt)}
                  className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all duration-200 ${formData.condition === opt ? "bg-primary/10 border-primary text-primary" : "bg-muted/30 border-transparent hover:bg-muted/50"}`}
                >
                  <span className="font-bold">{opt}</span>
                  {formData.condition === opt && (
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={closeConditionModal}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-transform"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {showCategoryDrawer && (
        <div
          className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isClosingCategory || isOpeningCategory ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
            onClick={closeCategoryDrawer}
          />
          <div
            className={`relative w-[85%] md:w-[400px] h-full bg-card shadow-2xl flex flex-col p-6 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isClosingCategory || isOpeningCategory ? "translate-x-full" : "translate-x-0"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Categorias</h3>
              <button
                onClick={closeCategoryDrawer}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  onClick={() => updateField("category", cat)}
                  className={`p-5 rounded-2xl cursor-pointer border flex items-center justify-between transition-all duration-200 ${formData.category === cat ? "bg-primary/10 border-primary text-primary" : "bg-muted/30 border-transparent hover:bg-muted/50"}`}
                >
                  <span className="font-bold">{cat}</span>
                  {formData.category === cat && (
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={closeCategoryDrawer}
              className="mt-4 py-4 bg-primary text-primary-foreground font-bold rounded-2xl active:scale-95 transition-transform"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default CreateProduct;
