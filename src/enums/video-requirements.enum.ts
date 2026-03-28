export enum ProductCategory {
    ELECTRONICS = 'ELECTRONICS',
    PHONES_AND_ACCESSORIES = 'PHONES_AND_ACCESSORIES',
    COMPUTERS_AND_IT = 'COMPUTERS_AND_IT',
    HOME_APPLIANCES = 'HOME_APPLIANCES',
    FASHION_MEN = 'FASHION_MEN',
    FASHION_WOMEN = 'FASHION_WOMEN',
    FASHION_KIDS = 'FASHION_KIDS',
    SHOES = 'SHOES',
    ACCESSORIES = 'ACCESSORIES',
    BEAUTY_AND_PERSONAL_CARE = 'BEAUTY_AND_PERSONAL_CARE',
    HEALTH_AND_WELLNESS = 'HEALTH_AND_WELLNESS',
    HOME_AND_FURNITURE = 'HOME_AND_FURNITURE',
    HOME_DECOR = 'HOME_DECOR',
    KITCHEN_AND_UTENSILS = 'KITCHEN_AND_UTENSILS',
    BABY_PRODUCTS = 'BABY_PRODUCTS',
    TOYS_AND_GAMES = 'TOYS_AND_GAMES',
    SPORTS_AND_FITNESS = 'SPORTS_AND_FITNESS',
    AUTOMOTIVE = 'AUTOMOTIVE',
    MOTORCYCLES_AND_PARTS = 'MOTORCYCLES_AND_PARTS',
    CONSTRUCTION_AND_TOOLS = 'CONSTRUCTION_AND_TOOLS',
    OFFICE_AND_STATIONERY = 'OFFICE_AND_STATIONERY',
}

const defaultRequirements = [
    "Demonstrar o produto em funcionamento real",
    "Mostrar detalhes de integridade física e estética",
    "Exibir etiquetas ou números de série",
    "Visão clara de 360º (frente, verso e laterais)",
];

export const CATEGORY_REQUIREMENTS: Record<ProductCategory, string[]> = {
    [ProductCategory.ELECTRONICS]: [
        "Ligar o aparelho e mostrar o sistema iniciando",
        "Testar botões físicos e entradas (USB, HDMI, etc)",
        "Mostrar número de série e selos de garantia",
        "Visão clara de 360º e estado da carcaça",
    ],
    [ProductCategory.PHONES_AND_ACCESSORIES]: [
        "Ligar a tela e mostrar o funcionamento do touch",
        "Mostrar saúde da bateria nas configurações (se possível)",
        "Exibir o IMEI (discar *#06#) ou número de série",
        "Mostrar lentes de câmera sem riscos e laterais",
    ],
    [ProductCategory.COMPUTERS_AND_IT]: [
        "Mostrar o computador ligado e funcionando",
        "Exibir especificações básicas na tela",
        "Testar portas de conexão e teclado/trackpad",
        "Mostrar estado das dobradiças e carcaça",
    ],
    [ProductCategory.FASHION_MEN]: [
        "Mostrar textura do tecido e costuras internas",
        "Exibir etiqueta de marca e composição",
        "Demonstrar zíperes, botões ou fechos",
        "Visão completa da peça (frente e verso)",
    ],
    [ProductCategory.FASHION_WOMEN]: [
        "Mostrar detalhes de bordados ou estampas",
        "Exibir etiqueta original e tamanho",
        "Demonstrar caimento e integridade do tecido",
        "Visão completa da peça (frente e verso)",
    ],
    [ProductCategory.SHOES]: [
        "Mostrar o estado das solas (desgaste)",
        "Exibir palmilhas e interior do calçado",
        "Focar em biqueiras e calcanhares",
        "Mostrar etiqueta de numeração original",
    ],
    [ProductCategory.HOME_APPLIANCES]: [
        "Mostrar o motor/aparelho funcionando",
        "Exibir estado interno (limpeza e integridade)",
        "Testar todos os ciclos ou velocidades",
        "Mostrar cabo de força e plugue",
    ],
    [ProductCategory.FASHION_KIDS]: defaultRequirements,
    [ProductCategory.ACCESSORIES]: defaultRequirements,
    [ProductCategory.BEAUTY_AND_PERSONAL_CARE]: defaultRequirements,
    [ProductCategory.HEALTH_AND_WELLNESS]: defaultRequirements,
    [ProductCategory.HOME_AND_FURNITURE]: defaultRequirements,
    [ProductCategory.HOME_DECOR]: defaultRequirements,
    [ProductCategory.KITCHEN_AND_UTENSILS]: defaultRequirements,
    [ProductCategory.BABY_PRODUCTS]: defaultRequirements,
    [ProductCategory.TOYS_AND_GAMES]: defaultRequirements,
    [ProductCategory.SPORTS_AND_FITNESS]: defaultRequirements,
    [ProductCategory.AUTOMOTIVE]: defaultRequirements,
    [ProductCategory.MOTORCYCLES_AND_PARTS]: defaultRequirements,
    [ProductCategory.CONSTRUCTION_AND_TOOLS]: defaultRequirements,
    [ProductCategory.OFFICE_AND_STATIONERY]: defaultRequirements,
};

export const getVideoRequirements = (category: string): string[] => {
    return CATEGORY_REQUIREMENTS[category as ProductCategory] || defaultRequirements;
};