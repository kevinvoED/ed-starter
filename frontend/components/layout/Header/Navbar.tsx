import { cn } from "@/lib/cn";

type NavbarProps = {
  className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
  return <div className={cn("bg-white text-black", className)}>Navbar</div>;
};
