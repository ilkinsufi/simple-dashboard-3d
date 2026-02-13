import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useDesignerStore } from "../store/designer";
import { useObjectsStore } from "../store/objects";
import { removeDesigner } from "../api";
import { AddDesignerModal } from "../components/AddDesignerModal";

export const Route = createFileRoute("/designers")({
  component: () => (
    <>
      <RouteComponent />
      <HeadContent />
    </>
  ),
  head: () => ({
    meta: [{ title: "Designers" }],
  }),
});

function RouteComponent() {
  const designers = useDesignerStore((state) => state.designers);
  const objects = useObjectsStore((state) => state.objects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const countByDesignerId = useMemo(() => {
    const map: Record<string, number> = {};
    for (const obj of objects) {
      map[obj.attachedDesignerId] = (map[obj.attachedDesignerId] ?? 0) + 1;
    }
    return map;
  }, [objects]);

  const openModal = () => {
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const handleRemove = (id: string) => {
    removeDesigner(id);
  };

  return (
    <section className="container mx-auto max-w-4xl px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">
          Designers
        </h1>
        <button
          type="button"
          className="btn btn-primary rounded-xl shadow-sm hover:shadow-md transition-shadow"
          onClick={openModal}
          aria-label="Add new designer"
        >
          Add new
        </button>
      </div>

      {designers.length === 0 ? (
        <div className="mt-8 p-8 rounded-2xl bg-base-200/50 border border-base-300/50 text-center">
          <p className="text-base-content/70">
            No designers yet. Add a new one using the &quot;Add new&quot; button.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {designers.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-base-100 border border-base-300/50 shadow-sm hover:shadow-md hover:border-base-300 transition-all duration-200"
            >
              {d.fullName === "Ilkin Mammadov" ? (
                <img
                  className="size-12 rounded-full object-cover object-center shrink-0 border border-base-300/50"
                  src="https://img.daisyui.com/images/daisyui/mark-rotating.svg"
                  alt={d.fullName}
                />
              ) : (
                <div
                  className="size-12 shrink-0 rounded-full bg-base-300 flex items-center justify-center text-base-content font-semibold text-lg select-none"
                  aria-hidden
                >
                  {d.fullName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="font-semibold text-base-content">{d.fullName}</div>
                <div className="text-sm text-base-content/60">
                  {d.workingHours} h/week · {countByDesignerId[d.id] ?? 0} objects
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl"
                onClick={() => handleRemove(d.id)}
                aria-label={`Remove designer ${d.fullName}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddDesignerModal key={modalKey} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
