import { ProductCategory } from "@/enums/product-category.enum";

export const productCategoryLabel: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: "Eletrónicos",
    [ProductCategory.PHONES_AND_ACCESSORIES]: "Telemóveis e Acessórios",
    [ProductCategory.COMPUTERS_AND_IT]: "Computadores e Informática",
    [ProductCategory.HOME_APPLIANCES]: "Eletrodomésticos",
    [ProductCategory.FASHION_MEN]: "Moda Masculina",
    [ProductCategory.FASHION_WOMEN]: "Moda Feminina",
    [ProductCategory.FASHION_KIDS]: "Moda Infantil",
    [ProductCategory.SHOES]: "Calçado",
    [ProductCategory.ACCESSORIES]: "Acessórios de Moda",
    [ProductCategory.BEAUTY_AND_PERSONAL_CARE]: "Beleza e Cuidados Pessoais",
    [ProductCategory.HEALTH_AND_WELLNESS]: "Saúde e Bem-estar",
    [ProductCategory.HOME_AND_FURNITURE]: "Casa e Mobiliário",
    [ProductCategory.HOME_DECOR]: "Decoração",
    [ProductCategory.KITCHEN_AND_UTENSILS]: "Cozinha e Utensílios",
    [ProductCategory.BABY_PRODUCTS]: "Produtos para Bebé",
    [ProductCategory.TOYS_AND_GAMES]: "Brinquedos e Jogos",
    [ProductCategory.SPORTS_AND_FITNESS]: "Desporto e Fitness",
    [ProductCategory.AUTOMOTIVE]: "Automóvel",
    [ProductCategory.MOTORCYCLES_AND_PARTS]: "Motociclos e Peças",
    [ProductCategory.CONSTRUCTION_AND_TOOLS]: "Construção e Ferramentas",
    [ProductCategory.OFFICE_AND_STATIONERY]: "Escritório e Papelaria",
};

export const productCategoryColor: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: "bg-blue-500/10 text-blue-600",
    [ProductCategory.PHONES_AND_ACCESSORIES]: "bg-cyan-500/10 text-cyan-600",
    [ProductCategory.COMPUTERS_AND_IT]: "bg-indigo-500/10 text-indigo-600",
    [ProductCategory.HOME_APPLIANCES]: "bg-slate-500/10 text-slate-600",
    [ProductCategory.FASHION_MEN]: "bg-orange-500/10 text-orange-600",
    [ProductCategory.FASHION_WOMEN]: "bg-pink-500/10 text-pink-600",
    [ProductCategory.FASHION_KIDS]: "bg-yellow-500/10 text-yellow-600",
    [ProductCategory.SHOES]: "bg-amber-500/10 text-amber-600",
    [ProductCategory.ACCESSORIES]: "bg-teal-500/10 text-teal-600",
    [ProductCategory.BEAUTY_AND_PERSONAL_CARE]: "bg-rose-500/10 text-rose-600",
    [ProductCategory.HEALTH_AND_WELLNESS]: "bg-emerald-500/10 text-emerald-600",
    [ProductCategory.HOME_AND_FURNITURE]: "bg-brown-500/10 text-brown-600",
    [ProductCategory.HOME_DECOR]: "bg-violet-500/10 text-violet-600",
    [ProductCategory.KITCHEN_AND_UTENSILS]: "bg-orange-600/10 text-orange-700",
    [ProductCategory.BABY_PRODUCTS]: "bg-sky-500/10 text-sky-600",
    [ProductCategory.TOYS_AND_GAMES]: "bg-purple-500/10 text-purple-600",
    [ProductCategory.SPORTS_AND_FITNESS]: "bg-red-500/10 text-red-600",
    [ProductCategory.AUTOMOTIVE]: "bg-gray-700/10 text-gray-700",
    [ProductCategory.MOTORCYCLES_AND_PARTS]: "bg-zinc-500/10 text-zinc-600",
    [ProductCategory.CONSTRUCTION_AND_TOOLS]: "bg-stone-500/10 text-stone-600",
    [ProductCategory.OFFICE_AND_STATIONERY]: "bg-blue-400/10 text-blue-500",
};

export function getProductCategoryLabel(category: ProductCategory): string {
    return productCategoryLabel[category] || category;
}

export function getProductCategoryColor(category: ProductCategory): string {
    return productCategoryColor[category] || "bg-gray-500/10 text-gray-500";
}