import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/use-cart";
import {
    updateCartItemQuantity,
    removeFromCart,
    clearCart
} from "@/services/cart.service";
import { checkoutFromCart } from "@/services/checkout.service";
import { PaymentMethod, PaymentMode } from "@/enums/payment";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { CartItemDto } from "@/dtos/cart";
import { deliveryService } from "@/services/delivery.service";

export const useCartPage = () => {
    const navigate = useNavigate();
    const { items: rawItems, loading, fetchCart, syncCartWithServer } = useCart();

    const [modalType, setModalType] = useState<"single" | "all" | "payment_choice" | "checkout" | null>(null);
    const [idToRemove, setIdToRemove] = useState<string | null>(null);
    const [paymentType, setPaymentType] = useState<"online" | "presencial">("online");
    const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");
    const [deliveryFee, setDeliveryFee] = useState<number>(0);

    const fetchFees = useCallback(async () => {
        try {
            const res = await deliveryService.getMyShippingFee();
            if (res.success) {
                setDeliveryFee(res.data.shippingFee);
            } else {
                toast.error(res.message ?? "Ocorreu um erro ao buscar a taxa de entrega")
            }
        } catch (err) {
            toast.error(err.message ?? 'Ocorreu um erro ao buscar a taxa de entrega')
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchCart();
        fetchFees();
    }, [fetchCart, fetchFees]);

    const formattedItems: CartItemDto[] = rawItems
        .map((item: any) => ({
            id: item.id,
            name: item.product.name,
            attr: item.product.description,
            price: item.priceSnapshot,
            qty: item.quantity,
            image: `${BASE_UPLOAD_URL}/${item.product.coverImage}`,
            availableQuantity: item.product.availableQuantity,
        }))
        .sort((a, b) => a.id.localeCompare(b.id));

    const updateQty = async (id: string, delta: number) => {
        const item = formattedItems.find((i) => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.qty + delta);
        const res = await updateCartItemQuantity(id, newQty);
        if (res.success) syncCartWithServer();
        else toast.error(res.message || "Erro ao atualizar quantidade.");
    };

    const handleOpenRemoveModal = (id: string) => {
        setIdToRemove(id);
        setModalType("single");
    };

    const handleConfirmAction = async () => {
        try {
            if (modalType === "single" && idToRemove) {
                const res = await removeFromCart(idToRemove);
                if (res.success) {
                    syncCartWithServer();
                    toast.success("Item removido.");
                }
            } else if (modalType === "all") {
                const res = await clearCart();
                if (res.success) {
                    syncCartWithServer();
                    toast.success("Carrinho limpo.");
                }
            }
        } catch (error) {
            toast.error("Ocorreu um erro na operação.");
        }
        closeModal();
    };

    const handleConfirmCheckout = async () => {
        try {
            const mode = paymentType === "online" ? PaymentMode.ONLINE_PAYMENT : PaymentMode.ONSITE_PAYMENT;
            let method;
            if (paymentType === "online") {
                method = paymentMethod === "mcx" ? PaymentMethod.MULTICAIXA_EXPRESS : PaymentMethod.REFERENCE;
            }
            const response = await checkoutFromCart({ paymentMode: mode, paymentMethod: method });
            if (response?.success) {
                toast.success("Pedido realizado com sucesso.");
                syncCartWithServer();
                navigate("/meus-pedidos", { state: { order: response.data } });
            } else {
                toast.error(response.message || "Erro ao processar o pedido.");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao finalizar checkout.");
        }
    };

    const closeModal = () => {
        setModalType(null);
        setIdToRemove(null);
    };

    const subtotal = formattedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const currentDeliveryFee = paymentType === "presencial" ? 0 : deliveryFee;
    const serviceFee = subtotal * 0.035;
    const total = subtotal + currentDeliveryFee + serviceFee;

    return {
        loading,
        formattedItems,
        modalType,
        setModalType,
        paymentType,
        setPaymentType,
        paymentMethod,
        setPaymentMethod,
        subtotal,
        deliveryFee: currentDeliveryFee,
        serviceFee,
        total,
        updateQty,
        handleOpenRemoveModal,
        handleConfirmAction,
        handleConfirmCheckout,
        closeModal,
        isClearingAll: modalType === "all"
    };
};