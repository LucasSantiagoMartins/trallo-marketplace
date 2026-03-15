import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import ImageUpload from "@/components/ImageUpload";
import ClassificationDetails from "@/components/ClassificationDetails";
import PriceInput from "@/components/PriceInput";
import QuantitySelector from "@/components/QuantitySelector";
import ConditionModal from "@/components/ConditionModal";
import CategoryDrawer from "@/components/CategoryDrawer";
import { createProduct } from "@/services/product.service";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
} from "@/constants/product-options";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/context/AuthContext";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "NEW",
    stockQuantity: 1,
  });

  const [images, setImages] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [isClosingCategory, setIsClosingCategory] = useState(false);
  const [isClosingCondition, setIsClosingCondition] = useState(false);
  const [isOpeningCategory, setIsOpeningCategory] = useState(false);
  const [isOpeningCondition, setIsOpeningCondition] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      showConditionModal || showCategoryDrawer ? "hidden" : "unset";
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

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Por favor, informe o nome do produto.");
      return;
    }

    if (!formData.price) {
      toast.error("Faltou definir o preço de venda do produto.");
      return;
    }

    if (fileObjects.length === 0) {
      toast.error("Adicione pelo menos uma foto do produto.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.replace(/\D/g, ""));
      data.append("condition", formData.condition);
      data.append("stockQuantity", String(formData.stockQuantity));

      fileObjects.forEach((file) => {
        data.append("images", file);
      });

      const res = await createProduct(data);
      if (res.success) {
        toast.success(res.message ?? "Produto criado.");
        navigate("/meus-produtos");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.value === formData.category)?.label ||
    "Selecionar";
  const selectedConditionLabel =
    PRODUCT_CONDITIONS.find((c) => c.value === formData.condition)?.label ||
    "Selecionar";

  return (
    <MobileLayout className="pb-0 bg-white dark:bg-slate-950">
      <PageHeader title="Criar Novo Produto" showUser={true} />

      <main className="flex flex-col min-h-screen pt-[72px] pb-[100px] bg-white dark:bg-slate-950">
        <div className="px-5 py-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto w-full">
          <div className="space-y-8 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                Fotos do Produto
              </label>
              <ImageUpload
                images={images}
                fileInputRef={fileInputRef}
                onUpload={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFileObjects((prev) => [...prev, ...files]);
                  const urls = files.map((f) => URL.createObjectURL(f));
                  setImages((prev) => [...prev, ...urls]);
                }}
                onRemove={(idx) => {
                  setImages((prev) => prev.filter((_, i) => i !== idx));
                  setFileObjects((prev) => prev.filter((_, i) => i !== idx));
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                Classificação
              </label>
              <ClassificationDetails
                category={selectedCategoryLabel}
                condition={selectedConditionLabel}
                onOpenCategory={openCategoryDrawer}
                onOpenCondition={openConditionModal}
              />
            </div>
          </div>

          <div className="space-y-6 w-full">
            <TralloInput
              label="Nome do Produto"
              placeholder="Ex: iPhone 13 Pro Max - 256GB"
              value={formData.name}
              onChange={(val) => updateField("name", val)}
            />

            <TralloInput
              label="Descrição Detalhada"
              placeholder="Fale sobre o uso, acessórios inclusos e estado do item..."
              value={formData.description}
              onChange={(val) => updateField("description", val)}
              multiline
              rows={6}
              className="min-h-[180px]"
            />

            <div className="flex flex-col sm:flex-row sm:items-end gap-6 w-full">
              <div className="flex-1 w-full">
                <PriceInput
                  value={formData.price}
                  width="max-w-full"
                  title="Preço de Venda"
                  onChange={(value) => updateField("price", value)}
                />
              </div>

              <div className="flex flex-col gap-2 shrink-0 w-fit">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Estoque Disponível
                </label>
                <QuantitySelector
                  value={formData.stockQuantity}
                  onChange={(d) =>
                    updateField(
                      "stockQuantity",
                      Math.max(1, formData.stockQuantity + d),
                    )
                  }
                />
              </div>
            </div>

            <div className="pt-6">
              <TralloButton
                onClick={handleSubmit}
                fullWidth
                isLoading={loading}
                className="py-5 text-lg font-bold shadow-xl shadow-primary/20"
              >
                Publicar Produto
              </TralloButton>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      <ConditionModal
        isOpen={showConditionModal}
        isOpening={isOpeningCondition}
        isClosing={isClosingCondition}
        selectedCondition={formData.condition}
        onClose={closeConditionModal}
        onSelect={(val) => updateField("condition", val)}
      />

      <CategoryDrawer
        isOpen={showCategoryDrawer}
        isOpening={isOpeningCategory}
        isClosing={isClosingCategory}
        selectedCategory={formData.category}
        onClose={closeCategoryDrawer}
        onSelect={(val) => updateField("category", val)}
      />
    </MobileLayout>
  );
};

export default CreateProduct;
