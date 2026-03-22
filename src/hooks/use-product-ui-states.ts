import { useState, useEffect } from "react";

export const useProductUiStates = () => {
    const [showConditionModal, setShowConditionModal] = useState(false);
    const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
    const [isClosingCategory, setIsClosingCategory] = useState(false);
    const [isClosingCondition, setIsClosingCondition] = useState(false);
    const [isOpeningCategory, setIsOpeningCategory] = useState(false);
    const [isOpeningCondition, setIsOpeningCondition] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showConditionModal || showCategoryDrawer ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [showConditionModal, showCategoryDrawer]);

    const openCategory = () => {
        setShowCategoryDrawer(true);
        setIsOpeningCategory(true);
        setTimeout(() => setIsOpeningCategory(false), 10);
    };

    const openCondition = () => {
        setShowConditionModal(true);
        setIsOpeningCondition(true);
        setTimeout(() => setIsOpeningCondition(false), 10);
    };

    const closeCategory = () => {
        setIsClosingCategory(true);
        setTimeout(() => {
            setShowCategoryDrawer(false);
            setIsClosingCategory(false);
        }, 500);
    };

    const closeCondition = () => {
        setIsClosingCondition(true);
        setTimeout(() => {
            setShowConditionModal(false);
            setIsClosingCondition(false);
        }, 500);
    };

    return {
        states: { showConditionModal, showCategoryDrawer, isClosingCategory, isClosingCondition, isOpeningCategory, isOpeningCondition },
        actions: { openCategory, openCondition, closeCategory, closeCondition }
    };
};