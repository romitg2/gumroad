import * as React from "react";

import { Icon } from "$app/components/Icons";
import { StatsItem } from "$app/components/Stats";
import { useUserAgentInfo } from "$app/components/UserAgent";

export const AudienceQuickStats = ({
  totalFollowers,
  newFollowers,
}: {
  totalFollowers: number;
  newFollowers: number | null;
}) => {
  const userAgentInfo = useUserAgentInfo();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatsItem
        className="total-followers"
        title={
          <>
            <Icon name="circle-fill" className="text-accent" />
            Lifetime followers
            <div className="legend" />
          </>
        }
        value={newFollowers != null ? totalFollowers.toLocaleString(userAgentInfo.locale) : ""}
      />
      <StatsItem
        className="new-followers"
        title={
          <>
            <Icon name="circle-fill" className="text-muted-foreground" />
            New followers
            <div className="legend" />
          </>
        }
        value={newFollowers != null ? newFollowers.toLocaleString(userAgentInfo.locale) : ""}
      />
    </div>
  );
};
