import React, { useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { registerStockExit } from "@/services/warehouse-inventory.service";
import BottomNavigation from "@/components/BottomNavigation";
import { RegisterExitDto } from "@/types/warehouse-inventory";
import { OrderStockItem } from "@/dtos/order";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { useOrderSearch } from "@/hooks/use-order-search";
import ProductActionCard from "@/components/ProductActionCard";

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
    removeItemFromExit,
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

    if (!confirmedProducts || confirmedProducts.length === 0) {
      toast.error("Nenhum item foi conferido para a saída.");
      return;
    }

    setIsSubmitting(true);

    const payload: RegisterExitDto = {
      orderNumber,
      delivererId: Number(delivererId),
      items: confirmedProducts.map((item) => ({
        productSku: item.productSku,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await registerStockExit(payload);
      if (response.success) {
        toast.success(response.message || "Saída registrada com sucesso!");
        resetExit();
      } else {
        toast.error(response.message || "Erro ao registrar saída.");
      }
    } catch (error) {
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
            {searchResults
              ?.filter(
                (product) =>
                  !confirmedProducts?.some(
                    (p) => p.productSku === product.productSku,
                  ),
              )
              .map((product) => (
                <div
                  key={product.productSku}
                  className="animate-in fade-in zoom-in-95 duration-200"
                >
                  <ProductActionCard
                    product={product}
                    buttonText="Confirmar"
                    buttonVariant="outline"
                    onAction={openConfirmPopup}
                  />
                </div>
              ))}
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

          <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-xs font-bold uppercase opacity-50">
              Itens na Carga:
            </p>

            {confirmedProducts?.map((item) => (
              <div
                key={item.productSku}
                className="relative group p-4 bg-background rounded-2xl border border-border transition-all hover:border-primary/30 animate-in fade-in slide-in-from-right-4 duration-200"
              >
                <button
                  onClick={() => removeItemFromExit(item.productSku)}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    close
                  </span>
                </button>

                <div className="flex flex-col pr-6">
                  <span className="font-bold text-primary text-xs tracking-wider">
                    {item.productSku}
                  </span>
                  <span className="text-sm font-medium text-foreground mt-1 truncate">
                    {item.name}
                  </span>
                  <div className="mt-2 flex items-center">
                    <span className="text-[11px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                      QUANTIDADE: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {(!confirmedProducts || confirmedProducts.length === 0) && (
              <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
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

      {showPopup && selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-md rounded-[2.5rem] p-8 border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">
                  fact_check
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Conferir Item</h2>
              <div className="text-sm text-muted-foreground">
                Confirme as <strong>{selectedProduct.quantity}</strong> unidades
                de:
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
          </div>
        </div>
      )}
      <BottomNavigation />
    </div>
  );
};

export default RegisterExit;
