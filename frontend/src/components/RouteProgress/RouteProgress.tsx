"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 120 });

export default function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const t = setTimeout(() => NProgress.done(), 400);
    return () => clearTimeout(t);
  }, [pathname, search]);

  return null;
}
