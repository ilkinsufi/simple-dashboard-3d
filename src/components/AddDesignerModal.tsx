import { useState, useRef, useEffect } from "react";
import { DesignerFormSchema } from "../schemas";
import { addDesigner } from "../api";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MODAL_TITLE_ID = "add-designer-modal-title";

export function AddDesignerModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [workingHoursError, setWorkingHoursError] = useState("");

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
      firstInputRef.current?.focus();
    } else {
      el.close();
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFullNameError("");
    setWorkingHoursError("");

    const result = DesignerFormSchema.safeParse({
      fullName: fullName.trim(),
      workingHours: workingHours === "" ? undefined : Number(workingHours),
    });

    if (result.success === false) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === "fullName") {
          setFullNameError(issue.message);
        }
        if (issue.path[0] === "workingHours") {
          setWorkingHoursError(issue.message);
        }
      }
      return;
    }

    addDesigner(result.data);
    onClose();
    setFullName("");
    setWorkingHours("");
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={MODAL_TITLE_ID}
      aria-modal="true"
    >
      <div className="modal-box">
        <h2 id={MODAL_TITLE_ID} className="text-lg font-bold">
          Add new designer
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Full name</legend>
            <input
              ref={firstInputRef}
              type="text"
              placeholder="Example: John Myung"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError("");
              }}
              className={fullNameError ? "input input-error w-full" : "input w-full"}
              aria-invalid={fullNameError !== ""}
              aria-describedby={fullNameError ? "fullName-error" : undefined}
              autoComplete="name"
            />
            {fullNameError !== "" && (
              <p id="fullName-error" className="mt-1 text-sm text-error" role="alert">
                {fullNameError}
              </p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Working hours (0–24)</legend>
            <input
              type="number"
              min={0}
              max={24}
              step={1}
              placeholder="Example: 8"
              value={workingHours}
              onChange={(e) => {
                setWorkingHours(e.target.value);
                setWorkingHoursError("");
              }}
              className={workingHoursError ? "input input-error w-full" : "input w-full"}
              aria-invalid={workingHoursError !== ""}
              aria-describedby={workingHoursError ? "workingHours-error" : undefined}
            />
            {workingHoursError !== "" && (
              <p id="workingHours-error" className="mt-1 text-sm text-error" role="alert">
                {workingHoursError}
              </p>
            )}
          </fieldset>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose} aria-label="Cancel and close">
              Cancel
            </button>
            <button
              type="submit"
              className={`btn ${fullName.trim() === "" || workingHours === "" || workingHoursError !== "" || fullNameError !== "" ? "btn-disabled" : "btn-secondary"}`}
              aria-label="Add designer"
            >
              Add designer
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={onClose} aria-label="Close modal">
          close
        </button>
      </form>
    </dialog>
  );
}
