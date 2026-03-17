const TransactionGroup = ({ label, children }: any) => (
  <div className="w-full">
    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
      {label}
    </h4>
    <div className="space-y-4">{children}</div>
  </div>
);

export default TransactionGroup;
