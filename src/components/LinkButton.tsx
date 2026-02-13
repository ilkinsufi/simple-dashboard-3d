import { Link } from "@tanstack/react-router";

const LinkButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="inline-flex duration-200 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
    >
      {children}
    </Link>
  );
};

export default LinkButton;
