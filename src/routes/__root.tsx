import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PageTabs } from "../components/PageTabs";
import Footer from "../components/Footer";

const RootLayout = () => {
  const isNotFound = useRouterState({
    select: (s) => s.matches.length === 1 && s.location.pathname !== "/",
  });

  return (
    <div className="min-h-dvh h-dvh flex flex-col overflow-hidden">
      {!isNotFound && <PageTabs />}
      <main id="main-content" className="flex-1 min-h-0 flex flex-col overflow-auto">
        <Outlet />
      </main>

      {/* <TanStackRouterDevtools position="top-right" /> */}
      {!isNotFound && <Footer />}
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
