import Link from "next/link";
import { ReactNode } from "react";
import cx from "classnames";

interface INavLinkProps {
  href: string;
  children: ReactNode;
  currentRoute: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
  currentRoute,
  className,
}: INavLinkProps): JSX.Element => {
  const active = currentRoute === href;
  return (
    <Link href={href} passHref>
      <a
        className={cx(
          "lg:text-md rounded-lg px-2 py-3 text-xs text-white transition duration-200 hover:opacity-60 md:px-4 md:text-sm",
          active ? "opacity-100" : "opacity-80",
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
