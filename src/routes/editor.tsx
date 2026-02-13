import { createFileRoute, HeadContent } from "@tanstack/react-router";
import LinkButton from "../components/LinkButton";

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
      <LinkButton to="/designers">Back to Designers</LinkButton>
    </div>
  );
}
