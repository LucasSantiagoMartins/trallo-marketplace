import React from "react";
import PageHeader from "@/components/PageHeader";
import CartItemCard from "@/components/CartItemCard";
import CartTotalPanel from "@/components/CartTotalPanel";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";
import EmptyState from "@/components/EmptyState";
import ConfirmAction from "@/components/ConfirmAction";
import LoaderAnimation from "@/components/Loader";
import { useCartPage } from "@/hooks/useCartPage";

const CartPage: React.FC = () => {
  const {
    loading,
    formattedItems,
    modalType,
    setModalType,
    paymentType,
    setPaymentType,
    paymentMethod,
    setPaymentMethod,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
    updateQty,
    handleOpenRemoveModal,
    handleConfirmAction,
    handleConfirmCheckout,
    closeModal,
    isClearingAll,
  } = useCartPage();

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-60">
      <PageHeader
        title="Carrinho"
        rightElement={
          formattedItems.length > 0 && (
            <button
              onClick={() => setModalType("all")}
              className="text-[#6d3ff8] font-bold text-sm px-2"
            >
              Limpar
            </button>
          )
        }
        backTo="/"
      />

      <main className="px-4 pt-24 space-y-4 max-w-3xl mx-auto">
        {loading && formattedItems.length === 0 ? (
          <LoaderAnimation />
        ) : formattedItems.length > 0 ? (
          formattedItems.map((item) => (
            <div
              key={item.id}
              className="animate-in fade-in zoom-in-95 duration-300"
            >
              <CartItemCard
                item={item}
                onUpdateQty={updateQty}
                onRemove={handleOpenRemoveModal}
              />
            </div>
          ))
        ) : (
          <div className="animate-in fade-in duration-500 pt-10">
            <EmptyState
              icon="shopping_cart"
              title="Teu carrinho está vazio"
              description="Parece que ainda não adicionaste nenhum produto ao teu carrinho."
            />
          </div>
        )}
      </main>

      {formattedItems.length > 0 && !modalType && !loading && (
        <CartTotalPanel
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          serviceFee={serviceFee}
          total={total}
          onCheckout={() => setModalType("payment_choice")}
        />
      )}

      {modalType === "payment_choice" && (
        <div className="fixed inset-0 z-[80] animate-in fade-in duration-200">
          <PaymentChoiceModal
            onClose={closeModal}
            onSelect={(type) => {
              setPaymentType(type);
              setModalType("checkout");
            }}
          />
        </div>
      )}

      {modalType === "checkout" && (
        <CheckoutModal
          paymentType={paymentType}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          subtotal={subtotal}
          total={total}
          onClose={closeModal}
          onConfirm={handleConfirmCheckout}
        />
      )}

      <ConfirmAction
        isLoading={false}
        description={
          isClearingAll ? "irá limpar todos os itens" : "item será removido"
        }
        title={isClearingAll ? "Limpar carrinho?" : "Remover item?"}
        confirmText={isClearingAll ? "limpar" : "remover"}
        isOpen={modalType === "single" || modalType === "all"}
        onConfirm={handleConfirmAction}
        onClose={closeModal}
      />
    </div>
  );
};

export default CartPage;
