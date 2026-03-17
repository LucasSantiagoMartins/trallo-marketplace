import { PRODUCT_CATEGORY_FIELDS, DynamicField } from "@/constants/product-fields";
import { ProductCategory } from "@/enums/product-category.enum";

export function getFieldsByCategory(category: ProductCategory): DynamicField[] {
    return PRODUCT_CATEGORY_FIELDS[category] || [];
}

export function formatDynamicSpecs(specs: Record<string, any>): string {
    return Object.entries(specs)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
}