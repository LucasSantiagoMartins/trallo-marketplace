import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Search,
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
  const [openFaq, setOpenFaq] = useState(null);
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
        "Nossa política padrão é de 30 dias para devoluções. Após este período, entre em contato com nosso suporte para uma análise excepcional.",
    },
    {
      category: "Pedidos",
      question: "Como alterar endereço de entrega?",
      answer:
        "Se o pedido ainda não foi enviado, você pode alterar o endereço nas configurações do pedido diretamente no app.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "Geral") return allFaqs.slice(0, 3);
    return allFaqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpenFaq(null);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111118] dark:text-white min-h-screen transition-colors">
      <PageHeader title="Ajuda e Suporte" backTo="/perfil" />

      <main className="relative mx-auto flex flex-col pb-32 pt-24 px-6 lg:max-w-4xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="space-y-6">
            <div className="space-y-1">
              <h3 className="clash-font text-sm font-bold uppercase tracking-widest text-gray-400 ml-1">
                Categorias
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 ml-1 font-medium">
                Selecione uma categoria para ver perguntas específicas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <ShoppingBag />, label: "Pedidos" },
                { icon: <CreditCard />, label: "Pagamentos" },
                { icon: <User />, label: "Conta" },
                { icon: <Shield />, label: "Segurança" },
              ].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleCategoryClick(cat.label)}
                  className={`flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all ${
                    activeCategory === cat.label
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeCategory === cat.label
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {React.cloneElement(cat.icon, { size: 20 })}
                  </div>
                  <span className="font-bold text-xs lg:text-sm">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="clash-font text-sm font-bold uppercase tracking-widest text-gray-400">
                  {activeCategory === "Geral"
                    ? "FAQ Geral"
                    : `FAQ: ${activeCategory}`}
                </h3>
                {activeCategory !== "Geral" && (
                  <button
                    onClick={() => setActiveCategory("Geral")}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Resetar
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors"
                      >
                        <span className="text-sm font-bold pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            openFaq === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaq === i
                            ? "max-h-40 pb-5 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-400 text-sm">
                    Nenhuma pergunta encontrada.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="clash-font text-sm font-bold uppercase tracking-widest text-gray-400 ml-1">
              Fale Conosco
            </h3>
            <div className="space-y-4">
              <ContactLink
                icon={<Phone />}
                color="text-green-500"
                bg="bg-green-500/10"
                title="WhatsApp Support"
                subText="Disponível 24/7 para urgências"
              />
              <ContactLink
                icon={<Mail />}
                color="text-primary"
                bg="bg-primary/10"
                title="E-mail"
                subText="Para dúvidas e sugestões"
              />
              <ContactLink
                icon={<AlertCircle />}
                color="text-red-500"
                bg="bg-red-500/10"
                title="Centro de Reclamações"
                subText="Abra uma disputa ou reclamação"
                link="/reclamacoes"
              />
            </div>

            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 mt-6">
              <div className="flex items-center gap-3 mb-2 text-primary">
                <span className="material-symbols-outlined fill-1">info</span>
                <h4 className="font-bold text-sm lg:text-base">
                  Horário de Atendimento
                </h4>
              </div>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Nossa equipe está disponível de segunda a sábado, das 08:00 às
                20:00 (Horário de Luanda).
              </p>
            </div>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

const ContactLink = ({ icon, color, bg, title, subText, link = "#" }) => (
  <button className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-all group">
    <div
      className={`size-12 rounded-xl ${bg} flex items-center justify-center ${color}`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div className="flex-1 text-left">
      <h4 className="font-bold text-sm lg:text-base text-[#111118] dark:text-white">
        {title}
      </h4>
      <p className="text-xs text-gray-500 font-medium">{subText}</p>
    </div>
    <span className="material-symbols-outlined text-gray-300">
      chevron_right
    </span>
  </button>
);

export default SupportPage;
