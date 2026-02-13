import { useDesignerStore } from "../store/designer";
import { useObjectsStore } from "../store/objects";
import type { Designer, DesignerFormData } from "../schemas";
import type { SceneObject } from "../schemas";

export function getDesigners(): Designer[] {
  return useDesignerStore.getState().designers;
}

export function addDesigner(data: DesignerFormData): void {
  useDesignerStore.getState().addDesigner(data);
}

export function updateDesigner(designer: Designer): void {
  useDesignerStore.getState().updateDesigner(designer);
}

export function removeDesigner(id: string): void {
  useDesignerStore.getState().removeDesigner(id);
}

export function getObjects(): SceneObject[] {
  return useObjectsStore.getState().objects;
}

export function addObject(data: {
  name: string;
  attachedDesignerId: string;
  color: string;
  position: { x: number; y: number; z: number };
  size: "small" | "normal" | "large";
}): SceneObject {
  return useObjectsStore.getState().addObject(data);
}

export function updateObject(
  id: string,
  data: Partial<{
    name: string;
    attachedDesignerId: string;
    color: string;
    position: { x: number; y: number; z: number };
    size: "small" | "normal" | "large";
  }>
): void {
  useObjectsStore.getState().updateObject(id, data);
}

export function removeObject(id: string): void {
  useObjectsStore.getState().removeObject(id);
}
