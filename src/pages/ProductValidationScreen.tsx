import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';

const ProductValidation: React.FC = () => {
  // Estado para controlar o passo atual (1 a 4)
  const [currentStep, setCurrentStep] = useState(4);
  const [notes, setNotes] = useState<string>('');
  const maxChars = 300;

  // Cores da sua identidade visual (extraídas do seu código Home)
  const colors = {
    primary: "hsl(262 91% 61%)",
    background: "#f6f5f8",
    darkBackground: "#141022",
    cardDark: "#1e1b2e", // Um pouco mais claro que o fundo para contraste
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Usando seu componente PageHeader com ícones Symbols */}
      <PageHeader 
        title="Validar Produto" 
        backTo={-1}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        
        {/* Stepper Funcional e Melhorado */}
        <div className="flex items-center gap-3 mb-10 max-w-[500px] lg:max-w-full mx-auto">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 flex flex-col gap-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 overflow-hidden ${
                  step <= currentStep ? "" : "bg-slate-200 dark:bg-slate-800"
                }`}
                style={{ backgroundColor: step < currentStep ? colors.primary : undefined }}
              >
                {/* Efeito de progresso interno para o passo atual */}
                {step === currentStep && (
                  <div 
                    className="h-full bg-primary animate-in slide-in-from-left duration-1000"
                    style={{ backgroundColor: colors.primary, width: '60%' }} 
                  />
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter text-center ${
                step === currentStep ? "text-primary" : "text-slate-400"
              }`} style={{ color: step === currentStep ? colors.primary : undefined }}>
                Passo {step}
              </span>
            </div>
          ))}
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Coluna 1: Produto e Fotos */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl shadow-sm flex items-center gap-5 border border-white/5 backdrop-blur-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-white/10">
                <img 
                  alt="Samsung Galaxy S21" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC13_f0tX2QDY0bsHh0H2JOYsRjhzt4TIQgNjUxRqn5YkTNy8YnpGF_VvM9R6fuR0sylC82mjtiX0cv5GJYn-W8EkbiblrT_viRFzYzFnQuAlHYjSYes-jedBCaJ25RWsmRW-xbBDJOpsQNIT2jUHahbVOAGZOHpZ7RCD-xYvsODRWZ-PsFO9G0BPjVP-sbEoO567Hr5e-ii_yJlJi6od5yCmiF8465LSvC1GNpYG6gWDLlhdA1ytC20b8mwtNakyOD4iUB1lT9cfrp" 
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest" style={{ color: colors.primary }}>Tech • Semi-novo</span>
                <h2 className="text-xl font-bold leading-tight mt-1">Samsung Galaxy S21 Ultra</h2>
                <p className="text-2xl font-black mt-1">450.000 <span className="text-sm font-medium">Kz</span></p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Galeria de Fotos</h3>
                  <p className="text-xs text-slate-400">Mínimo de 3 fotos necessárias</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-primary/10 rounded-full" style={{ color: colors.primary, backgroundColor: `${colors.primary}15` }}>4 / 6</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all">
                    <img 
                      alt={`Upload ${id}`} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" 
                      src={`http://googleusercontent.com/profile/picture/${id}`} 
                    />
                    <button className="absolute top-2 right-2 size-8 bg-black/40 hover:bg-red-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all">
                      <span className="material-symbols-outlined text-white text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center bg-white dark:bg-white/5 hover:bg-primary/5 hover:border-primary transition-all group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-3xl transition-colors">add_a_photo</span>
                </button>
              </div>
            </section>
          </div>

          {/* Coluna 2: Upload de Vídeo e Validação */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Vídeo de Demonstração</h3>
              <div className="relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-primary transition-all bg-white dark:bg-white/5 p-8 text-center">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-4xl" style={{ color: colors.primary }}>videocam</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Gravar ou Enviar Vídeo</h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-[200px] mx-auto">Mostre o produto em funcionamento (Máx. 30s)</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Notas Adicionais</h3>
              <div className="relative">
                <textarea 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 min-h-[160px] text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none shadow-sm"
                  placeholder="Ex: Possui um pequeno detalhe no canto superior..."
                  maxLength={maxChars}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{'--tw-ring-color': colors.primary} as React.CSSProperties}
                ></textarea>
                <div className="absolute bottom-4 right-4 text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                  {notes.length} / {maxChars}
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 bg-slate-900 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
                 <span className="material-symbols-outlined text-primary" style={{ color: colors.primary }}>verified_user</span>
                 <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                   A nossa equipa de curadoria irá validar os detalhes técnicos e as fotos para garantir a segurança da venda.
                 </p>
              </div>
            </section>

            <button 
              className="w-full h-16 rounded-2xl flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.98] text-white font-bold text-lg"
              style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #8b63ff 100%)`, boxShadow: `0 10px 30px -10px ${colors.primary}60` }}
            >
              <span>Submeter para Aprovação</span>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </main>

      {/* Decorações de fundo como no seu Home */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" style={{ backgroundColor: `${colors.primary}08` }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" style={{ backgroundColor: `${colors.primary}08` }} />
      </div>
    </div>
  );
};

export default ProductValidation;