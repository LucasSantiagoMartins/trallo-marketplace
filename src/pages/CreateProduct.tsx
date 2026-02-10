import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { createProduct } from "@/api/product.service";
import { useAppToast } from "@/hooks/useAppToast";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
} from "@/constants/product-options";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      images.length === 0
    ) {
      showToast("error", "Preencha os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price.replace(/\./g, "")),
        images,
      };
      const res = await createProduct(payload);
      if (res.success) {
        showToast("success", "Produto criado!");
        navigate("/my-products");
      }
    } catch (err) {
      showToast("error", "Erro ao conectar ao servidor.");
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
    <MobileLayout className="pb-10">
      <PageHeader title="Criar Novo Produto" backTo={-1} />

      <main className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto pt-32 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ImageUpload
              images={images}
              fileInputRef={fileInputRef}
              onUpload={(e) => {
                const files = Array.from(e.target.files || []);
                const urls = files.map((f) => URL.createObjectURL(f));
                setImages((prev) => [...prev, ...urls]);
              }}
              onRemove={(idx) =>
                setImages((prev) => prev.filter((_, i) => i !== idx))
              }
            />

            <ClassificationDetails
              category={selectedCategoryLabel}
              condition={selectedConditionLabel}
              onOpenCategory={openCategoryDrawer}
              onOpenCondition={openConditionModal}
            />
          </div>

          <div className="space-y-6">
            <TralloInput
              label="Nome"
              placeholder="Nome do produto"
              value={formData.name}
              onChange={(val) => updateField("name", val)}
            />

            <TralloInput
              label="Descrição"
              placeholder="Descreve o teu produto..."
              value={formData.description}
              onChange={(val) => updateField("description", val)}
              multiline
              rows={5}
              className="min-h-[150px]"
            />

            <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
              <div className="flex-1 w-full">
                <PriceInput
                  value={formData.price}
                  onChange={(e) =>
                    updateField(
                      "price",
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
                  Quantidade
                </label>
                <QuantitySelector
                  value={formData.stockQuantity}
                  className="h-[50px] w-full md:min-w-[130px]"
                  onChange={(d) =>
                    updateField(
                      "stockQuantity",
                      Math.max(1, formData.stockQuantity + d),
                    )
                  }
                />
              </div>
            </div>

            <div className="pt-2">
              <TralloButton
                onClick={handleSubmit}
                fullWidth
                isLoading={loading}
                className="py-4"
              >
                Adicionar produto
              </TralloButton>
            </div>
          </div>
        </div>
      </main>

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
