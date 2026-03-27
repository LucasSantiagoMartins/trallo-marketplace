import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import { useIdentityVerification } from "@/hooks/useIdentityVerification";
import toast from "react-hot-toast";

const IdentityVerification: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [editingFromReview, setEditingFromReview] = useState(false);
  const { submitVerification, loading } = useIdentityVerification();
  const navigate = useNavigate();

  const [images, setImages] = useState<{
    front: string | null;
    back: string | null;
    selfie: string | null;
  }>({
    front: null,
    back: null,
    selfie: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateImageForStep(step, base64String);

        if (editingFromReview) {
          setStep(4);
          setEditingFromReview(false);
        } else if (step < 4) {
          nextStep();
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const updateImageForStep = (targetStep: number, value: string | null) => {
    setImages((prev) => {
      if (targetStep === 1) return { ...prev, front: value };
      if (targetStep === 2) return { ...prev, back: value };
      if (targetStep === 3) return { ...prev, selfie: value };
      return prev;
    });
  };

  const triggerUpload = (useCamera: boolean = false, targetStep?: number) => {
    if (targetStep) {
      setStep(targetStep);
      setEditingFromReview(true);
    }

    setTimeout(() => {
      if (fileInputRef.current) {
        if (useCamera || targetStep === 3 || (!targetStep && step === 3)) {
          fileInputRef.current.setAttribute(
            "capture",
            targetStep === 3 || step === 3 ? "user" : "environment",
          );
        } else {
          fileInputRef.current.removeAttribute("capture");
        }
        fileInputRef.current.click();
      }
    }, 10);
  };

  const getStepData = () => {
    switch (step) {
      case 1:
        return {
          title: "Foto da Frente",
          desc: "Capture o lado principal do seu documento.",
          key: "front" as const,
        };
      case 2:
        return {
          title: "Foto do Verso",
          desc: "Agora capture a parte traseira do documento.",
          key: "back" as const,
        };
      case 3:
        return {
          title: "Sua Selfie",
          desc: "Tire uma foto nítida do seu rosto.",
          key: "selfie" as const,
        };
      default:
        return {
          title: "Verifique os dados",
          desc: "Confira se as imagens estão legíveis.",
          key: null,
        };
    }
  };

  const currentData = getStepData();

  const getButtonLabel = () => {
    if (step === 3) return isMobile ? "Tirar Selfie" : "Carregar Selfie";
    return isMobile ? "Usar Câmera" : "Carregar Foto";
  };

  const handleFinalSubmit = async () => {
    await submitVerification(images);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative overflow-hidden">
      <PageHeader title="Verificação de identidade" showUser />

      <div className="mt-20 px-6 w-full max-w-4xl mx-auto">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`text-[9px] font-bold uppercase tracking-widest ${step === s ? "text-primary" : "text-outline"}`}
            >
              {s === 1 && "Frente"}
              {s === 2 && "Verso"}
              {s === 3 && "Selfie"}
              {s === 4 && "Revisão"}
            </span>
          ))}
        </div>
        <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 z-10">
        <section className="mb-8 text-center md:text-left">
          <h2 className="font-black text-2xl md:text-3xl text-on-surface tracking-tight mb-2">
            {currentData.title}
          </h2>
          <p className="text-on-surface-variant leading-relaxed text-base max-w-xl">
            {currentData.desc}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:items-start">
          <section className="lg:col-span-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {step < 4 ? (
              <div
                onClick={() => !images[currentData.key!] && triggerUpload()}
                className="group relative flex flex-col items-center justify-center aspect-[3/2] rounded-3xl border-2 border-dashed border-primary/30 transition-all duration-300 bg-surface-container-low shadow-sm overflow-hidden"
              >
                {images[currentData.key!] ? (
                  <>
                    <img
                      src={images[currentData.key!]!}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerUpload();
                      }}
                      className="absolute top-4 right-4 w-12 h-12 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-6 text-center cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-6xl">
                      photo_camera
                    </span>
                    <p className="font-bold text-lg text-on-surface">
                      {isMobile ? "Tirar" : "Carregar"} {currentData.title}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Frente", img: images.front, s: 1 },
                  { label: "Verso", img: images.back, s: 2 },
                  { label: "Selfie", img: images.selfie, s: 3 },
                ].map((item) => (
                  <div key={item.label} className="space-y-2 relative">
                    <p className="text-[10px] font-bold uppercase text-outline ml-2 tracking-widest">
                      {item.label}
                    </p>
                    <div className="aspect-[3/4] md:aspect-square bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant relative">
                      <img
                        src={item.img!}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => triggerUpload(false, item.s)}
                        className="absolute bottom-2 right-2 w-8 h-8 bg-surface/90 backdrop-blur text-primary rounded-full flex items-center justify-center border border-primary/20"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="lg:col-span-2 space-y-6">
            <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    tips_and_updates
                  </span>
                </div>
                <h3 className="font-bold text-base text-on-surface">Dicas</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-primary text-base">
                    check_circle
                  </span>
                  Evite reflexos e sombras nos documentos.
                </li>
                <li className="flex items-start gap-3 text-xs font-medium text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-primary text-base">
                    check_circle
                  </span>
                  Mantenha uma expressão neutra na selfie.
                </li>
              </ul>
            </section>

            <div className="flex flex-col gap-4">
              {step === 4 ? (
                <TralloButton
                  variant="primary"
                  fullWidth
                  isLoading={loading}
                  onClick={handleFinalSubmit}
                >
                  Finalizar Envio
                </TralloButton>
              ) : (
                <TralloButton
                  variant="outline"
                  fullWidth
                  onClick={() => triggerUpload(true)}
                >
                  {getButtonLabel()}
                </TralloButton>
              )}

              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-outline text-base">
                  verified_user
                </span>
                <p className="text-[9px] font-bold text-outline uppercase tracking-wider">
                  Processamento Seguro TRALLO
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-primary-fixed/20 blur-[100px] -z-10 rounded-full" />
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-secondary-fixed/10 blur-[100px] -z-10 rounded-full" />
    </div>
  );
};

export default IdentityVerification;
