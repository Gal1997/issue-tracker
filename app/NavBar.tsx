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

const NavBar = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Flex justify="between">
        <Flex className="space-x-6">
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
        </Flex>
        <Flex mr={"1rem"}>
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}

          {status === "authenticated" && (
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
          )}
          {status === "loading" && <Spinner size={"3"} />}
        </Flex>
      </Flex>
    </nav>
  );
};

export default NavBar;
