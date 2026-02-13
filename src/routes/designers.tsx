import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

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
  return (
    <div className="">
      Designers Page <br />
      <Link to="/editor"> Go to Editor</Link>
    </div>
  );
}
