import { Link } from "@tanstack/react-router";

export const PageTabs = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="tabs tabs-box *:tab *:duration-200">
        <Link to="/designers" className="tab" aria-label="Designers">
          Designers
        </Link>
        <Link to="/editor" className="tab" aria-label="Editor">
          Editor
        </Link>
      </div>
    </div>
  );
};
