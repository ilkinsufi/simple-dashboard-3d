import { z } from "zod";

export const DesignerSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2).max(100),
  workingHours: z.number().min(0).max(24),
  attachedObjectsCount: z.number().min(0).default(0),
});

export const DesignerFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must be at most 100 characters long")
    .regex(/^[a-zA-ZəöüğıçşƏÖÜĞIÇŞ\s]+$/, "Full name must only contain letters and spaces"),
  workingHours: z.coerce
    .number()
    .refine((n) => !Number.isNaN(n), "Working hours must be a number between 0 and 24")
    .min(0, "Working hours must be at least 0")
    .max(24, "Working hours must be at most 24"),
});

export type Designer = z.infer<typeof DesignerSchema>;
export type DesignerFormData = z.infer<typeof DesignerFormSchema>;
