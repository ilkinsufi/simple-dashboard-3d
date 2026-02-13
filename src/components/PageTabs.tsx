import { Link, useLocation } from "@tanstack/react-router";

const STORAGE_KEYS = ["designers-storage", "objects-storage"];

function resetStorage() {
  if (!confirm("Clear all data and reset to initial state?")) return;
  for (const key of STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  window.location.reload();
}

export const PageTabs = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-sm border-b border-base-300/50">
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-3 sm:px-6 max-w-7xl mx-auto">
        <nav className="flex rounded-xl bg-base-200/80 p-1 gap-0.5" role="tablist">
          <Link
            to="/designers"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 aria-label="Designers" ${
              path === "/designers"
                ? "bg-base-100 shadow-sm text-base-content"
                : "text-base-content/70 hover:text-base-content hover:bg-base-100/50"
            }`}
          >
            Designers
          </Link>
          <Link
            to="/editor"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 aria-label="Editor" ${
              path === "/editor"
                ? "bg-base-100 shadow-sm text-base-content"
                : "text-base-content/70 hover:text-base-content hover:bg-base-100/50"
            }`}
          >
            Editor
          </Link>
        </nav>
        <button
          type="button"
          onClick={resetStorage}
          className="btn btn-ghost btn-sm text-base-content/60 hover:text-error min-h-9 touch-manipulation"
          aria-label="Reset all data to initial state"
        >
          Reset data
        </button>
      </div>
    </header>
  );
};
