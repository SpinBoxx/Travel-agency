import { User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useAdminRoutes = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Users",
        href: "/admin/users",
        icon: User2,
        active: pathname === "/admin/users",
        isDropdown: false,
      },
    ],
    [pathname]
  );
  return routes;
};

export default useAdminRoutes;
