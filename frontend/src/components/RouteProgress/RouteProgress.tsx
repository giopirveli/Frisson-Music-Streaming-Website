"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 120 });

export default function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    NProgress.start();                     // ↙️ როგორც კი route იცვლება, იწყებს progress bar-ს
    const t = setTimeout(() => NProgress.done(), 400); 
    // ↳ ცოტა ხნის მერე (400ms) ასრულებს progress-ს
    return () => clearTimeout(t);          // cleanup, თუ route ისევ შეიცვალა
  }, [pathname, search]); // effect ჩაირთვება ყოველ ჯერზე, როცა URL შეიცვლება

  return null;
}
