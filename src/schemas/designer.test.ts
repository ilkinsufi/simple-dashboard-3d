import { describe, it, expect } from "vitest";
import { DesignerFormSchema } from "./designer";

describe("DesignerFormSchema", () => {
  it("accepts valid form data", () => {
    const result = DesignerFormSchema.safeParse({
      fullName: "John Doe",
      workingHours: 8,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("John Doe");
      expect(result.data.workingHours).toBe(8);
    }
  });

  it("rejects short name", () => {
    const result = DesignerFormSchema.safeParse({
      fullName: "J",
      workingHours: 8,
    });
    expect(result.success).toBe(false);
  });

  it("rejects working hours over 40", () => {
    const result = DesignerFormSchema.safeParse({
      fullName: "John Doe",
      workingHours: 41,
    });
    expect(result.success).toBe(false);
  });
});
