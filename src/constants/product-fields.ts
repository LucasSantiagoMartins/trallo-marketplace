import { ProductCategory } from "@/enums/product-category.enum";

export interface DynamicField {
    name: string;
    label: string;
    placeholder: string;
    type: "text" | "number" | "select";
    required?: boolean;
    options?: string[];
}

export const PRODUCT_CATEGORY_FIELDS: Record<ProductCategory, DynamicField[]> = {
    [ProductCategory.ELECTRONICS]: [
        { name: "brand", label: "Marca", placeholder: "Ex: Sony, Samsung", type: "text" },
        { name: "model", label: "Modelo", placeholder: "Ex: WH-1000XM4", type: "text" },
        { name: "voltage", label: "Voltagem", placeholder: "Ex: 110V, 220V, Bivolt", type: "text", required: false }
    ],
    [ProductCategory.PHONES_AND_ACCESSORIES]: [
        { name: "brand", label: "Marca", placeholder: "Ex: Apple, Xiaomi", type: "text" },
        { name: "storage", label: "Capacidade", placeholder: "Ex: 128GB, 256GB", type: "text" },
        { name: "ram", label: "Memória RAM", placeholder: "Ex: 8GB", type: "text", required: false },
        { name: "color", label: "Cor", placeholder: "Ex: Grafite", type: "text", required: false },
    ],
    [ProductCategory.COMPUTERS_AND_IT]: [
        { name: "processor", label: "Processador", placeholder: "Ex: Intel i7, M2", type: "text" },
        { name: "ram", label: "Memória RAM", placeholder: "Ex: 16GB", type: "text" },
        { name: "storage", label: "Disco (SSD/HDD)", placeholder: "Ex: 512GB SSD", type: "text" },
        { name: "gpu", label: "Placa de Vídeo", placeholder: "Ex: RTX 3060", type: "text", required: false },
    ],
    [ProductCategory.HOME_APPLIANCES]: [
        { name: "capacity", label: "Capacidade", placeholder: "Ex: 400L, 10kg", type: "text" },
        { name: "voltage", label: "Voltagem", placeholder: "110V, 220V, Bivolt", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Brastemp, LG", type: "text" },
        { name: "energy_rating", label: "Selo Procel", placeholder: "Ex: A, B, C", type: "text", required: false },
    ],
    [ProductCategory.FASHION_MEN]: [
        { name: "size", label: "Tamanho", placeholder: "Ex: P, M, G, 42", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Preto", type: "text" },
        { name: "material", label: "Material", placeholder: "Ex: Algodão", type: "text", required: false },
        { name: "brand", label: "Marca", placeholder: "Ex: Nike", type: "text", required: false },
    ],
    [ProductCategory.FASHION_WOMEN]: [
        { name: "size", label: "Tamanho", placeholder: "Ex: P, M, 38", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Rosa", type: "text" },
        { name: "material", label: "Material", placeholder: "Ex: Seda, Jeans", type: "text", required: false },
        { name: "brand", label: "Marca", placeholder: "Ex: Zara", type: "text", required: false },
    ],
    [ProductCategory.FASHION_KIDS]: [
        { name: "age_group", label: "Faixa Etária", placeholder: "Ex: 2-4 anos", type: "text" },
        { name: "size", label: "Tamanho", placeholder: "Ex: 4, 6, 8", type: "text" },
        { name: "material", label: "Material", placeholder: "Ex: Algodão", type: "text", required: false },
        { name: "brand", label: "Marca", placeholder: "Ex: Lilica", type: "text", required: false },
    ],
    [ProductCategory.SHOES]: [
        { name: "size", label: "Número", placeholder: "Ex: 40", type: "number" },
        { name: "material", label: "Material", placeholder: "Ex: Couro", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Branco", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Adidas", type: "text", required: false },
    ],
    [ProductCategory.ACCESSORIES]: [
        { name: "material", label: "Material", placeholder: "Ex: Prata 925, Aço", type: "text" },
        { name: "type", label: "Tipo", placeholder: "Ex: Colar, Relógio", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Dourado", type: "text", required: false },
        { name: "brand", label: "Marca", placeholder: "Ex: Pandora", type: "text", required: false },
    ],
    [ProductCategory.BEAUTY_AND_PERSONAL_CARE]: [
        { name: "volume", label: "Volume/Peso", placeholder: "Ex: 50ml, 200g", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Natura", type: "text" },
        { name: "skin_type", label: "Tipo de Pele/Cabelo", placeholder: "Ex: Oleosa, Seco", type: "text", required: false },
        { name: "fragrance", label: "Fragrância", placeholder: "Ex: Amadeirado", type: "text", required: false },
    ],
    [ProductCategory.HEALTH_AND_WELLNESS]: [
        { name: "quantity", label: "Quantidade", placeholder: "Ex: 60 Cápsulas", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Growth", type: "text" },
        { name: "flavor", label: "Sabor", placeholder: "Ex: Chocolate", type: "text", required: false },
        { name: "goal", label: "Objetivo", placeholder: "Ex: Hipertrofia", type: "text", required: false },
    ],
    [ProductCategory.HOME_AND_FURNITURE]: [
        { name: "material", label: "Material", placeholder: "Ex: Madeira, MDF", type: "text" },
        { name: "dimensions", label: "Dimensões", placeholder: "Ex: 150x60x80cm", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Marrom", type: "text", required: false },
        { name: "assembly", label: "Montagem Inclusa?", placeholder: "Ex: Sim/Não", type: "text", required: false },
    ],
    [ProductCategory.HOME_DECOR]: [
        { name: "material", label: "Material", placeholder: "Ex: Cerâmica, Vidro", type: "text" },
        { name: "color", label: "Cor", placeholder: "Ex: Amarelo", type: "text" },
        { name: "style", label: "Estilo", placeholder: "Ex: Moderno, Rústico", type: "text", required: false },
        { name: "dimensions", label: "Tamanho", placeholder: "Ex: 30x30cm", type: "text", required: false },
    ],
    [ProductCategory.KITCHEN_AND_UTENSILS]: [
        { name: "material", label: "Material", placeholder: "Ex: Inox, Teflon", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Tramontina", type: "text" },
        { name: "pieces", label: "Peças", placeholder: "Ex: Jogo de 5 peças", type: "text", required: false },
        { name: "dishwasher_safe", label: "Lava-louças?", placeholder: "Ex: Sim", type: "text", required: false },
    ],
    [ProductCategory.BABY_PRODUCTS]: [
        { name: "age_range", label: "Idade Recomendada", placeholder: "Ex: 0-6 meses", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Chicco", type: "text" },
        { name: "material", label: "Material", placeholder: "Ex: Livre de BPA", type: "text", required: false },
        { name: "safety_certification", label: "Selo Inmetro", placeholder: "Ex: Sim", type: "text", required: false },
    ],
    [ProductCategory.TOYS_AND_GAMES]: [
        { name: "min_age", label: "Idade Mínima", placeholder: "Ex: 3 anos", type: "number" },
        { name: "brand", label: "Fabricante", placeholder: "Ex: Estrela, LEGO", type: "text" },
        { name: "players", label: "Jogadores", placeholder: "Ex: 2-4", type: "text", required: false },
        { name: "category", label: "Sub-categoria", placeholder: "Ex: Tabuleiro, Boneco", type: "text", required: false },
    ],
    [ProductCategory.SPORTS_AND_FITNESS]: [
        { name: "sport", label: "Esporte", placeholder: "Ex: Musculação, Yoga", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Speedo", type: "text" },
        { name: "weight", label: "Peso/Carga", placeholder: "Ex: 10kg", type: "text", required: false },
        { name: "material", label: "Material", placeholder: "Ex: Neoprene", type: "text", required: false },
    ],
    [ProductCategory.AUTOMOTIVE]: [
        { name: "year", label: "Ano", placeholder: "Ex: 2022", type: "number" },
        { name: "mileage", label: "KM", placeholder: "Ex: 50000", type: "number" },
        { name: "fuel", label: "Combustível", placeholder: "Ex: Flex", type: "text" },
        { name: "transmission", label: "Câmbio", placeholder: "Ex: Automático", type: "text", required: false },
    ],
    [ProductCategory.MOTORCYCLES_AND_PARTS]: [
        { name: "cc", label: "Cilindradas", placeholder: "Ex: 250cc", type: "number" },
        { name: "year", label: "Ano", placeholder: "Ex: 2021", type: "number" },
        { name: "brand", label: "Marca", placeholder: "Ex: Honda, Yamaha", type: "text" },
        { name: "part_type", label: "Tipo de Peça", placeholder: "Ex: Escapamento", type: "text", required: false },
    ],
    [ProductCategory.CONSTRUCTION_AND_TOOLS]: [
        { name: "power_source", label: "Alimentação", placeholder: "Ex: Bateria 18V, Cabo", type: "text" },
        { name: "brand", label: "Marca", placeholder: "Ex: Bosch, DeWalt", type: "text" },
        { name: "usage", label: "Uso", placeholder: "Ex: Profissional, Hobby", type: "text", required: false },
        { name: "voltage", label: "Voltagem", placeholder: "Ex: 220V", type: "text", required: false },
    ],
    [ProductCategory.OFFICE_AND_STATIONERY]: [
        { name: "brand", label: "Marca", placeholder: "Ex: Faber-Castell", type: "text" },
        { name: "type", label: "Tipo", placeholder: "Ex: Escrita, Organização", type: "text" },
        { name: "quantity", label: "Quantidade/Pack", placeholder: "Ex: 12 unidades", type: "text", required: false },
        { name: "color", label: "Cor Principal", placeholder: "Ex: Colorido", type: "text", required: false },
    ],
};

export const getLabelByFieldName = (name: string, category?: ProductCategory): string => {
    if (category && PRODUCT_CATEGORY_FIELDS[category]) {
        const field = PRODUCT_CATEGORY_FIELDS[category].find((f) => f.name === name);
        if (field) return field.label;
    }

    for (const fields of Object.values(PRODUCT_CATEGORY_FIELDS)) {
        const field = fields.find((f) => f.name === name);
        if (field) return field.label;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
};