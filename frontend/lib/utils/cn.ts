import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/*
 * Utility function to merge Tailwind classes and apply conditional classes
 *
 * Usage Example:
 *  <div className={cn("text-white", index === 0 && "text-black", className)}>
 *    Hello World
 *  </div>
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
