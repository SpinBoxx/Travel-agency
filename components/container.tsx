import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="h-full px-6 lg:mx-auto lg:max-w-6xl">{children}</div>;
}
