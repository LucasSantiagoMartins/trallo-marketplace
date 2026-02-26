import React from "react";

interface ConfirmLogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={!isLoading ? onClose : undefined}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl scale-in-center border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                    <div className="size-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl">
                            logout
                        </span>
                    </div>

                    <h3 className="clash-font text-xl font-bold mb-2">Terminar Sessão?</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                        Tem certeza que deseja sair da sua conta? Você precisará entrar novamente para acessar seus dados.
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Sim, sair agora"
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold rounded-2xl transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLogoutModal;