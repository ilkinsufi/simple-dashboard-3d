import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PageTabs } from "../components/PageTabs";

const RootLayout = () => {
  const isNotFound = useRouterState({
    select: (s) => s.matches.length === 1 && s.location.pathname !== "/",
  });

  return (
    <div className="min-h-screen">
      {!isNotFound && <PageTabs />}
      <main id="main-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
