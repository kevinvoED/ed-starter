import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This is a utility function for merging and resolving duplicate or conflicting class names
 * Basic usage example:
 * const className = cn("bg-red-500", "text-white", "bg-blue-500");
 * console.log(className); // "text-white bg-blue-500"
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}