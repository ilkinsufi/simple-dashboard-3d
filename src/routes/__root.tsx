import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtoolsInProd } from "@tanstack/react-router-devtools";
import { PageTabs } from "../components/PageTabs";
import Footer from "../components/Footer";

const RootLayout = () => {
  const isNotFound = useRouterState({
    select: (s) => s.matches.length === 1 && s.location.pathname !== "/",
  });

  return (
    <div className="min-h-dvh flex flex-col justify-between">
      {!isNotFound && <PageTabs />}
      <main id="main-content">
        <Outlet />
      </main>

      <TanStackRouterDevtoolsInProd position="top-right" />
      {!isNotFound && <Footer />}
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
