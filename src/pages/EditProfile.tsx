import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showReauthModal, setShowReauthModal] = useState(false);

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

    const payload: any = {};
    if (name !== initialData.name) payload.fullName = name;
    if (email !== initialData.email) payload.email = email;
    if (phone !== initialData.phone) payload.phoneNumber = phone;
    if (address !== initialData.address) payload.address = address;

    const hasChanges = Object.keys(payload).length > 0;

    if (!hasChanges) {
      toast("Nenhuma alteração feita");
      return;
    }

    const securitySensitiveChange = !!(payload.email || payload.phoneNumber);

    setIsLoading(true);
    try {
      const res = await updateUser(payload, setUser);

      if (res.success) {
        if (securitySensitiveChange) {
          setShowReauthModal(true);
        } else {
          toast.success(res.message ?? "Perfil atualizado com sucesso");
        }
        setInitialData({ name, email, phone, address });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowReauthModal(false);
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
      } catch (err: any) {
        toast.error(
          err.message ?? "Não foi possível atualizar a foto de perfil",
        );
      } finally {
        setIsImageLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center">
      <PageHeader title="Editar Perfil" />
      
      <div className="w-full flex justify-center flex-1 md:flex-none">
        <main className="w-full md:max-w-4xl bg-white dark:bg-[#1c182d] md:rounded-[3rem] md:mt-24 px-6 md:px-16 py-10 md:py-6 md:shadow-xl border-none dark:border-white/5 flex flex-col items-center h-full md:h-fit md:mb-10">
          <div className="relative mb-6 mt-6 md:mt-0 flex flex-col items-center">
            <div
              className={`relative group ${isImageLoading ? "cursor-wait" : "cursor-pointer"}`}
              onClick={handleImageClick}
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500"></div>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center">
                {profileImage ? (
                  <img
                    className={`w-full h-full object-cover transition-transform duration-500 ${!isImageLoading && "group-hover:scale-110"}`}
                    src={BASE_UPLOAD_URL + profileImage}
                    alt="Profile"
                  />
                ) : (
                  <span className="material-symbols-outlined text-slate-400 text-5xl">
                    account_circle
                  </span>
                )}
                <div
                  className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-opacity duration-300 ${isImageLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  {isImageLoading ? (
                    <span className="material-symbols-outlined text-white text-2xl animate-spin">
                      sync
                    </span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-white text-2xl">
                        photo_camera
                      </span>
                      <span className="text-white text-[9px] font-bold uppercase mt-1 tracking-widest">
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
              <div className="mt-3 px-4 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
                  {userRoleLabel[role]}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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
            <div className="pt-8 pb-10 md:pb-2">
              <TralloButton
                fullWidth
                type="submit"
                icon={isLoading ? "sync" : undefined}
                disabled={isLoading}
              >
                {isLoading ? "A guardar..." : "Guardar Alterações"}
              </TralloButton>
            </div>
          </form>
        </main>
      </div>

      {showReauthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-white dark:bg-[#1c182d] w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-white/10 text-center animate-in fade-in zoom-in duration-300">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">
                info
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Dados Atualizados
            </h2>

            <div className="text-slate-500 dark:text-slate-400 mb-8 space-y-3">
              <p>As suas informações foram alteradas com sucesso.</p>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-left space-y-2">
                {email !== initialData.email && (
                  <p className="text-sm">
                    <span className="font-bold block text-primary uppercase text-[10px] tracking-widest mb-1">
                      Novo E-mail
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {email}
                    </span>
                  </p>
                )}
                {phone !== initialData.phone && (
                  <p className="text-sm">
                    <span className="font-bold block text-primary uppercase text-[10px] tracking-widest mb-1">
                      Novo Telemóvel
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {phone}
                    </span>
                  </p>
                )}
              </div>

              <p className="text-xs pt-2">
                Utilize estes novos dados na próxima vez que iniciar sessão no
                Trallo.
              </p>
            </div>

            <TralloButton fullWidth onClick={handleCloseModal}>
              Entendi
            </TralloButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;