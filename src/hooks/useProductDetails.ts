import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { searchBySlug } from "@/services/product.service";
import { dispatchService } from "@/services/dispatch.service";
import { checkoutFromProduct } from "@/services/checkout.service";
import { deliveryService } from "@/services/delivery.service";
import { SearchedProductDTO } from "@/types/product";
import { DispatchStatusResponseDto } from "@/dtos/dispatches";
import { PaymentMethod, PaymentMode } from "@/enums/payment";
import toast from "react-hot-toast";
import { UserRole } from "@/enums/user";

export const useProductDetails = () => {
    const { slug } = useParams<{ slug?: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const isBuyer = useMemo(() => {
        return isAuthenticated && user?.role ===  UserRole.BUYER;
    }, [isAuthenticated, user]);

    const [product, setProduct] = useState<SearchedProductDTO | null>(
        (location.state?.product as SearchedProductDTO) || null
    );
    const [dispatchStatus, setDispatchStatus] = useState<DispatchStatusResponseDto | null>(null);
    const [loading, setLoading] = useState(!product && !!slug);
    const [modalType, setModalType] = useState<"payment_choice" | "checkout" | "video" | "share" | null>(null);
    const [paymentType, setPaymentType] = useState<"online" | "presencial">("online");
    const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);

    const fetchFees = useCallback(async () => {
        if (!isBuyer) return;
        try {
            const res = await deliveryService.getMyShippingFee();
            if (res.success) {
                setDeliveryFee(res.data.shippingFee);
            } else {
                toast.error(res.message ?? "Erro ao buscar a taxa de entrega");
            }
        } catch (err: any) {
            toast.error(err.message ?? 'Erro ao buscar a taxa de entrega');
            console.error(err);
        }
    }, [isBuyer]);

    useEffect(() => {
        async function loadProduct() {
            if (product || !slug) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await searchBySlug(slug);
                if (response?.success) {
                    const data = Array.isArray(response.data) ? response.data[0] : response.data;
                    if (data) setProduct(data);
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [slug]);

    useEffect(() => {
        if (isBuyer) {
            fetchFees();
        }
    }, [isBuyer, fetchFees]);

    useEffect(() => {
        async function fetchDispatch() {
            if (product?.id && product.isDispatch) {
                try {
                    const response = await dispatchService.getStatus(product.id);
                    if (response?.success) {
                        setDispatchStatus(response.data);
                    }
                } catch (error) {
                    console.error("Erro ao carregar status do despacho:", error);
                }
            }
        }
        fetchDispatch();
    }, [product]);

    const pricing = useMemo(() => {
        const basePrice = dispatchStatus
            ? Number(dispatchStatus.currentPrice)
            : Number(product?.price || 0);

        const currentDeliveryFee = paymentType === "presencial" ? 0 : deliveryFee;
        const serviceFee = basePrice * 0.035;
        const total = basePrice + currentDeliveryFee + serviceFee;

        return {
            subtotal: basePrice,
            deliveryFee: currentDeliveryFee,
            serviceFee,
            total
        };
    }, [product, dispatchStatus, paymentType, deliveryFee]);

    const handleBuyClick = () => {
        if (!isAuthenticated) {
            navigate("/entrar");
            return;
        }

        if (product?.isDispatch) {
            setPaymentType("online");
            setModalType("checkout");
        } else {
            setModalType("payment_choice");
        }
    };

    const handleConfirmCheckout = async () => {
        if (isSubmitting || !isAuthenticated || !product) return;

        try {
            setIsSubmitting(true);

            const method = paymentMethod === "mcx"
                ? PaymentMethod.MULTICAIXA_EXPRESS
                : PaymentMethod.REFERENCE;

            let response;

            if (product.isDispatch) {
                response = await dispatchService.buyNow({
                    productId: product.id,
                    paymentMethod: method
                });
            } else {
                const mode = paymentType === "online"
                    ? PaymentMode.ONLINE_PAYMENT
                    : PaymentMode.ONSITE_PAYMENT;

                response = await checkoutFromProduct(product.id, {
                    paymentMode: mode,
                    paymentMethod: paymentType === "online" ? method : undefined,
                });
            }

            if (response?.success) {
                toast.success("Pedido realizado com sucesso.");
                navigate("/meus-pedidos", { state: { order: response.data } });
            } else {
                toast.error(response.message || "Erro ao processar checkout.");
            }
        } catch (error) {
            toast.error("Erro ao conectar com o servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        product,
        dispatchStatus,
        loading,
        modalType,
        setModalType,
        paymentType,
        setPaymentType,
        paymentMethod,
        setPaymentMethod,
        pricing,
        handleBuyClick,
        handleConfirmCheckout,
        user,
        isAuthenticated,
        isBuyer,
        navigate
    };
};