import { createFileRoute, HeadContent } from "@tanstack/react-router";
import LinkButton from "../components/LinkButton";

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
    <div className="container mx-auto max-sm:px-4">
      Designers Page <br />
      <LinkButton to="/editor"> Go to Editor</LinkButton>
    </div>
  );
}
