import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useState } from "react";
import { useDesignerStore } from "../store/designer";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const openModal = () => {
    setModalKey((k) => k + 1);
    setIsModalOpen(true);
  };

  const handleRemove = (id: string) => {
    removeDesigner(id);
  };

  return (
    <section className="container mx-auto max-w-4xl max-sm:px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Designers</h1>
        <button
          type="button"
          className="btn btn-accent"
          onClick={openModal}
          aria-label="Add new designer"
        >
          Add new
        </button>
      </div>

      {designers.length === 0 ? (
        <p className="mt-4 text-base-content/70">
          No designers yet. Add a new one using the &quot;Add new&quot; button.
        </p>
      ) : (
        <ul className="list mt-4 rounded-box bg-base-100 shadow-md">
          {designers.map((d) => (
            <li key={d.id} className="list-row">
              {d.fullName === "Ilkin Mammadov" ? (
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/daisyui/mark-rotating.svg"
                    alt={d.fullName}
                  />
                </div>
              ) : (
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full bg-neutral text-neutral-content">
                    <span className="text-base">{d.fullName.charAt(0)}</span>
                  </div>
                </div>
              )}

              <div>
                <div>{d.fullName}</div>
                <div className="text-xs font-semibold uppercase opacity-60">
                  {d.workingHours} hours
                </div>
              </div>
              <p className="list-col-wrap text-xs">{d.attachedObjectsCount} attached objects</p>
              <button
                type="button"
                className="btn btn-error btn-soft btn-xs"
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
