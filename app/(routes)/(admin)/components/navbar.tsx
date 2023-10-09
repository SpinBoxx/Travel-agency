"use client";

import Container from "@/components/container";
import useAdminRoutes from "@/hooks/use-admin-routes";
import React from "react";
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const routes = useAdminRoutes();
  const session = useSession();
  const router = useRouter();
  console.log(session.data);

  return (
    <div className="fixed left-0 top-0 w-full shrink-0 bg-card  py-2">
      <Container>
        <div className="flex w-full items-center">
          <Link href="/admin" passHref>
            <span className="cursor-pointer text-2xl font-semibold">Admin</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="mr-6"></NavigationMenuItem>
              {routes.map((route) =>
                !route.isDropdown ? (
                  <NavigationMenuItem key={route.label} className="mt-1">
                    <Link
                      href={route.href}
                      passHref
                      legacyBehavior
                      className={cn(
                        route.active ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {route.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{route.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Settings className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components built with Radix
                                UI and Tailwind CSS.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto mt-1">
            {session.data?.user ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => router.push("/login")}>Login</Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
