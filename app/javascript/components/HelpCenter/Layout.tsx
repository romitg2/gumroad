import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { HelperClientProvider } from "@helperai/react";

import { Button, NavigationButton } from "$app/components/Button";
import { Icon } from "$app/components/Icons";
import { UnreadTicketsBadge } from "$app/components/support/UnreadTicketsBadge";
import { PageHeader } from "$app/components/ui/PageHeader";
import { Tabs, Tab } from "$app/components/ui/Tabs";

interface PageProps {
  [key: string]: unknown;
  helper_host?: string | null;
  helper_session?: {
    email?: string | null;
    emailHash?: string | null;
    timestamp?: number | null;
    customerMetadata?: {
      name?: string | null;
      value?: number | null;
      links?: Record<string, string> | null;
    } | null;
    currentToken?: string | null;
  } | null;
}

export function HelpCenterLayout({ children }: { children: React.ReactNode }) {
  const { helper_host, helper_session } = usePage<PageProps>().props;
  const pathname = window.location.pathname;
  const isHelpArticle = pathname.startsWith("/help") && pathname !== "/help";

  const handleOpenNewTicket = () => {
    router.visit("/support?new_ticket=true");
  };

  return (
    <main>
      <PageHeader
        title="Help Center"
        actions={
          isHelpArticle ? (
            <Link href="/help" className="button" aria-label="Search" title="Search">
              <Icon name="solid-search" />
            </Link>
          ) : (
            <>
              <NavigationButton
                color="accent"
                outline
                href="https://github.com/antiwork/gumroad/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 98 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="currentColor"
                  />
                </svg>
                Report a bug
              </NavigationButton>
              <Button color="accent" onClick={handleOpenNewTicket}>
                New ticket
              </Button>
            </>
          )
        }
      >
        <Tabs>
          <Tab isSelected={pathname.startsWith("/help")} asChild>
            <Link href="/help">Articles</Link>
          </Tab>
          <Tab
            isSelected={pathname.startsWith("/support")}
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/support">
              Support tickets
              {helper_host && helper_session ? (
                <HelperClientProvider host={helper_host} session={helper_session}>
                  <UnreadTicketsBadge />
                </HelperClientProvider>
              ) : null}
            </Link>
          </Tab>
        </Tabs>
      </PageHeader>
      <section className="p-4 md:p-8">{children}</section>
    </main>
  );
}
