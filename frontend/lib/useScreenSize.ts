import { useEffect, useState } from "react";

interface ScreenSize {
  width: number | null;
  height: number | null;
  isMobile: boolean;
}

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: null,
    height: null,
    isMobile: false,
  });

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // Define mobile breakpoint (768px - Tailwind's md breakpoint)
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    // Update screen size and mobile status
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: mobileQuery.matches,
      });
    };

    // Set initial values
    updateScreenSize();

    // Add event listeners
    window.addEventListener("resize", updateScreenSize);
    mobileQuery.addEventListener("change", updateScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateScreenSize);
      mobileQuery.removeEventListener("change", updateScreenSize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
