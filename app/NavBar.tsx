"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classname from "classnames";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  function getStatus() {
    if (status === "authenticated") return ["Log out", "/api/auth/signout"];
    if (status === "unauthenticated") return ["Log in", "/api/auth/signin"];
    if (status === "loading") return ["", ""];
    return ["", ""]; // Just because it doesn't recognize status necessary fall at one of the three if's above
  }

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    {
      label: getStatus()[0],
      href: getStatus()[1],
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-5">
      <Link href="/">
        <AiFillBug size={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={links.indexOf(link)}>
            <Link
              href={link.href}
              className={classname({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
