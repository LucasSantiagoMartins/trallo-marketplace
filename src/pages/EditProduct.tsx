import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import BottomNavigation from "@/components/BottomNavigation";
import EmptyState from "@/components/EmptyState";

import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { PRODUCT_CONDITIONS } from "@/constants/product-options";
import { getFieldsByCategory } from "@/utils/product-utils";
import { ProductDTO } from "@/types/product";
import { ProductCategory } from "@/enums/product-category.enum";
import { productCategoryLabel } from "@/utils/mappers/product-category.mapper";

import { useProductUpdate } from "@/hooks/use-product-update";
import { useProductUiStates } from "@/hooks/use-product-ui-states";

const EditProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productFromState = location.state?.product as ProductDTO;

  const { handleUpdate, loading } = useProductUpdate();
  const { states, actions } = useProductUiStates();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "" as ProductCategory | "",
    condition: "NEW",
    stockQuantity: 1,
    specifications: {} as Record<string, any>,
  });

  const [images, setImages] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (productFromState) {
      setFormData({
        name: productFromState.name,
        description: productFromState.description || "",
        price: String(productFromState.price),
        category: productFromState.category as ProductCategory,
        condition: productFromState.condition,
        stockQuantity: productFromState.stock.availableQuantity,
        specifications: productFromState.details || {},
      });

      let productImages = [...(productFromState.images || [])];
      if (
        productFromState.coverImage &&
        !productImages.includes(productFromState.coverImage)
      ) {
        productImages = [productFromState.coverImage, ...productImages];
      }

      if (productImages.length > 0) {
        const fullUrls = productImages.map((img) =>
          img.startsWith("http") ? img : BASE_UPLOAD_URL + img,
        );
        setImages(fullUrls);
        setFileObjects(productImages);
      }
    }
  }, [productFromState]);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSpecField = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    if (!productFromState)
      return toast.error("Erro ao recuperar dados do produto.");
    if (!formData.name.trim())
      return toast.error("Por favor, informe o nome do produto.");
    if (!formData.price || formData.price === "0")
      return toast.error("Defina o preço de venda.");

    handleUpdate(productFromState.id, formData, fileObjects, productFromState);
  };

  const dynamicFields = useMemo(() => {
    return formData.category
      ? getFieldsByCategory(formData.category as ProductCategory)
      : [];
  }, [formData.category]);

  const selectedConditionLabel =
    PRODUCT_CONDITIONS.find((c) => c.value === formData.condition)?.label ||
    "Selecionar";

  if (!productFromState) {
    return (
      <MobileLayout>
        <EmptyState
          icon="edit_off"
          title="Erro ao carregar edição"
          description="Ocorreu um problema ao carregar os dados para edição. Certifique-se de que o produto ainda existe."
        />
        <BottomNavigation />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="pb-0 bg-white dark:bg-slate-950">
      <PageHeader title="Editar Produto" />

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
                  setImages((prev) => [
                    ...prev,
                    ...files.map((f) => URL.createObjectURL(f)),
                  ]);
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
                category={formData.category}
                condition={selectedConditionLabel}
                onOpenCategory={actions.openCategory}
                onOpenCondition={actions.openCondition}
              />
            </div>
          </div>

          <div className="space-y-6 w-full">
            <TralloInput
              label="Nome do Produto"
              value={formData.name}
              onChange={(val) => updateField("name", val)}
            />

            <TralloInput
              label="Descrição Detalhada (opcional)"
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
                  title="Preço de Venda"
                  onChange={(val) => updateField("price", val)}
                />
              </div>
              <div className="flex flex-col gap-2 shrink-0 w-fit">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Estoque
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

            {dynamicFields.length > 0 && (
              <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Especificações de{" "}
                  {formData.category
                    ? productCategoryLabel[formData.category as ProductCategory]
                    : ""}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dynamicFields.map((field) => {
                    const fieldValue =
                      formData.specifications[field.name] ??
                      formData.specifications[field.label] ??
                      "";
                    return (
                      <TralloInput
                        key={field.name}
                        label={`${field.label}${field.required === false ? " (opcional)" : ""}`}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={String(fieldValue)}
                        onChange={(val) => updateSpecField(field.name, val)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-6">
              <TralloButton
                onClick={handleSubmit}
                fullWidth
                isLoading={loading}
                className="py-5 text-lg font-bold shadow-xl shadow-primary/20"
              >
                Salvar Alterações
              </TralloButton>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      <ConditionModal
        isOpen={states.showConditionModal}
        isOpening={states.isOpeningCondition}
        isClosing={states.isClosingCondition}
        selectedCondition={formData.condition}
        onClose={actions.closeCondition}
        onSelect={(val) => updateField("condition", val)}
      />

      <CategoryDrawer
        isOpen={states.showCategoryDrawer}
        isOpening={states.isOpeningCategory}
        isClosing={states.isClosingCategory}
        selectedCategory={formData.category}
        onClose={actions.closeCategory}
        onSelect={(val) => {
          updateField("category", val);
          updateField(
            "specifications",
            val === productFromState?.category
              ? productFromState.details || {}
              : {},
          );
        }}
      />
    </MobileLayout>
  );
};

export default EditProduct;
