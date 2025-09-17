import { HelperClientProvider } from "@helperai/react";
import React from "react";
import { createCast } from "ts-safe-cast";

import { register } from "$app/utils/serverComponentUtil";

import { Button } from "$app/components/Button";
import { UnauthenticatedNewTicketModal } from "$app/components/support/UnauthenticatedNewTicketModal";
import { UnreadTicketsBadge } from "$app/components/support/UnreadTicketsBadge";
import { PageHeader } from "$app/components/ui/PageHeader";
import { Tabs, Tab } from "$app/components/ui/Tabs";
import { useOriginalLocation } from "$app/components/useOriginalLocation";

export function SupportHeader({
  onOpenNewTicket,
  hasHelperSession = true,
  recaptchaSiteKey,
}: {
  onOpenNewTicket: () => void;
  hasHelperSession?: boolean;
  recaptchaSiteKey?: string | null;
}) {
  const { pathname, searchParams } = new URL(useOriginalLocation());
  const isHelpArticle =
    pathname.startsWith(Routes.help_center_root_path()) && pathname !== Routes.help_center_root_path();
  const isAnonymousUserOnHelpCenter = !hasHelperSession && pathname === Routes.help_center_root_path();

  const [isUnauthenticatedNewTicketOpen, setIsUnauthenticatedNewTicketOpen] = React.useState(
    isAnonymousUserOnHelpCenter && !!searchParams.get("new_ticket"),
  );

  React.useEffect(() => {
    if (isAnonymousUserOnHelpCenter) {
      const url = new URL(location.href);
      if (!isUnauthenticatedNewTicketOpen && url.searchParams.get("new_ticket")) {
        url.searchParams.delete("new_ticket");
        history.replaceState(null, "", url.toString());
      }
    }
  }, [isUnauthenticatedNewTicketOpen, isAnonymousUserOnHelpCenter]);

  return (
    <>
      <PageHeader
        title="Help Center"
        actions={
          isHelpArticle ? (
            <a href={Routes.help_center_root_path()} className="button" aria-label="Search" title="Search">
              <span className="icon icon-solid-search"></span>
            </a>
          ) : isAnonymousUserOnHelpCenter ? (
            <Button color="accent" onClick={() => setIsUnauthenticatedNewTicketOpen(true)}>
              Contact support
            </Button>
          ) : hasHelperSession ? (
            <Button color="accent" onClick={onOpenNewTicket}>
              New ticket
            </Button>
          ) : null
        }
      >
        {hasHelperSession ? (
          <Tabs>
            <Tab href={Routes.help_center_root_path()} isSelected={pathname.startsWith(Routes.help_center_root_path())}>
              Articles
            </Tab>
            <Tab
              href={Routes.support_index_path()}
              isSelected={pathname.startsWith(Routes.support_index_path())}
              className="flex items-center gap-2"
            >
              Support tickets
              <UnreadTicketsBadge />
            </Tab>
          </Tabs>
        ) : null}
      </PageHeader>
      {isAnonymousUserOnHelpCenter ? (
        <UnauthenticatedNewTicketModal
          open={isUnauthenticatedNewTicketOpen}
          onClose={() => setIsUnauthenticatedNewTicketOpen(false)}
          onCreated={() => setIsUnauthenticatedNewTicketOpen(false)}
          recaptchaSiteKey={recaptchaSiteKey ?? null}
        />
      ) : null}
    </>
  );
}

type WrapperProps = {
  host?: string | null;
  session?: {
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
  new_ticket_url: string;
  recaptcha_site_key?: string | null;
};

const Wrapper = ({ host, session, new_ticket_url, recaptcha_site_key }: WrapperProps) =>
  host && session ? (
    <HelperClientProvider host={host} session={session}>
      <SupportHeader onOpenNewTicket={() => (window.location.href = new_ticket_url)} />
    </HelperClientProvider>
  ) : (
    <SupportHeader
      onOpenNewTicket={() => (window.location.href = new_ticket_url)}
      hasHelperSession={false}
      recaptchaSiteKey={recaptcha_site_key ?? null}
    />
  );

export default register({ component: Wrapper, propParser: createCast() });
