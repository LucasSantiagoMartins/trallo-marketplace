import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  CreditCard,
  User,
  Shield,
  ChevronDown,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Geral");

  const allFaqs = [
    {
      category: "Pedidos",
      question: "Como rastrear meu pedido?",
      answer:
        "Você pode acompanhar seu pedido em tempo real acessando a seção 'Meus Pedidos' no seu perfil e clicando em 'Rastrear Entrega'.",
    },
    {
      category: "Pagamentos",
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos Multicaixa Express, transferências bancárias (IBAN) e cartões de crédito internacionais.",
    },
    {
      category: "Conta",
      question: "Como alterar meu e-mail?",
      answer:
        "Vá em Perfil > Editar Perfil e altere o campo de e-mail. Será necessário confirmar a alteração através de um código.",
    },
    {
      category: "Segurança",
      question: "Como ativar a verificação em duas etapas?",
      answer:
        "Nas 'Configurações de Segurança', você pode ativar o 2FA para garantir que sua conta esteja sempre protegida.",
    },
    {
      category: "Pedidos",
      question: "Posso devolver itens após 30 dias?",
      answer:
        "Nossa política padrão é de 30 dias para devoluções. Após este período, entre em contato com nosso suporte.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "Geral") return allFaqs.slice(0, 3);
    return allFaqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111118] dark:text-white min-h-screen transition-colors">
      <PageHeader title="Ajuda e Suporte" backTo="/perfil" />

      <main className="relative mx-auto flex flex-col pb-32 pt-24 px-6 lg:max-w-5xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: FAQ e Categorias (7 colunas) */}
          <section className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h3 className="clash-display text-sm font-bold uppercase tracking-widest text-slate-400">
                Categorias
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Selecione um tópico para filtrar as perguntas frequentes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              {[
                { icon: <ShoppingBag />, label: "Pedidos" },
                { icon: <CreditCard />, label: "Pagamentos" },
                { icon: <User />, label: "Conta" },
                { icon: <Shield />, label: "Segurança" },
              ].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCategory(cat.label);
                    setOpenFaq(null);
                  }}
                  className={`flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    activeCategory === cat.label
                      ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm"
                      : "border-slate-100 dark:border-white/5 bg-white dark:bg-[#1c182d]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeCategory === cat.label
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {React.cloneElement(cat.icon as React.ReactElement, {
                      size: 20,
                    })}
                  </div>
                  <span className="font-bold text-xs lg:text-sm">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-end px-1">
                <h3 className="clash-display text-lg font-semibold text-slate-900 dark:text-white">
                  {activeCategory === "Geral"
                    ? "Perguntas Frequentes"
                    : `FAQ: ${activeCategory}`}
                </h3>
                {activeCategory !== "Geral" && (
                  <button
                    onClick={() => setActiveCategory("Geral")}
                    className="text-primary text-xs font-bold hover:underline mb-1"
                  >
                    Ver tudo
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {filteredFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#1c182d] border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                    >
                      <span className="text-sm font-bold pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === i
                          ? "max-h-40 pb-5 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coluna Direita: Contato (5 colunas) */}
          <section className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <h3 className="clash-display text-sm font-bold uppercase tracking-widest text-slate-400">
              Canais de Atendimento
            </h3>

            <div className="space-y-4">
              <ContactLink
                icon={<Phone />}
                color="text-green-500"
                bg="bg-green-500/10"
                title="WhatsApp Support"
                subText="Atendimento rápido e humano"
                to="#"
              />
              <ContactLink
                icon={<Mail />}
                color="text-primary"
                bg="bg-primary/10"
                title="E-mail Oficial"
                subText="suporte@trallo.com"
                to="#"
              />
              <ContactLink
                icon={<AlertCircle />}
                color="text-red-500"
                bg="bg-red-500/10"
                title="Centro de Disputas"
                subText="Abrir uma reclamação de pedido"
                to="/reclamacoes" // Rota para a tela que criamos
              />
            </div>

            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform">
                <Shield size={100} className="text-primary" />
              </div>
              <div className="flex items-center gap-3 mb-3 text-primary">
                <span className="material-symbols-outlined fill-1">
                  schedule
                </span>
                <h4 className="clash-display font-bold text-sm lg:text-base">
                  Horário de Operação
                </h4>
              </div>
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium relative z-10">
                Segunda a Sábado: 08:00 — 20:00
                <br />
                Domingos e Feriados: 09:00 — 14:00
                <br />
                <span className="text-[10px] opacity-60 mt-2 block">
                  (GMT+1 - Luanda)
                </span>
              </p>
            </div>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

// Componente Interno de Link de Contato
const ContactLink = ({ icon, color, bg, title, subText, to }: any) => {
  const isExternal = to.startsWith("http") || to === "#";
  const Content = (
    <>
      <div
        className={`size-12 rounded-xl ${bg} flex items-center justify-center ${color} shrink-0`}
      >
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-bold text-sm lg:text-base text-slate-900 dark:text-white leading-tight">
          {title}
        </h4>
        <p className="text-[11px] lg:text-xs text-slate-500 font-medium mt-0.5">
          {subText}
        </p>
      </div>
      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
        chevron_right
      </span>
    </>
  );

  const className =
    "w-full flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-[#1c182d] border border-slate-100 dark:border-white/5 shadow-sm transition-all group hover:border-primary/30";

  return isExternal ? (
    <button className={className}>{Content}</button>
  ) : (
    <Link to={to} className={className}>
      {Content}
    </Link>
  );
};

export default SupportPage;
