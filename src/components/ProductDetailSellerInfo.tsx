import React from "react";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

interface SellerInfoProps {
  seller: {
    fullName: string;
    profilePicture?: string;
  };
}

const ProductDetailSellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  return (
    <div className="bg-card p-4 rounded-xl shadow-soft border border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={
              seller.profilePicture
                ? `${BASE_UPLOAD_URL}${seller.profilePicture}`
                : "/placeholder-user.png"
            }
            alt={seller.fullName}
            className="size-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-primary-foreground size-5 rounded-full flex items-center justify-center border-2 border-card">
            <span className="material-symbols-outlined text-[10px] font-bold">
              verified
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground">{seller.fullName}</h3>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-yellow-500 text-xs">
              star
            </span>
            <span className="text-xs text-muted-foreground">Vendedor</span>
          </div>
        </div>
      </div>
      <button className="bg-muted px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-muted/80 transition-colors">
        Perfil
      </button>
    </div>
  );
};

export default ProductDetailSellerInfo;