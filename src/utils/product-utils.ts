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

export const validateRequiredFields = (
    fields: any[],
    values: Record<string, any>
): { isValid: boolean; missingField?: string } => {
    for (const field of fields) {
        const isRequired = field.required !== false;
        const value = values[field.name];

        if (isRequired) {
            if (value === undefined || value === null || String(value).trim() === "") {
                return { isValid: false, missingField: field.label };
            }
        }
    }
    return { isValid: true };
};