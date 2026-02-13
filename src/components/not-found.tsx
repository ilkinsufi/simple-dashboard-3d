import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="hero bg-base-200 min-h-dvh">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">Page not found </p>
          <Link
            to="/designers"
            className="btn btn-primary btn-lg rounded-xl"
            aria-label="Go back to Designers page"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
