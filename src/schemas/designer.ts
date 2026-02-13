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
    .min(2, "Ad minimum 2 simvoldan ibarət olmalıdır")
    .max(100, "Ad maksimum 100 simvoldan ibarət olmalıdır")
    .regex(/^[a-zA-ZəöüğıçşƏÖÜĞIÇŞ\s]+$/, "Ad yalnız hərf və boşluq ola bilər"),
  workingHours: z.coerce
    .number()
    .min(0, "İş saatı minimum 0 olmalıdır")
    .max(24, "İş saatı maksimum 24 olmalıdır"),
});

export type Designer = z.infer<typeof DesignerSchema>;
export type DesignerFormData = z.infer<typeof DesignerFormSchema>;
