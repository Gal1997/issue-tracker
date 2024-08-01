import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-5">
      <Link href="/">
        <AiFillBug size={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            href={link.href}
            className="text-zinc-500 hover:text-zinc-950 transition-colors"
            key={links.indexOf(link)}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
