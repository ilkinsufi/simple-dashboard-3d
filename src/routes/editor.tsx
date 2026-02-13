import { useState, useEffect } from "react";
import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Scene3D } from "../components/Scene3D";
import { AddObjectModal } from "../components/AddObjectModal";
import { useObjectsStore } from "../store/objects";
import { useDesignerStore } from "../store/designer";
import { updateObject, removeObject } from "../api";

export const Route = createFileRoute("/editor")({
  component: () => (
    <>
      <RouteComponent />
      <HeadContent />
    </>
  ),
  head: () => ({
    meta: [{ title: "Editor" }],
  }),
});

const COLORS = [
  { value: "#ef4444", label: "Red" },
  { value: "#22c55e", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#eab308", label: "Yellow" },
  { value: "#a855f7", label: "Purple" },
  { value: "#f97316", label: "Orange" },
];

function RouteComponent() {
  const objects = useObjectsStore((s) => s.objects);
  const designers = useDesignerStore((s) => s.designers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const selectedObject = selectedId ? objects.find((o) => o.id === selectedId) : null;

  return (
    <section className="flex-1 flex flex-col min-h-0 h-full">
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-4 px-3 sm:px-4 py-3">
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-4 overflow-y-auto">
          <div className="rounded-2xl bg-base-100 border border-base-300/50 shadow-sm overflow-hidden">
            <div className="p-4">
              <h2 className="font-semibold text-base-content mb-3">Objects</h2>
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-xl w-full sm:w-auto"
                onClick={() => setAddModalOpen(true)}
              >
                + Add object
              </button>
              {designers.length === 0 && (
                <p className="mt-3 text-sm text-base-content/60">
                  Add at least one designer on the Designers page first.
                </p>
              )}
            </div>
          </div>

          {objects.length > 0 && (
            <div className="rounded-2xl bg-base-100 border border-base-300/50 shadow-sm overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-sm text-base-content mb-2">List</h3>
                <ul className="space-y-0.5">
                  {objects.map((obj) => {
                    const designer = designers.find((d) => d.id === obj.attachedDesignerId);
                    const isSelected = selectedId === obj.id;
                    return (
                      <li key={obj.id}>
                        <button
                          type="button"
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 border-l-4 ${
                            isSelected
                              ? "bg-primary/15 border-primary font-medium"
                              : "border-transparent hover:bg-base-200/80"
                          }`}
                          onClick={() => setSelectedId(isSelected ? null : obj.id)}
                        >
                          <span className="text-base-content">{obj.name}</span>
                          {designer && (
                            <span className="block text-xs text-base-content/60 truncate">
                              {designer.fullName}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {selectedObject && (
            <EditPanel
              object={selectedObject}
              designers={designers}
              onClose={() => setSelectedId(null)}
              onSave={(data) => {
                updateObject(selectedObject.id, data);
              }}
              onDelete={() => {
                removeObject(selectedObject.id);
                setSelectedId(null);
              }}
            />
          )}
        </aside>

        <div className="flex-1 min-h-0 flex flex-col rounded-2xl overflow-hidden border border-base-300/50 shadow-sm bg-base-100">
          <Scene3D objects={objects} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>

      <AddObjectModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        designers={designers}
      />
    </section>
  );
}

type EditPanelProps = {
  object: {
    id: string;
    name: string;
    attachedDesignerId: string;
    color: string;
    position: { x: number; y: number; z: number };
    size: "small" | "normal" | "large";
  };
  designers: { id: string; fullName: string }[];
  onClose: () => void;
  onSave: (data: {
    name: string;
    attachedDesignerId: string;
    color: string;
    position: { x: number; y: number; z: number };
    size: "small" | "normal" | "large";
  }) => void;
  onDelete: () => void;
};

function EditPanel({ object, designers, onClose, onSave, onDelete }: EditPanelProps) {
  const [name, setName] = useState(object.name);
  const [designerId, setDesignerId] = useState(object.attachedDesignerId);
  const [color, setColor] = useState(object.color);
  const [size, setSize] = useState(object.size);
  const [posX, setPosX] = useState(object.position.x);
  const [posY, setPosY] = useState(object.position.y);
  const [posZ, setPosZ] = useState(object.position.z);

  useEffect(() => {
    setName(object.name);
    setDesignerId(object.attachedDesignerId);
    setColor(object.color);
    setSize(object.size);
    setPosX(object.position.x);
    setPosY(object.position.y);
    setPosZ(object.position.z);
  }, [object]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      attachedDesignerId: designerId,
      color,
      position: { x: posX, y: posY, z: posZ },
      size,
    });
  }

  return (
    <div className="rounded-2xl bg-base-100 border border-base-300/50 shadow-sm overflow-hidden">
      <div className="p-4">
        <h3 className="font-semibold text-base-content mb-3">Edit object</h3>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="label py-1">
              <span className="label-text text-sm">Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-sm w-full"
            />
          </div>
          <div>
            <label className="label py-1">
              <span className="label-text text-sm">Designer</span>
            </label>
            <select
              value={designerId}
              onChange={(e) => setDesignerId(e.target.value)}
              className="select select-sm w-full"
            >
              {designers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label py-1">
              <span className="label-text text-sm">Color</span>
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="select select-sm w-full"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label py-1">
              <span className="label-text text-sm">Size</span>
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as "small" | "normal" | "large")}
              className="select select-sm w-full"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="label py-1">
              <span className="label-text text-sm">Position (X, Y, Z)</span>
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                step={0.5}
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="input input-sm w-full"
              />
              <input
                type="number"
                step={0.5}
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="input input-sm w-full"
              />
              <input
                type="number"
                step={0.5}
                value={posZ}
                onChange={(e) => setPosZ(Number(e.target.value))}
                className="input input-sm w-full"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-3">
            <button type="submit" className="btn btn-sm btn-primary rounded-xl">
              Save
            </button>
            <button type="button" className="btn btn-sm btn-ghost rounded-xl" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-sm btn-error btn-outline rounded-xl"
              onClick={() => {
                if (confirm("Are you sure you want to delete this object?")) onDelete();
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
