import * as React from "react";
import { Link } from "@inertiajs/react";

import { PageHeader } from "$app/components/ui/PageHeader";
import { Tabs, Tab } from "$app/components/ui/Tabs";

const pageNames = {
  widgets: "Widgets",
  ping: "Ping",
  api: "API",
};

export const Layout = ({
  currentPage,
  children,
}: {
  currentPage: keyof typeof pageNames;
  children?: React.ReactNode;
}) => (
  <div>
    <PageHeader title={pageNames[currentPage]}>
      <Tabs>
        {Object.entries(pageNames).map(([page, name]) => {
          if (page === "widgets") {
            return (
              <Tab key={page} isSelected={page === currentPage} href={Routes[`${page}_path`]()}>
                {name}
              </Tab>
            );
          } else if (page === "ping") {
            return (
              <Link key={page} href={Routes[`${page}_path`]()} as="div">
                <Tab isSelected={page === currentPage}>{name}</Tab>
              </Link>
            );
          } else if (page === "api") {
            return (
              <Link key={page} href={Routes[`${page}_path`]()} as="div">
                <Tab isSelected={page === currentPage}>{name}</Tab>
              </Link>
            );
          }
        })}
      </Tabs>
    </PageHeader>
    {children}
  </div>
);
