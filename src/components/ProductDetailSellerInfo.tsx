import React from "react";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SellerDTO } from "@/types/product";
import { useNavigate } from "react-router-dom";

interface SellerInfoProps {
  seller: SellerDTO;
}

const ProductDetailSellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    if (seller?.slug) {
      navigate(`/perfil-vendedor/${seller.slug}`);
    }
  };

  return (
    <div className="bg-card p-3 md:p-4 rounded-xl shadow-soft border border-border flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="size-11 md:size-12 rounded-full border-2 border-primary/20 p-0.5 shadow-sm overflow-hidden bg-card flex items-center justify-center">
            {seller?.profilePicture ? (
              <img
                src={`${BASE_UPLOAD_URL + seller.profilePicture}`}
                alt={seller.fullName}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "";
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="material-symbols-outlined text-foreground text-2xl md:text-3xl">
                account_circle
              </span>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white size-4 md:size-5 rounded-full flex items-center justify-center border-2 border-card">
            <span className="material-symbols-outlined text-[9px] md:text-[11px] font-bold">
              verified
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-foreground text-sm md:text-base truncate leading-tight">
            {seller?.fullName}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[8px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-tight truncate">
              Vendedor verificado
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleGoToProfile}
        className="bg-primary/10 text-primary px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95 whitespace-nowrap border border-primary/5"
      >
        Perfil
      </button>
    </div>
  );
};

export default ProductDetailSellerInfo;
