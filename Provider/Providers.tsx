"use client";

import { useEffect } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { getTokenExpiryMs } from "@/lib/jwt";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const logout = () => {
      localStorage.removeItem("accessToken");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax";

      if (window.location.pathname !== "/login") {
        router.replace("/login");
        router.refresh();
      }
    };

    const expiryMs = getTokenExpiryMs(token);

    if (!expiryMs) {
      logout();
      return;
    }

    const remainingMs = expiryMs - Date.now();

    if (remainingMs <= 0) {
      logout();
      return;
    }

    const timerId = window.setTimeout(logout, remainingMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [pathname, router]);

  return <Provider store={store}>{children}</Provider>;
}
