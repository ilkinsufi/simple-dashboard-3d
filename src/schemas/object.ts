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
  name: z.string().min(1).max(100),
  attachedDesignerId: z.string().min(1),
  color: z.string().min(1),
  position: ObjectPositionSchema,
  size: ObjectSize,
});

export const ObjectFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(100, "Name must be at most 100 characters long"),
  attachedDesignerId: z.string().min(1, "Designer must be selected"),
  color: z.string().min(1, "Color must be selected"),
  position: ObjectPositionSchema.optional(),
  size: ObjectSize,
});

export const ObjectEditSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Max 100 chars"),
  attachedDesignerId: z.string().min(1, "Pick a designer"),
  color: z.string().min(1),
  size: ObjectSize,
  position: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    z: z.coerce.number(),
  }),
});

export type SceneObject = z.infer<typeof ObjectSchema>;
export type ObjectFormData = z.infer<typeof ObjectFormSchema>;
