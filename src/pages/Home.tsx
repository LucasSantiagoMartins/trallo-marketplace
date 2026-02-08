import React from "react";
import MobileLayout from "@/layouts/MobileLayout";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";

const carouselSlides = [
  {
    id: "1",
    tag: "Flash Sale",
    title: "Upgrade na Tua Tech",
    description: "Até 40% de desconto em marcas selecionadas.",
    buttonText: "Comprar Agora",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqBKnC1iFzRCrpxblgAR9g7ApfnIcuxXVrJqPuUmiGkvCHHK4R0OfN3CeYPpladZr4dZ5MPx7dM9jrAdCMPP7xrsn97fEBVT-E64HHy7IVn2WfddoP0oQO2WQMXClIhkk-I_znqZYzXZsrqVPbe7wYpuOJYY-ybDsUUOFhA1dv4sYWMvLyy3S5gyJQTHQKkVQAb0CY3xrYTgvjQfbPBY3-vEThDYfpAMJ_rj9JRQ-n61NKrneUuWVayiH0YuZckjcLFpLx3eVD5-t0",
    backgroundColor: "hsl(262 91% 61% / 0.9)",
    tagColor: "bg-white/20",
  },
  {
    id: "2",
    tag: "Nova Coleção",
    title: "Streetwear Urbano",
    description: "As tendências que definem a nova geração.",
    buttonText: "Descobrir",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWNRSRV-vhDK_O-WwxrH4mER9ke5XEZdkhLjjGj7ZKpR4spPOICV9S2orOaCJEZ7vX4j639Y_5szAWdMUMv29XQ86s-83v_K5K35JGhSPv16yqJHjLT1FqWI499MkcY49u9PrEAf47-HEH-c6vel5-XZNB_yC8iMVQv8Ajcz7uyF7K02AA6DDN3QuuRejeEsOsQycQhip9eWEVNFTI7jbSVkxBTerZ1QBiYMYMX3kKB72p0NW7VV8SLXCioZq2zeXz6PHiI-wbO1w",
    backgroundColor: "#0f172a",
    tagColor: "bg-primary",
  },
  {
    id: "3",
    tag: "Exclusivo",
    title: "Kicks de Elite",
    description: "Stock limitado dos modelos mais desejados.",
    buttonText: "Ver Modelos",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbLs-oQQ8uPfpiFlz5Vb7UiOi9wcT0EAXXGlEtLF5ph5vi3N_Dszys--bS4mLVO9DZl_GiEbIxKh3FnQTVn35xkXJ-m1ovS5_ftpH1svw0f6AdXIYFzbLi-u-uwSl5DvddJ6AS4VDwMHuSZi8QOBOrob8wnNf2yfAR1NWe4Zq1NY_BSmwbYdnfV66w8CXRlQrY8T5Xc2h4NQq46r0gJRSg7EEuxGmmN-2eVHn4XBtKY1Qkse5u6WwdGwI-NaX_-ilma79qBnKWcCjq",
    backgroundColor: "#ea580c",
    tagColor: "bg-black/20",
    buttonColor: "bg-white text-orange-600",
  },
];

