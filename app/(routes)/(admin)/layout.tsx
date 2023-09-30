import React, { ReactNode } from "react";
import AdminNavbar from "./components/navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <AdminNavbar />
      <div className="pt-16">{children}</div>
    </div>
  );
}
