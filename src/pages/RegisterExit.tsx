import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { registerStockExit } from "@/services/warehouse-inventory.service";
import BottomNavigation from "@/components/BottomNavigation";
import { RegisterExitDto } from "@/types/warehouse-inventory";
import { OrderStockItem } from "@/dtos/order";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { useOrderSearch } from "@/hooks/use-order-search";

const RegisterExit: React.FC = () => {
  const {
    orderNumber,
    searchResults,
    confirmedProducts,
    delivererId,
    isSearching,
    handleSearch,
    updateOrderNumber,
    updateDelivererId,
    confirmExit,
    resetExit,
  } = useOrderSearch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderStockItem | null>(
    null,
  );
  const [showPopup, setShowPopup] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const openConfirmPopup = (product: OrderStockItem) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleConfirmAction = () => {
    if (selectedProduct) {
      confirmExit(selectedProduct);
      toast.success(`${selectedProduct.productSku} conferido.`);
    }
    setShowPopup(false);
  };

  const handleFinalSubmit = async () => {
    if (!delivererId || delivererId <= 0) {
      toast.error("Informe o ID do entregador antes de finalizar.");
      return;
    }

    setIsSubmitting(true);
    const payload: RegisterExitDto = {
      orderNumber,
      delivererId: Number(delivererId),
    };

    try {
      const response = await registerStockExit(payload);
      if (response.success) {
        toast.success(response.message || "Saída registrada com sucesso!");
        resetExit();
      } else {
        toast.error(response.message || "Erro ao registrar saída.");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        title="Operacional"
        items={operatorItems}
        activePage="registrar-saida"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Registrar Saída
            </h1>
            <p className="text-muted-foreground mt-2">
              Consulte o pedido e confirme os itens para a entrega.
            </p>
          </header>

          <section className="bg-card p-6 rounded-[2rem] border border-border mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full" onKeyDown={handleKeyDown}>
                <TralloInput
                  className="w-full"
                  label="Número do Pedido"
                  placeholder="Ex: PED-OU0RYR2O"
                  value={orderNumber}
                  onChange={updateOrderNumber}
                  icon="search"
                />
              </div>
              <TralloButton
                onClick={handleSearch}
                isLoading={isSearching}
                className="md:w-48"
              >
                Pesquisar
              </TralloButton>
            </div>
          </section>

          <div className="grid gap-4">
            {searchResults?.map((product) => {
              const isConfirmed = confirmedProducts?.some(
                (p) => p.productSku === product.productSku,
              );
              return (
                <div
                  key={product.productSku}
                  className="bg-card p-5 rounded-2xl flex justify-between items-center border border-border"
                >
                  <div className="flex items-center gap-4">
                    {product.coverImage && (
                      <img
                        src={BASE_UPLOAD_URL + product.coverImage}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-muted"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] font-semibold text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full border border-border/50">
                          {product.productSku}
                        </span>
                      </div>
                    </div>
                  </div>
                  <TralloButton
                    variant={isConfirmed ? "secondary" : "outline"}
                    className={`h-10 text-sm ${isConfirmed ? "text-emerald-500" : ""}`}
                    disabled={isConfirmed}
                    onClick={() => openConfirmPopup(product)}
                  >
                    {isConfirmed ? "Conferido ✓" : "Confirmar"}
                  </TralloButton>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="lg:col-span-4 bg-card rounded-[2.5rem] p-6 border border-border h-fit sticky top-12 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              local_shipping
            </span>
            Resumo da Saída
          </h2>

          <div className="mb-6">
            <TralloInput
              label="ID do Entregador"
              type="number"
              placeholder="Ex: 452"
              value={delivererId > 0 ? String(delivererId) : ""}
              onChange={(val) => updateDelivererId(Number(val))}
              icon="person"
            />
          </div>

          <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-xs font-bold uppercase opacity-50">
              Itens na Carga:
            </p>
            {confirmedProducts?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm p-3 bg-background rounded-xl border border-border"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-primary">
                    {item.productSku}
                  </span>
                  <span className="text-[10px] opacity-70 truncate max-w-[150px]">
                    {item.name}
                  </span>
                </div>
                <span className="font-black text-primary">
                  x{item.quantity}
                </span>
              </div>
            ))}
            {(!confirmedProducts || confirmedProducts.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground text-sm italic">
                  Aguardando conferência...
                </p>
              </div>
            )}
          </div>

          <TralloButton
            fullWidth
            disabled={
              !confirmedProducts ||
              confirmedProducts.length === 0 ||
              !delivererId
            }
            onClick={handleFinalSubmit}
            isLoading={isSubmitting}
          >
            Registrar Saída
          </TralloButton>
        </aside>
      </main>

      <AnimatePresence>
        {showPopup && selectedProduct && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-[2.5rem] p-8 border border-border"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    fact_check
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-1">Conferir Item</h2>
                <div className="text-sm text-muted-foreground">
                  Confirme as <strong>{selectedProduct.quantity}</strong>{" "}
                  unidades de:
                  <br />
                  <span className="text-primary font-bold">
                    {selectedProduct.name}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <TralloButton
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowPopup(false)}
                >
                  Voltar
                </TralloButton>
                <TralloButton className="flex-1" onClick={handleConfirmAction}>
                  Confirmar
                </TralloButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <BottomNavigation />
    </div>
  );
};

export default RegisterExit;
