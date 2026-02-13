import { z } from "zod";

export const ObjectSize = z.enum(["small", "normal", "large"]);
export type ObjectSizeType = z.infer<typeof ObjectSize>;

export const ObjectPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export const ObjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Ad boş ola bilməz").max(100),
  attachedDesignerId: z.string().min(1, "Dizayner seçilməlidir"),
  color: z.string().min(1, "Rəng seçilməlidir"),
  position: ObjectPositionSchema,
  size: ObjectSize,
});

export const ObjectFormSchema = ObjectSchema.omit({ id: true }).partial({
  position: true,
});

export type SceneObject = z.infer<typeof ObjectSchema>;
export type ObjectFormData = z.infer<typeof ObjectFormSchema>;
