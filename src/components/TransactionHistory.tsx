import React, { useState, useEffect, useMemo } from "react";
import BottomNavigation from "./BottomNavigation";
import PageHeader from "./PageHeader";
import SummaryCard from "./SummaryCard";
import TransactionFilterModal from "./TransactionFilterModal";
import Pagination from "@/components/Pagination";
import MyTransactionCard from "@/components/MyTransactionCard";
import Loader from "./Loader";
import FilterButton from "@/components/FilterButton";
import { transactionService } from "@/services/transaction.service";
import { MyTransactionsResponseDTO } from "@/dtos/transaction";
import { formatPrice } from "@/utils/currency";
import TransactionGroup from "./TransationGroup";

const HistoryScreen: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MyTransactionsResponseDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [apiFilters, setApiFilters] = useState({
    type: "todas",
    status: "todos",
  });

  const [localFilters, setLocalFilters] = useState({
    type: "todas",
    status: "todos",
  });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const typeParam =
        apiFilters.type !== "todas" ? apiFilters.type : undefined;
      const statusParam =
        apiFilters.status !== "todos" ? apiFilters.status : undefined;

      const response = await transactionService.getMyTransactions(
        itemsPerPage,
        currentPage,
        typeParam,
        statusParam,
      );

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, apiFilters]);

  const filteredTransactions = useMemo(() => {
    if (!data) return [];
    return data.transactions.filter((t) => {
      const matchType =
        localFilters.type === "todas" || t.type === localFilters.type;
      const matchStatus =
        localFilters.status === "todos" || t.status === localFilters.status;
      return matchType && matchStatus;
    });
  }, [data, localFilters]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F9FD] dark:bg-[#0D0D12] min-h-screen font-display text-[#121118] dark:text-white antialiased">
      <PageHeader title="Histórico" showUser={true} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-32">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10">
          <SummaryCard
            label="Vendas"
            value={
              data?.stats.totalSales
                ? formatPrice(data.stats.totalSales, true)
                : "Sem vendas"
            }
            isEmpty={!data?.stats.totalSales}
            color="from-emerald-400 via-emerald-500 to-teal-700"
            icon="payments"
          />
          <SummaryCard
            label="Levantamentos"
            value={
              data?.stats.totalWithdrawals
                ? formatPrice(data.stats.totalWithdrawals, true)
                : "Nenhum saque"
            }
            isEmpty={!data?.stats.totalWithdrawals}
            icon="account_balance"
          />
        </section>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full lg:max-w-[65%]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Movimentações
              </h2>
              <FilterButton onClick={toggleFilter} />
            </div>

            <div className="space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader size="md" />
                </div>
              ) : (
                <div className="opacity-100 transition-opacity duration-500">
                  {filteredTransactions.length > 0 ? (
                    <TransactionGroup
                      label={
                        apiFilters.type !== "todas" ||
                        apiFilters.status !== "todos"
                          ? "Resultados da Busca"
                          : "Recentes"
                      }
                    >
                      {filteredTransactions.map((t) => (
                        <div
                          key={t.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        >
                          <MyTransactionCard {...t} />
                        </div>
                      ))}
                    </TransactionGroup>
                  ) : (
                    <div className="py-20 text-center opacity-50 font-medium bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
                      Nenhuma movimentação encontrada.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="fixed top-24 right-[calc((100vw-1152px)/2+24px)] w-[350px] p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden z-20">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>

              <h4 className="font-black text-lg mb-3 tracking-tight text-[#181112] dark:text-white">
                Como encontrar o que precisa?
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Use o botão <b>Aplicar</b> para organizar apenas o que você já
                está vendo agora.
                <br />
                <br />
                Se quiser buscar algo mais antigo, use o botão <b>
                  Pesquisar
                </b>{" "}
                para carregar todo o seu histórico.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {data && data.pagination.totalPages > 1 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <BottomNavigation />

      {isFilterOpen && (
        <TransactionFilterModal
          currentFilters={localFilters}
          onApplyLocal={(newFilters) => {
            setLocalFilters(newFilters);
            toggleFilter();
          }}
          onSearchAPI={(newFilters) => {
            setApiFilters(newFilters);
            setLocalFilters(newFilters);
            setCurrentPage(1);
            toggleFilter();
          }}
          onClose={toggleFilter}
        />
      )}
    </div>
  );
};

export default HistoryScreen;
