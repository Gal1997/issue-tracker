"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classname from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Spinner,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavBar = () => {
  return (
    <nav className="border-b pb-2 mx-5 mt-3 mb-1">
      <Flex justify="between" height={"3rem"}>
        <NavLinks />
        <Flex mr={"1rem"}>
          <AuthStatus />
        </Flex>
      </Flex>
    </nav>
  );
};

const AuthStatus = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="2rem" height="2rem" />;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link mt-4">
        Login
      </Link>
    );

  if (status === "authenticated")
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            size="3"
            src={session?.user?.image || undefined}
            radius="full"
            fallback={session?.user?.email?.charAt(0) || "?"}
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="red"
            onClick={() => router.push("/api/auth/signout")}
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <Flex className="space-x-6" align="center">
      <Link href="/">
        <AiFillBug size={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={links.indexOf(link)}>
            <Link
              href={link.href}
              className={classname({
                "!text-zinc-900 font-semibold": link.href === currentPath,
                "nav-link": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

export default NavBar;
