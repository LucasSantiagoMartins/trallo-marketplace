import React from "react";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { SellerDTO } from "@/types/product";

interface SellerInfoProps {
  seller: SellerDTO;
}

const ProductDetailSellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  return (
    <div className="bg-card p-4 rounded-xl shadow-soft border border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm overflow-hidden bg-card flex items-center justify-center">
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
              <span className="material-symbols-outlined text-foreground text-2xl">
                account_circle
              </span>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-primary-foreground size-5 rounded-full flex items-center justify-center border-2 border-card">
            <span className="material-symbols-outlined text-[10px] font-bold">
              verified
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground">{seller?.fullName}</h3>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-yellow-500 text-xs">
              star
            </span>
            <span className="text-xs text-muted-foreground">Vendedor</span>
          </div>
        </div>
      </div>
      <button className="bg-muted px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-muted/80 transition-colors">
        Perfil
      </button>
    </div>
  );
};

export default ProductDetailSellerInfo;
