import { useEffect } from "react";

interface ModalProps {
    onClose: () => void,
    children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-background-secondary rounded-xl shadow-lg p-6 sm:p-8 max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
}
