import { useState, useRef, useEffect } from "react";
import { ObjectFormSchema } from "../schemas";
import { addObject } from "../api";
import type { Designer } from "../schemas";

type Props = {
  open: boolean;
  onClose: () => void;
  designers: Designer[];
};

const COLORS = [
  { value: "#ef4444", label: "Red" },
  { value: "#22c55e", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#eab308", label: "Yellow" },
  { value: "#a855f7", label: "Purple" },
  { value: "#f97316", label: "Orange" },
];

export function AddObjectModal({ open, onClose, designers }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [designerId, setDesignerId] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState<"small" | "normal" | "large">("normal");
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posZ, setPosZ] = useState(0);
  const [nameError, setNameError] = useState("");
  const [designerError, setDesignerError] = useState("");

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (designers.length > 0 && !designerId) setDesignerId(designers[0].id);
    } else {
      el.close();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, designers.length]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameError("");
    setDesignerError("");

    const result = ObjectFormSchema.safeParse({
      name: name.trim(),
      attachedDesignerId: designerId,
      color,
      position: { x: posX, y: posY, z: posZ },
      size,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "name") setNameError(issue.message);
        if (issue.path[0] === "attachedDesignerId") setDesignerError(issue.message);
      }
      return;
    }

    addObject({
      name: result.data.name,
      attachedDesignerId: result.data.attachedDesignerId,
      color: result.data.color,
      position: result.data.position!,
      size: result.data.size,
    });
    onClose();
    setName("");
    setDesignerId(designers[0]?.id ?? "");
    setPosX(0);
    setPosY(0);
    setPosZ(0);
  }

  return (
    <dialog ref={dialogRef} className="modal" aria-modal="true">
      <div className="modal-box max-h-[90dvh] overflow-y-auto rounded-2xl shadow-xl">
        <h2 className="text-lg font-bold">Add new object</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Object name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className={nameError ? "input input-error w-full" : "input w-full"}
            />
            {nameError && <p className="mt-1 text-sm text-error">{nameError}</p>}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Designer</span>
            </label>
            <select
              value={designerId}
              onChange={(e) => {
                setDesignerId(e.target.value);
                setDesignerError("");
              }}
              className={designerError ? "select select-error w-full" : "select w-full"}
            >
              <option value="">Select...</option>
              {designers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName}
                </option>
              ))}
            </select>
            {designerError && <p className="mt-1 text-sm text-error">{designerError}</p>}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Color</span>
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="select w-full"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Size</span>
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as "small" | "normal" | "large")}
              className="select w-full"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Position (X, Y, Z)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step={0.5}
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="input w-full"
                placeholder="X"
              />
              <input
                type="number"
                step={0.5}
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="input w-full"
                placeholder="Y"
              />
              <input
                type="number"
                step={0.5}
                value={posZ}
                onChange={(e) => setPosZ(Number(e.target.value))}
                className="input w-full"
                placeholder="Z"
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-accent">
              Add
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
