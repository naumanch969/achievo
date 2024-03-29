import { Diary } from "@prisma/client";
import { create } from "zustand";

interface Props {
  formOpen: boolean;
  viewOpen: boolean;
  diary: Diary | null;
  onFormOpen: () => void;
  onFormClose: () => void;
  onViewOpen: () => void;
  onViewClose: () => void;
  setDiary: (diary: Diary | null) => void;
}

export const useDiaryModal = create<Props>((set) => ({
  formOpen: false,
  viewOpen: false,
  diary: null,
  onFormOpen: () => set({ formOpen: true, viewOpen: false }),
  onFormClose: () => set({ formOpen: false }),
  onViewOpen: () => set({ viewOpen: true, formOpen: false }),
  onViewClose: () => set({ viewOpen: false }),
  setDiary: (diary) => set({ diary }),
}));
