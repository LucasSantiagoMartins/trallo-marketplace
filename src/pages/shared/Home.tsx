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
import LoaderAnimation from "@/components/Loader";
import {
  SlidersHorizontal,
  Search,
  SearchX,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { carouselSlides } from "@/constants/carousel-slides";

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

  const handleApplyFilters = (filters: any) => {
    fetchProducts({
      search: tempSearch || undefined,
      ...filters,
    });
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  const handleSearchWithFilters = (filters: any) => {
    fetchProducts({
      search: tempSearch || undefined,
      ...filters,
    });
    setIsFilterOpen(false);
    setCurrentPage(1);
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
                  className="absolute right-2 top-[50%] -translate-y-1/2 size-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>
              <TralloButton
                className="h-[52px] w-[52px] md:w-auto px-0 md:px-6 flex items-center justify-center"
                onClick={handleSearchClick}
              >
                <span className="md:hidden">
                  <Search size={20} />
                </span>
                <span className="hidden md:inline font-bold">Pesquisar</span>
              </TralloButton>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-5 lg:px-5 py-4">
          <Carousel slides={carouselSlides} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6 lg:px-8 py-4 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <LoaderAnimation />
            </div>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={!isSeller ? handleAddToCart : undefined}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-full mb-4">
                <SearchX size={48} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Não encontramos resultados para a sua busca. Tente usar termos
                mais genéricos ou remover filtros.
              </p>
            </div>
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
              <button className="bg-[#6C3EF8] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group hover:shadow-lg hover:shadow-[#6C3EF8]/30 transition-all active:scale-95">
                Ver Novidades
                <ShoppingBag
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
              </button>
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