const products = [
  {
    id: "1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbLs-oQQ8uPfpiFlz5Vb7UiOi9wcT0EAXXGlEtLF5ph5vi3N_Dszys--bS4mLVO9DZl_GiEbIxKh3FnQTVn35xkXJ-m1ovS5_ftpH1svw0f6AdXIYFzbLi-u-uwSl5DvddJ6AS4VDwMHuSZi8QOBOrob8wnNf2yfAR1NWe4Zq1NY_BSmwbYdnfV66w8CXRlQrY8T5Xc2h4NQq46r0gJRSg7EEuxGmmN-2eVHn4XBtKY1Qkse5u6WwdGwI-NaX_-ilma79qBnKWcCjq",
    category: "Sneakers",
    name: "Nike Air Jordan 1 Premium",
    price: 85000,
    isFavorite: false,
  },
  {
    id: "2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjRZUH48UJYiL4CrfML4i1XH6hr9AeLn1xw8IRmjr5P1ypgXsGhVmMT0EGWzK2Ofz9pqeYWN9gFBIeHTSy39J3gpqakwHQ8UUMWV1QlbNeybITdHmE5rTxUAWFGDQpjarY0V4-0gYNS2r9oT1gvJLD6H3IgQKZwiZxgBvJyExLoNJkbSU8rVytr3qHAiKQMMKhT8dHofAsKOJd6b6rv1WbJcAr18oOEy7ZwIEz5VUO5SFpUW5NtcPZL1qFRYUnWNU_8vk3vlvtwWMx",
    category: "Acessórios",
    name: "Smart Watch Pro Series 7",
    price: 120000,
    isFavorite: true,
  },
  {
    id: "3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwWNRSRV-vhDK_O-WwxrH4mER9ke5XEZdkhLjjGj7ZKpR4spPOICV9S2orOaCJEZ7vX4j639Y_5szAWdMUMv29XQ86s-83v_K5K35JGhSPv16yqJHjLT1FqWI499MkcY49u9PrEAf47-HEH-c6vel5-XZNB_yC8iMVQv8Ajcz7uyF7K02AA6DDN3QuuRejeEsOsQycQhip9eWEVNFTI7jbSVkxBTerZ1QBiYMYMX3kKB72p0NW7VV8SLXCioZq2zeXz6PHiI-wbO1w",
    category: "Roupas",
    name: "Hoodie Oversized Cotton",
    price: 25500,
    isFavorite: false,
  },
  {
    id: "4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmr9NDsI9Q0DxgYhcZpxCmfHQjaggFgJFUPHTSDlPuzS9BY_rcmIU7YXsmXNEQ8BA91Q-dwq1re6OZdTYe9MlGc5DM8gMKnv0fimxY2JpIVDa_59ANbaF9D2MqtFcKF_sUuPgfz3sNcaVpYLAF0fWbB1WxKY388JjAXQaEZiXH-OVlN_IadIvMJt3-bCk7FDq_fkT2-n-Yilsn3rsp7E8VZt9OvJmP3oDocDd2R5ryEv2QrCpifVBiFKZirl51qIlO5ABRtiIqxqfK",
    category: "Tech",
    name: "Wireless Noise Cancelling",
    price: 45000,
    isFavorite: false,
    discount: 15,
  },
];

const Home: React.FC = () => {
  return (
    <MobileLayout showBottomNav>
      <Header showSearch />
      
      <main className="mt-2">
        {/* Carousel Section */}
        <div className="px-4 py-4">
          <Carousel slides={carouselSlides} />
        </div>

        {/* Featured Products Section */}
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold clash-style">Destaques Para Ti</h2>
          <button className="text-primary text-sm font-semibold">Ver todos</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 px-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              category={product.category}
              name={product.name}
              price={product.price}
              isFavorite={product.isFavorite}
              discount={product.discount}
              onFavoriteToggle={() => console.log(`Toggle favorite: ${product.id}`)}
              onAddToCart={() => console.log(`Add to cart: ${product.id}`)}
            />
          ))}
        </div>

        {/* Local Brands CTA */}
        <div className="px-4 py-8">
          <div className="bg-foreground rounded-xl p-6 text-background flex items-center justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative z-10 flex-1">
              <h3 className="text-xl font-bold mb-1 clash-style">Marcas Locais</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Descobre o melhor do Made in Angola
              </p>
              <button className="text-primary text-sm font-bold flex items-center gap-1 group">
                Explorar agora
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="relative z-10 w-24 h-24 bg-card/5 rounded-full flex items-center justify-center border border-card/10">
              <span className="material-symbols-outlined text-4xl text-primary">verified_user</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </MobileLayout>
  );
};

export default Home;
