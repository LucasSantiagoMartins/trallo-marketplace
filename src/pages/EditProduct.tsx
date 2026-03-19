import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
} from "@/constants/product-options";
import { getFieldsByCategory } from "@/utils/product-utils";
import BottomNavigation from "@/components/BottomNavigation";
import { ProductDTO } from "@/types/product";
import { updateProduct } from "@/services/product.service";
import { ProductCategory } from "@/enums/product-category.enum";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

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

  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [isClosingCategory, setIsClosingCategory] = useState(false);
  const [isClosingCondition, setIsClosingCondition] = useState(false);
  const [isOpeningCategory, setIsOpeningCategory] = useState(false);
  const [isOpeningCondition, setIsOpeningCondition] = useState(false);

  useEffect(() => {
    const productFromState = location.state?.product as ProductDTO;
    if (productFromState) {
      setFormData({
        name: productFromState.name,
        description: productFromState.description || "",
        price: String(productFromState.price),
        category: productFromState.category as ProductCategory,
        condition: productFromState.condition,
        stockQuantity: productFromState.stock.availableQuantity,
        specifications: productFromState.productDetails || {},
      });

      let productImages = [...(productFromState.images || [])];

      if (
        productFromState.coverImage &&
        !productImages.includes(productFromState.coverImage)
      ) {
        productImages = [productFromState.coverImage, ...productImages];
      }

      if (productImages.length > 0) {
        const fullImageUrls = productImages.map((img) =>
          img.startsWith("http") ? img : BASE_UPLOAD_URL + img,
        );
        setImages(fullImageUrls);
        setFileObjects(productImages);
      }
    }
  }, [location.state]);

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

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSpecField = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [name]: value },
    }));
  };

  const handleSubmit = async () => {
    const productFromState = location.state?.product as ProductDTO;

    if (!productFromState) {
      toast.error("Erro ao recuperar dados do produto.");
      return;
    }

    if (!formData.name) {
      toast.error("Por favor, informe o nome do produto.");
      return;
    }

    if (!formData.price) {
      toast.error("Faltou definir o preço de venda do produto.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      let hasChanges = false;

      if (formData.name !== productFromState.name) {
        form.append("name", formData.name);
        hasChanges = true;
      }

      if (formData.description !== (productFromState.description || "")) {
        form.append("description", formData.description);
        hasChanges = true;
      }

      const numericPrice = Number(formData.price.replace(/\D/g, ""));
      if (numericPrice !== productFromState.price) {
        form.append("price", String(numericPrice));
        hasChanges = true;
      }

      if (formData.category !== productFromState.category) {
        form.append("category", formData.category);
        hasChanges = true;
      }

      if (formData.condition !== productFromState.condition) {
        form.append("condition", formData.condition);
        hasChanges = true;
      }

      if (formData.stockQuantity !== productFromState.stock.availableQuantity) {
        form.append("stockQuantity", String(formData.stockQuantity));
        hasChanges = true;
      }

      if (
        JSON.stringify(formData.specifications) !==
        JSON.stringify(productFromState.productDetails)
      ) {
        form.append("productDetails", JSON.stringify(formData.specifications));
        hasChanges = true;
      }

      const newFiles = fileObjects.filter(
        (file) => file instanceof File,
      ) as File[];

      const existingImagesRemaining = fileObjects.filter(
        (file) => typeof file === "string",
      ) as string[];

      let originalImages = [...(productFromState.images || [])];
      if (
        productFromState.coverImage &&
        !originalImages.includes(productFromState.coverImage)
      ) {
        originalImages = [productFromState.coverImage, ...originalImages];
      }

      if (newFiles.length > 0) {
        newFiles.forEach((file) => {
          form.append("images", file);
        });
        hasChanges = true;
      }

      const removedImages = originalImages.filter(
        (img) => !existingImagesRemaining.includes(img),
      );

      if (removedImages.length > 0) {
        form.append("removedImages", JSON.stringify(removedImages));
        hasChanges = true;
      }

      if (!hasChanges) {
        toast("Nenhuma alteração detectada.", { icon: "ℹ️" });
        setLoading(false);
        return;
      }

      const res = await updateProduct(productFromState.id, form as any);

      if (res.success) {
        toast.success(res.message ?? "Produto atualizado com sucesso.");
        navigate("/meus-produtos");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const selectedConditionLabel =
    PRODUCT_CONDITIONS.find((c) => c.value === formData.condition)?.label ||
    "Selecionar";

  const dynamicFields = formData.category
    ? getFieldsByCategory(formData.category as ProductCategory)
    : [];

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
                category={formData.category}
                condition={selectedConditionLabel}
                onOpenCategory={openCategoryDrawer}
                onOpenCondition={openConditionModal}
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
              label="Descrição Detalhada"
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

            {dynamicFields.length > 0 && (
              <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Especificações Técnicas
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dynamicFields.map((field) => (
                    <TralloInput
                      key={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={formData.specifications[field.name] || ""}
                      onChange={(val) => updateSpecField(field.name, val)}
                    />
                  ))}
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
        onSelect={(val) => {
          const productFromState = location.state?.product as ProductDTO;
          updateField("category", val);
          if (productFromState && val !== productFromState.category) {
            updateField("specifications", {});
          }
        }}
      />
    </MobileLayout>
  );
};

export default EditProduct;
