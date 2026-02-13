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
    <section className="container max-w-4xl mx-auto max-sm:px-5">
      Editor Page <br />
      <Link to="/designers" className="btn btn-primary">
        Back to Designers
      </Link>
    </section>
  );
}
