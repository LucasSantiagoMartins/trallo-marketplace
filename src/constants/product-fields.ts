import { ProductCategory } from "@/enums/product-category.enum";

export interface DynamicField {
    name: string;
    label: string;
    placeholder: string;
    type: "text" | "number" | "select";
    options?: string[];
}

export const PRODUCT_CATEGORY_FIELDS: Record<ProductCategory, DynamicField[]> = {
    [ProductCategory.ELECTRONICS]: [
        { name: "brand", label: "Marca", placeholder: "Ex: Sony, Samsung", type: "text" },
        { name: "model", label: "Modelo", placeholder: "Ex: WH-1000XM4", type: "text" },
        { name: "voltage", label: "Voltagem", placeholder: "Ex: 110V, 220V, Bivolt", type: "text" },
        { name: "warranty", label: "Garantia (meses)", placeholder: "Ex: 12", type: "number" },
    ],
    [ProductCategory.PHONES_AND_ACCESSORIES]: [
        { name: "brand", label: "Marca", placeholder: "Ex: Apple, Xiaomi", type: "text" },
        { name: "storage", label: "Armazenamento", placeholder: "Ex: 128GB, 256GB", type: "text" },
        { name: "ram", label: "Memória RAM", placeholder: "Ex: 8GB", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Grafite, Prateado", type: "text" },
    ],
    [ProductCategory.COMPUTERS_AND_IT]: [
        { name: "processor", label: "Processador", placeholder: "Ex: Intel i7, M2", type: "text" },
        { name: "ram", label: "Memória RAM", placeholder: "Ex: 16GB", type: "text" },
        { name: "storage", label: "Disco (SSD/HDD)", placeholder: "Ex: 512GB SSD", type: "text" },
        { name: "gpu", label: "Placa de Vídeo", placeholder: "Ex: RTX 3060", type: "text" },
    ],
    [ProductCategory.FASHION_MEN]: [
        { name: "size", label: "Tamanho", placeholder: "Ex: S, M, L, XL", type: "text" },
        { name: "material", label: "Material", placeholder: "Ex: Algodão, Linho", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Azul Marinho", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Nike, Zara", type: "text" },
    ],
    [ProductCategory.SHOES]: [
        { name: "size", label: "Número/Tamanho", placeholder: "Ex: 42", type: "number" },
        { name: "material", label: "Material", placeholder: "Ex: Couro, Sintético", type: "text" },
        { name: "type", label: "Tipo", placeholder: "Ex: Desportivo, Formal", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Preto", type: "text" },
    ],
    [ProductCategory.AUTOMOTIVE]: [
        { name: "year", label: "Ano", placeholder: "Ex: 2022", type: "number" },
        { name: "mileage", label: "Quilometragem", placeholder: "Ex: 50000", type: "number" },
        { name: "fuel", label: "Combustível", placeholder: "Ex: Gasolina, Diesel", type: "text" },
        { name: "transmission", label: "Transmissão", placeholder: "Ex: Automático", type: "text" },
    ],
    [ProductCategory.HOME_APPLIANCES]: [],
    [ProductCategory.FASHION_WOMEN]: [],
    [ProductCategory.FASHION_KIDS]: [],
    [ProductCategory.ACCESSORIES]: [],
    [ProductCategory.BEAUTY_AND_PERSONAL_CARE]: [],
    [ProductCategory.HEALTH_AND_WELLNESS]: [],
    [ProductCategory.HOME_AND_FURNITURE]: [],
    [ProductCategory.HOME_DECOR]: [],
    [ProductCategory.KITCHEN_AND_UTENSILS]: [],
    [ProductCategory.BABY_PRODUCTS]: [],
    [ProductCategory.TOYS_AND_GAMES]: [],
    [ProductCategory.SPORTS_AND_FITNESS]: [],
    [ProductCategory.MOTORCYCLES_AND_PARTS]: [],
    [ProductCategory.CONSTRUCTION_AND_TOOLS]: [],
    [ProductCategory.OFFICE_AND_STATIONERY]: [],
};