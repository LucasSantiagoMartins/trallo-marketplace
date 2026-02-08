import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "Novo",
    location: "Luanda",
  });
  const [isPremium, setIsPremium] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Product submitted:", formData, { isPremium });
    // navigate to product details or home
  };

  return (
    <MobileLayout className="pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 md:px-6 lg:px-8 py-4 flex items-center justify-center">
        <div className="w-full max-w-2xl flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card shadow-sm"
          >
            <span className="material-symbols-outlined text-foreground">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight">Criar Novo Produto</h1>
          <button className="text-sm font-semibold text-primary">Cancelar</button>
        </div>
      </header>

      <main className="px-4 md:px-6 lg:px-8 space-y-4 max-w-2xl mx-auto">
        {/* Media Upload Card */}
        <section className="bg-card rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-base md:text-lg">Fotos do Produto</h2>
            <span className="text-xs font-medium text-muted-foreground">0 / 5</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl mb-1">add_a_photo</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Adicionar</span>
            </div>
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="material-symbols-outlined text-muted-foreground/30">image</span>
            </div>
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="material-symbols-outlined text-muted-foreground/30">image</span>
            </div>
            <div className="hidden md:flex aspect-square rounded-lg bg-muted items-center justify-center">
              <span className="material-symbols-outlined text-muted-foreground/30">image</span>
            </div>
            <div className="hidden md:flex aspect-square rounded-lg bg-muted items-center justify-center">
              <span className="material-symbols-outlined text-muted-foreground/30">image</span>
            </div>
          </div>
        </section>

        {/* Basic Info Card */}
        <section className="bg-card rounded-xl p-4 md:p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
              Nome do Artigo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Ex: iPhone 15 Pro Max Titanium"
              className="w-full bg-muted border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descreve o estado, cor, e detalhes técnicos..."
              rows={3}
              className="w-full bg-muted border-none rounded-lg p-4 focus:ring-2 focus:ring-primary text-sm font-medium resize-none"
            />
          </div>
        </section>

        {/* Taxonomy Card */}
        <section className="bg-card rounded-xl p-4 md:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">category</span>
              <span className="text-sm font-medium">Categoria</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Selecionar</span>
              <span className="material-symbols-outlined text-muted-foreground text-lg">chevron_right</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">conditions</span>
              <span className="text-sm font-medium">Estado do Produto</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">{formData.condition}</span>
              <span className="material-symbols-outlined text-muted-foreground text-lg">chevron_right</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="text-sm font-medium">Localização</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">{formData.location}</span>
              <span className="material-symbols-outlined text-muted-foreground text-lg">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="bg-card rounded-xl p-6 md:p-8 shadow-sm border-2 border-primary/10">
          <label className="block text-center text-sm font-bold mb-4 text-primary uppercase tracking-widest">
            Preço de Venda
          </label>
          <div className="flex items-center justify-center gap-3">
            <span className="font-grotesk text-2xl font-bold text-muted-foreground">Kz</span>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="font-grotesk text-4xl md:text-5xl font-bold bg-transparent border-none focus:ring-0 text-center w-full max-w-[200px] md:max-w-[250px] placeholder:text-muted-foreground"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-xs text-green-500">trending_up</span>
              <span className="text-[10px] font-bold text-muted-foreground">PREÇO RECOMENDADO</span>
            </div>
          </div>
        </section>

        {/* Premium Option */}
        <section
          onClick={() => setIsPremium(!isPremium)}
          className="bg-gradient-to-br from-primary to-primary/70 rounded-xl p-4 md:p-6 shadow-lg text-primary-foreground flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-foreground text-2xl">bolt</span>
            </div>
            <div>
              <h4 className="font-bold text-sm md:text-base">Vender mais rápido?</h4>
              <p className="text-xs md:text-sm text-primary-foreground/80">Destaque o seu anúncio hoje.</p>
            </div>
          </div>
          <div
            className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${
              isPremium ? "border-primary-foreground bg-primary-foreground" : "border-primary-foreground/40"
            }`}
          >
            {isPremium && <div className="w-3 h-3 bg-primary rounded-full" />}
          </div>
        </section>
      </main>

      {/* Sticky Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Publicar Anúncio</span>
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </button>
        </div>
      </footer>
    </MobileLayout>
  );
};

export default CreateProduct;
