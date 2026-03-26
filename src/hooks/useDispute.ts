import { useState } from "react";
import { disputeService } from "@/services/dispute.service";
import { orderService } from "@/services/order.service";
import { DisputeReason } from "@/enums/dispute.enums";
import toast from "react-hot-toast";

export const useDispute = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<{ productId: string; name: string } | null>(null);
    const [reason, setReason] = useState<DisputeReason | "">("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchOrderItems = async () => {
        if (!orderNumber.trim()) return;
        setIsLoading(true);
        try {
            const res = await orderService.getBuyerOrderProducts(orderNumber);
            if (res.data.items && res.data.items.length > 0) {
                setOrderItems(res.data.items);
                setIsModalOpen(true);
            } else {
                toast.error("Nenhum item encontrado para este pedido");
            }
        } catch (err) {
            toast.error(err.message || "Erro ao buscar pedido");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateDispute = async () => {
        if (!selectedProduct || !reason) return;

        setIsLoading(true);
        try {
            const res = await disputeService.createDispute({
                orderNumber,
                productId: selectedProduct.productId,
                reason: reason as DisputeReason,
                description,
            });

            if (res.success) {
                toast.success("Reclamação aberta com sucesso!");
                resetForm();
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            toast.error(err.message || "Erro ao processar");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setOrderNumber("");
        setSelectedProduct(null);
        setReason("");
        setDescription("");
        setOrderItems([]);
    };

    return {
        orderNumber, setOrderNumber,
        selectedProduct, setSelectedProduct,
        reason, setReason,
        description, setDescription,
        isLoading,
        orderItems,
        isModalOpen, setIsModalOpen,
        fetchOrderItems,
        handleCreateDispute,
        isFormValid: !!selectedProduct && !!reason && description.length >= 10
    };
};