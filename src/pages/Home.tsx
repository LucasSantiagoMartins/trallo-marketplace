import React, { useState, useMemo, useEffect } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import TralloInput from "@/components/TralloInput";
import FilterDrawer from "@/components/FilterDrawer";
import { BASE_UPLOAD_URL, BASE_URL, endpoints } from "@/api/endpoints";

// Slides do Carousel permanecem estáticos por enquanto
const carouselSlides = [
  {
    id: "1",
    tag: "Flash Sale",
    title: "Upgrade na Tua Tech",
    description: "Até 40% de desconto em marcas selecionadas.",
    buttonText: "Comprar Agora",
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqBKnC1iFzRCrpxblgAR9g7ApfnIcuxXVrJqPuUmiGkvCHHK4R0OfN3CeYPpladZr4dZ5MPx7dM9jrAdCMPP7xrsn97fEBVT-E64HHy7IVn2WfddoP0oQO2WQMXClIhkk-I_znqZYzXZsrqVPbe7wYpuOJYY-ybDsUUOFhA1dv4sYWMvLyy3S5gyJQTHQKkVQAb0CY3xrYTgvjQfbPBY3-vEThDYfpAMJ_rj9JRQ-n61NKrneUuWVayiH0YuZckjcLFpLx3eVD5-t0",
    backgroundColor: "hsl(262 91% 61% / 0.9)",
    tagColor: "bg-white/20",
  },
  // ... outros slides
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Função para buscar dados do Backend
  const fetchProducts = async (name?: string) => {
    try {
      setLoading(true);
      // Construindo a URL com query params para o SearchProductsDto do NestJS
      let url = `${BASE_URL}${endpoints.products.search}`;
      if (name) {
        url += `?name=${encodeURIComponent(name)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar produtos");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregamento inicial
  useEffect(() => {
    fetchProducts();
  }, []);

  // Lógica de Bloqueio de Scroll
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  // Filtro de categoria (Local ou via API se preferir)
  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <MobileLayout showBottomNav>
      <Header />

      <main className="mt-2 pb-24">
        {/* Barra de Pesquisa */}
        <div className="px-4 md:px-6 lg:px-8 pt-4">
          <div className="relative max-w-[75.5rem] mx-auto">
            <div className="relative group">
              <TralloInput
                label=""
                placeholder="O que procuras hoje?"
                icon="search"
                className="mb-0"
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                // Opcional: Adicionar busca ao pressionar Enter ou via botão
                // onKeyDown={(e: any) =>
                //   e.key === "Enter" && fetchProducts(searchTerm)
                // }
              />
              <button
                onClick={() => setIsFilterOpen(true)}
                type="button"
                className="absolute right-2 top-[50%] -translate-y-1/2 size-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-xl">tune</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-5 lg:px-5 py-4">
          <Carousel slides={carouselSlides} />
        </div>

        {/* Grid de Produtos Dinâmico */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-6 lg:px-8 py-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                // O backend retorna um array de imagens, pegamos a primeira (posição 0)
                image={
                  product.images && product.images.length > 0
                    ? `${BASE_UPLOAD_URL}${product.images[0].url}`
                    : "/placeholder-product.png"
                }
                category={product.category || "Geral"}
                name={product.name}
                price={product.price}
                onAddToCart={() => console.log(`Add to cart: ${product.id}`)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              Nenhum produto encontrado.
            </div>
          )}
        </div>

        {/* Banner Marcas Locais */}
        <div className="px-4 md:px-6 lg:px-8 py-8">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex items-center justify-between overflow-hidden relative border border-white/5 shadow-2xl">
            {/* ... conteúdo do banner ... */}
            <div className="relative z-10 flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Marcas Locais
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mb-4">
                Descobre o melhor do Made in Angola
              </p>
              <button className="text-primary text-sm font-bold flex items-center gap-1 group">
                Explorar agora
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
              <span className="material-symbols-outlined text-4xl md:text-5xl text-primary/80">
                verified_user
              </span>
            </div>
          </div>
        </div>
      </main>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <BottomNavigation />
    </MobileLayout>
  );
};

export default Home;
