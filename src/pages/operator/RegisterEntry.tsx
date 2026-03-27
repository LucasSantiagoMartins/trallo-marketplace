import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { registerStockEntry } from "@/services/warehouse-inventory.service";
import BottomNavigation from "@/components/BottomNavigation";
import { RegisterEntryDto, StockEntryItem } from "@/types/warehouse-inventory";
import { OrderStockItem } from "@/dtos/order";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { useOrderSearch } from "@/hooks/use-order-search";
import ProductActionCard from "@/components/ProductActionCard";

const RegisterEntry: React.FC = () => {
  const {
    orderNumber,
    searchResults,
    addedItems,
    isSearching,
    handleSearch,
    updateOrderNumber,
    addItemToAllocation,
    removeItemFromAllocation,
    clearLocalAllocation,
  } = useOrderSearch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderStockItem | null>(
    null,
  );
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    shelfCode: "",
    row: 0,
    quantity: 1,
  });

  const availableProducts = useMemo(() => {
    return searchResults?.filter(
      (product) =>
        !addedItems?.some((item) => item.productSku === product.productSku),
    );
  }, [searchResults, addedItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openEntryPopup = (product: OrderStockItem) => {
    setSelectedProduct(product);
    setFormData({ shelfCode: "", row: 0, quantity: product.quantity });
    setShowPopup(true);
  };

  const addToAddedList = () => {
    if (!selectedProduct) return;
    if (!formData.shelfCode) {
      toast.error("Informe o código da estante.");
      return;
    }

    const newItem: StockEntryItem = {
      productSku: selectedProduct.productSku,
      shelfCode: formData.shelfCode,
      row: Number(formData.row),
      quantity: Number(formData.quantity),
    };

    addItemToAllocation(newItem);
    setShowPopup(false);
    toast.success(`${selectedProduct.productSku} pronto para alocação.`);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const payload: RegisterEntryDto = {
      orderNumber,
      items: addedItems || [],
    };

    try {
      const response = await registerStockEntry(payload);
      if (response.success) {
        toast.success(response.message || "Entrada registrada com sucesso!");
        clearLocalAllocation();
      } else {
        toast.error(
          response.message || "Não foi possível registrar a entrada.",
        );
      }
    } catch (err) {
      toast.error(err.message ?? "Erro ao processar registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        title="Operacional"
        items={operatorItems}
        activePage="registrar-entrada"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Registrar Entrada
            </h1>
            <p className="text-muted-foreground mt-2">
              Localize o pedido e organize os itens nas estantes.
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
            {availableProducts?.map((product) => (
              <ProductActionCard
                key={product.productSku}
                product={product}
                buttonText="Alocar"
                onAction={openEntryPopup}
              />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 bg-card rounded-[2.5rem] p-6 border border-border h-fit sticky top-12 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              inventory_2
            </span>
            Itens para Alocação
          </h2>

          <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {addedItems?.map((item, idx) => (
              <div
                key={idx}
                className="text-sm p-4 bg-background rounded-2xl border border-border relative group animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <button
                  onClick={() => removeItemFromAllocation(item.productSku)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    close
                  </span>
                </button>
                <p className="font-bold text-primary mb-2">{item.productSku}</p>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-bold uppercase text-muted-foreground">
                  <div className="bg-muted p-2 rounded-lg text-center">
                    <p className="opacity-60">Qtd</p>
                    <p className="text-foreground">{item.quantity}</p>
                  </div>
                  <div className="bg-muted p-2 rounded-lg text-center">
                    <p className="opacity-60">Estante</p>
                    <p className="text-foreground">{item.shelfCode}</p>
                  </div>
                  <div className="bg-muted p-2 rounded-lg text-center">
                    <p className="opacity-60">Fila</p>
                    <p className="text-foreground">{item.row}</p>
                  </div>
                </div>
              </div>
            ))}
            {(!addedItems || addedItems.length === 0) && (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
                <span className="material-symbols-outlined text-muted-foreground/30 text-4xl">
                  box_add
                </span>
                <p className="text-muted-foreground text-sm mt-2">
                  Aguardando alocação...
                </p>
              </div>
            )}
          </div>

          <TralloButton
            fullWidth
            disabled={!addedItems || addedItems.length === 0}
            onClick={handleFinalSubmit}
            isLoading={isSubmitting}
          >
            Finalizar Alocação
          </TralloButton>
        </aside>
      </main>

      {showPopup && selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setShowPopup(false)}
          />
          <div className="bg-card w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-border relative animate-in zoom-in-95 fade-in duration-300">
            <h2 className="text-2xl font-bold mb-1">Endereçamento</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Informe a localização de{" "}
              <span className="text-primary font-bold">
                {selectedProduct.name}
              </span>
            </p>

            <div className="space-y-6">
              <TralloInput
                label="Código da Prateleira"
                placeholder="Ex.: P-A3"
                value={formData.shelfCode}
                onChange={(val) => setFormData({ ...formData, shelfCode: val })}
                icon="shelves"
              />

              <div className="grid grid-cols-2 gap-4">
                <TralloInput
                  label="Fileira"
                  type="number"
                  onChange={(val) =>
                    setFormData({ ...formData, row: parseInt(val) || 0 })
                  }
                  icon="format_list_numbered"
                />
                <TralloInput
                  label="Quantidade"
                  type="number"
                  onChange={(val) =>
                    setFormData({ ...formData, quantity: parseInt(val) || 0 })
                  }
                  icon="pin"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <TralloButton
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowPopup(false)}
                >
                  Voltar
                </TralloButton>
                <TralloButton className="flex-1" onClick={addToAddedList}>
                  Confirmar
                </TralloButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default RegisterEntry;
