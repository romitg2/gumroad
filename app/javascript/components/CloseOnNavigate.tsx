import { router } from "@inertiajs/react";
import * as React from "react";

import { useNav } from "$app/components/Nav";

/**
 * CloseOnNavigate - Client-side only component for Inertia navigation
 * It automatically closes the mobile nav when navigating between pages.
 *
 * since components/Nav.tsx is also used in ssr pages, so we can't import inertia router there.
 */

export const CloseOnNavigate = () => {
  const nav = useNav();
  const close = nav?.close;

  React.useEffect(() => {
    if (!close) return;
    return router.on("before", close);
  }, [close]);

  return null;
};
