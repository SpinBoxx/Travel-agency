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

export default function AdminNavbar() {
  const routes = useAdminRoutes();

  return (
    <div className="fixed left-0 top-0 w-full shrink-0 bg-card  py-2">
      <Container>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="mr-6">
              <Link href="/administration" passHref>
                <span className="cursor-pointer text-2xl font-semibold">
                  Admin
                </span>
              </Link>
            </NavigationMenuItem>
            {routes.map((route) =>
              !route.isDropdown ? (
                <NavigationMenuItem className="mt-1">
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
                      <ListItem href="/docs/installation" title="Installation">
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
      </Container>
    </div>
  );
}
