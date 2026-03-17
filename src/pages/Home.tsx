// @/pages/Home.tsx
import React, { useState, useMemo, useEffect } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import TralloInput from "@/components/TralloInput";
import FilterDrawer from "@/components/FilterDrawer";
import Pagination from "@/components/Pagination";
import TralloButton from "@/components/TralloButton";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";

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
  {
    id: "2",
    tag: "Nova Coleção",
    title: "Streetwear Urbano",
    description: "As tendências que definem a nova geração.",
    buttonText: "Descobrir",
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWNRSRV-vhDK_O-WwxrH4mER9ke5XEZdkhLjjGj7ZKpR4spPOICV9S2orOaCJEZ7vX4j639Y_5szAWdMUMv29XQ86s-83v_K5K35JGhSPv16yqJHjLT1FqWI499MkcY49u9PrEAf47-HEH-c6vel5-XZNB_yC8iMVQv8Ajcz7uyF7K02AA6DDN3QuuRejeEsOsQycQhip9eWEVNFTI7jbSVkxBTerZ1QBiYMYMX3kKB72p0NW7VV8SLXCioZq2zeXz6PHiI-wbO1w",
    backgroundColor: "#0f172a",
    tagColor: "bg-primary",
  },
  {
    id: "3",
    tag: "Exclusivo",
    title: "Kicks de Elite",
    description: "Stock limitado dos modelos mais desejados.",
    buttonText: "Ver Modelos",
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbLs-oQQ8uPfpiFlz5Vb7UiOi9wcT0EAXXGlEtLF5ph5vi3N_Dszys--bS4mLVO9DZl_GiEbIxKh3FnQTVn35xkXJ-m1ovS5_ftpH1svw0f6AdXIYFzbLi-u-uwSl5DvddJ6AS4VDwMHuSZi8QOBOrob8wnNf2yfAR1NWe4Zq1NY_BSmwbYdnfV66w8CXRlQrY8T5Xc2h4NQq46r0gJRSg7EEuxGmmN-2eVHn4XBtKY1Qkse5u6WwdGwI-NaX_-ilma79qBnKWcCjq",
    backgroundColor: "#ea580c",
    tagColor: "bg-black/20",
    buttonColor: "bg-white text-orange-600",
  },
];

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-500">
    <div className="size-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
      <span className="material-symbols-outlined text-5xl text-muted-foreground">
        search_off
      </span>
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
      Nenhum produto encontrado
    </h3>
    <p className="text-muted-foreground max-w-xs mx-auto">
      Não conseguimos encontrar o que procuras. Tenta escrever de outra forma ou
      ver os filtros que aplicaste.
    </p>
  </div>
);

const Home: React.FC = () => {
  const { user } = useAuth();
  const { addProduct } = useCart();
  const { products, loading, fetchProducts } = useProducts();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSearch, setTempSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const isSeller = user?.role === "SELLER";

  useEffect(() => {
    fetchProducts({ search: searchQuery || undefined });
  }, [searchQuery, fetchProducts]);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const handleSearchClick = () => {
    setSearchQuery(tempSearch);
    setCurrentPage(1);
  };

  const handleSearchWithFilters = (filters: any) => {
    fetchProducts({ search: searchQuery || undefined, ...filters });
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters: any) => {
    handleSearchWithFilters(filters);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = async (productId: string) => {
    if (isSeller) return;
    await addProduct(productId);
  };

  return (
    <MobileLayout>
      <Header />

      <main className="mt-2 pb-14">
        <div className="px-4 md:px-6 lg:px-8 pt-4">
          <div className="relative max-w-[75.5rem] mx-auto animate-in fade-in slide-in-from-top-2 duration-700">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1 group">
                <TralloInput
                  label=""
                  placeholder="O que procuras hoje?"
                  className="mb-0"
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") handleSearchClick();
                  }}
                />
                <button
                  onClick={() => setIsFilterOpen(true)}
                  type="button"
                  className="absolute right-2 top-[50%] -translate-y-1/2 size-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    tune
                  </span>
                </button>
              </div>
              <TralloButton
                className="h-[52px] w-[52px] md:w-auto px-0 md:px-6 flex items-center justify-center"
                onClick={handleSearchClick}
              >
                <span className="material-symbols-outlined md:hidden">
                  search
                </span>
                <span className="hidden md:inline">Pesquisar</span>
              </TralloButton>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-5 lg:px-5 py-4">
          <Carousel slides={carouselSlides} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 py-4">
          {loading ? (
            <Loader />
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={!isSeller ? handleAddToCart : undefined}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="px-4 md:px-6 lg:px-8 py-8">
          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex items-center justify-between overflow-hidden relative border border-white/40 shadow-[0_8px_32px_0_rgba(108,62,248,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C3EF8]/10 rounded-full blur-[50px] -mr-10 -mt-10" />
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#6C3EF8]/10 text-[#6C3EF8] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-[#6C3EF8]/10">
                  Experiência Trallo
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 leading-tight text-slate-900 dark:text-white">
                Compras Inteligentes, <br />
                <span className="text-[#6C3EF8]">Entrega Veloz.</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-[220px] md:max-w-none font-medium">
                A melhor curadoria de produtos com a segurança que só o Trallo
                oferece.
              </p>
              <button className="bg-[#6C3EF8] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group hover:shadow-lg hover:shadow-[#6C3EF8]/30 transition-all active:scale-95">
                Ver Novidades
                <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">
                  local_mall
                </span>
              </button>
            </div>
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white/40 to-[#6C3EF8]/10 rounded-[2rem] flex items-center justify-center border border-white/50 backdrop-blur-2xl rotate-6 shadow-xl">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-[#6C3EF8] animate-pulse">
                auto_awesome
              </span>
            </div>
          </div>
        </div>
      </main>

      {products.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        onSearch={handleSearchWithFilters}
      />

      <BottomNavigation />
    </MobileLayout>
  );
};

export default Home;
