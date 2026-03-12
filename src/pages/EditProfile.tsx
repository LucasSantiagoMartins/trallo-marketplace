import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import {
  updateProfilePicture,
  updateUser,
  getMyInfo,
} from "@/services/user.service";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { UserRole } from "@/enums/user";
import { userRoleLabel } from "@/utils/mappers/user.mapper";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const EditProfile = () => {
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await getMyInfo();
        if (res.success && res.data) {
          const userData = {
            name: res.data.fullName,
            email: res.data.email,
            phone: res.data.phoneNumber,
            address: res.data.address || "",
          };

          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData.phone);
          setAddress(userData.address);
          setInitialData(userData);

          setRole(res.data.role);
          setProfileImage(res.data.profilePicture || null);
        }
      } catch (err) {
        toast.error("Erro ao carregar as suas informações");
      }
    };

    loadUserData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasChanges =
      name !== initialData.name ||
      email !== initialData.email ||
      phone !== initialData.phone ||
      address !== initialData.address;

    if (!hasChanges) {
      toast("Nenhuma alteração feita");
      return;
    }

    setIsLoading(true);
    try {
      const res = await updateUser(
        {
          fullName: name,
          email,
          phone,
          address,
        },
        setUser,
      );

      if (res.success) {
        setInitialData({ name, email, phone, address });
        toast.success(res.message ?? "Perfil atualizado com sucesso");
      }
    } catch (err) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    if (isImageLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      try {
        const res = await updateProfilePicture(file, setUser);
        if (res.success && res.data) {
          setProfileImage(res.data.profilePicture || null);
          toast.success("Foto atualizada");
        }
      } catch (error) {
        toast.error("Erro ao enviar imagem");
      } finally {
        setIsImageLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center p-4 sm:p-6">
      <PageHeader title="Editar Perfil" />
      <div className="mt-16 w-full" />

      <main className="w-full max-w-2xl bg-white dark:bg-[#1c182d] rounded-[2rem] sm:rounded-[3rem] px-8 sm:px-16 py-8 sm:py-10 shadow-xl border border-transparent dark:border-white/5 flex flex-col items-center">
        <div className="relative mb-8 flex flex-col items-center">
          <div
            className={`relative group ${isImageLoading ? "cursor-wait" : "cursor-pointer"}`}
            onClick={handleImageClick}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center">
              {profileImage ? (
                <img
                  className={`w-full h-full object-cover transition-transform duration-500 ${!isImageLoading && "group-hover:scale-110"}`}
                  src={BASE_UPLOAD_URL + profileImage}
                  alt="Profile"
                />
              ) : (
                <span className="material-symbols-outlined text-slate-400 text-6xl">
                  account_circle
                </span>
              )}
              <div
                className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-opacity duration-300 ${isImageLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                {isImageLoading ? (
                  <span className="material-symbols-outlined text-white text-3xl animate-spin">
                    sync
                  </span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-white text-3xl">
                      photo_camera
                    </span>
                    <span className="text-white text-[10px] font-bold uppercase mt-1 tracking-widest">
                      Alterar
                    </span>
                  </>
                )}
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isImageLoading}
            />
          </div>
          {role && (
            <div className="mt-4 px-4 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
                {userRoleLabel[role]}
              </span>
            </div>
          )}
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
          <div className="pt-4">
            <TralloButton
              fullWidth
              type="submit"
              icon={isLoading && "sync"}
              disabled={isLoading}
            >
              {isLoading ? "A guardar..." : "Guardar Alterações"}
            </TralloButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
