import { describe, it, expect } from "vitest";
import { ObjectFormSchema, ObjectEditSchema } from "./object";

describe("ObjectFormSchema", () => {
  it("accepts valid object form data", () => {
    const result = ObjectFormSchema.safeParse({
      name: "Box 1",
      attachedDesignerId: "designer-1",
      color: "#ff0000",
      size: "normal",
      position: { x: 0, y: 0, z: 0 },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Box 1");
      expect(result.data.size).toBe("normal");
    }
  });

  it("rejects empty name", () => {
    const result = ObjectFormSchema.safeParse({
      name: "",
      attachedDesignerId: "designer-1",
      color: "#ff0000",
      size: "normal",
    });
    expect(result.success).toBe(false);
  });
});

describe("ObjectEditSchema", () => {
  it("accepts valid edit data with position", () => {
    const result = ObjectEditSchema.safeParse({
      name: "Box 1",
      attachedDesignerId: "designer-1",
      color: "#ff0000",
      size: "large",
      position: { x: 1, y: 2, z: 3 },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.position.x).toBe(1);
      expect(result.data.position.y).toBe(2);
      expect(result.data.size).toBe("large");
    }
  });
});
