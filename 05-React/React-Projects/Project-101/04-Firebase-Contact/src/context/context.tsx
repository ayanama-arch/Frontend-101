// ModalContext.tsx
import { createContext, useState, ReactNode } from "react";

type ModalType = {
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const ModalContext = createContext<ModalType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const onClose = () => setVisible(false);
  const onOpen = () => setVisible(true);

  return (
    <ModalContext.Provider value={{ isVisible, onClose, onOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
