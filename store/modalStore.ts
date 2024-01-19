import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  modalState: string;
  onClose: () => void;
  toggleModal: () => void;
  setModalState: (state: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modalState: "login",
  isOpen: false,
  onClose: () => set((state) => ({ isOpen: false })),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setModalState: (modalStateString) =>
    set((state) => ({ modalState: modalStateString })),
}));

export { useModalStore };
