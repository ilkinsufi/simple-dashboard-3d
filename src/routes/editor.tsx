import { createFileRoute, HeadContent, Link } from "@tanstack/react-router";

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

function RouteComponent() {
  return (
    <div className="">
      Editor Page <br />
      <Link to="/designers">Back to Designers</Link>
    </div>
  );
}
