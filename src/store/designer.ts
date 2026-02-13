import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Designer, DesignerFormData } from "../schemas";
import { DesignerSchema } from "../schemas";

function nextId(): string {
  return crypto.randomUUID();
}

interface DesignerStore {
  designers: Designer[];
  addDesigner: (data: DesignerFormData) => void;
  removeDesigner: (id: string) => void;
  updateDesigner: (designer: Designer) => void;
}

export const useDesignerStore = create<DesignerStore>()(
  persist(
    (set) => ({
      designers: [],
      addDesigner: (data) => {
        const designer = DesignerSchema.parse({
          id: nextId(),
          fullName: data.fullName,
          workingHours: data.workingHours,
          attachedObjectsCount: 0,
        });
        set((state) => ({ designers: [...state.designers, designer] }));
      },
      removeDesigner: (id) =>
        set((state) => ({ designers: state.designers.filter((d) => d.id !== id) })),
      updateDesigner: (designer) => {
        const parsed = DesignerSchema.parse(designer);
        set((state) => ({
          designers: state.designers.map((d) => (d.id === parsed.id ? parsed : d)),
        }));
      },
    }),
    { name: "designers-storage" }
  )
);
