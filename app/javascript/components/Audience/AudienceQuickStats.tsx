import * as React from "react";

import { Icon } from "$app/components/Icons";
import { Stats } from "$app/components/Stats";
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
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns:
          "repeat(auto-fit, minmax(max(min(100%, (31.25rem - 100%) * 1000), min(50% - 1rem, (31.25rem * 2 - 100%) * 1000)), 1fr))",
      }}
    >
      <Stats
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
      <Stats
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
