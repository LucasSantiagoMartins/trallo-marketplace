import React, { useState, useRef } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import ProfileTypeSheet from "@/components/ProfileTypeSheet";

const EditProfile = () => {
  const [name, setName] = useState("Kiara de Oliveira");
  const [email, setEmail] = useState("kiara.oliveira@trallo.ao");
  const [phone, setPhone] = useState("923 000 000");
  const [address, setAddress] = useState("Condomínio Jardim de Rosas, Luanda");
  const [profileType, setProfileType] = useState("Comprador Verificado");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Referência para o input de ficheiro escondido
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando perfil...", {
      name,
      email,
      phone,
      address,
      profileType,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const profileOptions = [
    {
      id: "comprador",
      label: "Comprador",
      icon: "shopping_bag",
      desc: "Para quem busca produtos e serviços.",
    },
    {
      id: "vendedor",
      label: "Vendedor",
      icon: "storefront",
      desc: "Para quem deseja anunciar e gerir vendas.",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center p-4 sm:p-6">
      <PageHeader title="Editar Perfil" />

      <div className="mt-16 sm:mt-16 w-full" />

      <main className="w-full max-w-2xl bg-white dark:bg-[#1c182d] rounded-[2rem] sm:rounded-[3rem] px-8 sm:px-16 py-8 sm:py-10 shadow-xl dark:shadow-none border border-transparent dark:border-white/5 flex flex-col items-center">
        <div className="relative mb-8 flex flex-col items-center">

          {/* Container da Foto - Clique e Hover centralizados aqui */}
          <div
            className="relative group cursor-pointer"
            onClick={handleImageClick}
          >
            {/* Brilho de fundo no hover */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500"></div>

            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kiara"
                alt="Profile"
              />

              {/* Overlay estilo LinkedIn/Facebook que aparece no Hover */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                <span className="text-white text-[10px] font-bold uppercase mt-1 tracking-widest">Alterar</span>
              </div>
            </div>

            {/* Input invisível disparado pelo clique no container */}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          </div>

          <div className="mt-4 px-4 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
              Comprador Premium
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="w-full space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TralloInput
              label="Nome Completo"
              icon="person"
              placeholder="Ex: João Manuel"
              value={name}
              onChange={setName}
            />
            <TralloInput
              label="E-mail"
              type="email"
              icon="alternate_email"
              placeholder="exemplo@trallo.ao"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TralloInput
              label="Telemóvel"
              icon="call"
              placeholder="9XX XXX XXX"
              value={phone}
              onChange={setPhone}
            />
            <TralloInput
              label="Morada em Luanda"
              icon="location_on"
              placeholder="Bairro, Rua, Casa nº"
              value={address}
              onChange={setAddress}
            />
          </div>

          <div
            onClick={() => setIsSheetOpen(true)}
            className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group"
          >
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Tipo de Perfil
              </h4>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {profileType}
              </p>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
              expand_more
            </span>
          </div>

          <div className="pt-4">
            <TralloButton fullWidth type="submit" icon="check_circle">
              Guardar Alterações
            </TralloButton>
          </div>
        </form>
      </main>

      <ProfileTypeSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        currentType={profileType}
        onSelect={setProfileType}
        options={profileOptions}
      />
    </div>
  );
};

export default EditProfile;