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
  console.log(currentRoute);
  return (
    <Link href={href} passHref>
      <a
        className={cx(
          "rounded-lg px-4 py-3 text-white transition duration-200 hover:opacity-60",
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
