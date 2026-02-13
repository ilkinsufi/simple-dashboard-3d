import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SceneObject } from "../schemas";
import { ObjectSchema } from "../schemas";

function nextId(): string {
  return crypto.randomUUID();
}

interface ObjectFormInput {
  name: string;
  attachedDesignerId: string;
  color: string;
  position: { x: number; y: number; z: number };
  size: "small" | "normal" | "large";
}

interface ObjectsStore {
  objects: SceneObject[];
  addObject: (data: ObjectFormInput) => SceneObject;
  updateObject: (id: string, data: Partial<ObjectFormInput>) => void;
  removeObject: (id: string) => void;
}

export const useObjectsStore = create<ObjectsStore>()(
  persist(
    (set, get) => ({
      objects: [],
      addObject: (data) => {
        const sceneObject = ObjectSchema.parse({
          id: nextId(),
          name: data.name,
          attachedDesignerId: data.attachedDesignerId,
          color: data.color,
          position: data.position,
          size: data.size,
        });
        set((state) => ({ objects: [...state.objects, sceneObject] }));
        return sceneObject;
      },
      updateObject: (id, data) => {
        const current = get().objects.find((o) => o.id === id);
        if (!current) return;
        const updated = ObjectSchema.parse({
          ...current,
          ...data,
          id: current.id,
          position: data.position ?? current.position,
        });
        set((state) => ({
          objects: state.objects.map((o) => (o.id === id ? updated : o)),
        }));
      },
      removeObject: (id) =>
        set((state) => ({ objects: state.objects.filter((o) => o.id !== id) })),
    }),
    { name: "objects-storage" }
  )
);
