import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentsGrid from "./PaymentsGrid";
import TransactionsGrid from "./TransactionsGrid";
import WalletsGrid from "./WalletsGrid";
import OverviewGrid from "./OverviewGrid";

export interface DashboardGridProps {
  activeTab: string;
  context: "overview" | "payments" | "transactions" | "wallets";
  stats: any;
  loading: boolean;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  activeTab,
  context,
  stats,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const animationProps = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {context === "overview" && (
          <motion.div key={`overview-${activeTab}`} {...animationProps}>
            <OverviewGrid activeTab={activeTab} stats={stats} />
          </motion.div>
        )}

        {context === "payments" && (
          <motion.div key={`payments-${activeTab}`} {...animationProps}>
            <PaymentsGrid activeTab={activeTab} data={stats} />
          </motion.div>
        )}

        {context === "transactions" && (
          <motion.div key={`transactions-${activeTab}`} {...animationProps}>
            <TransactionsGrid activeTab={activeTab} data={stats} />
          </motion.div>
        )}

        {context === "wallets" && (
          <motion.div key={`wallets-${activeTab}`} {...animationProps}>
            <WalletsGrid activeTab={activeTab} data={stats} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardGrid;
