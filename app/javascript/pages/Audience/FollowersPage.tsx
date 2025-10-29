import { usePage } from "@inertiajs/react";
import React from "react";

import { default as FollowersPage, type FollowersPageProps } from "$app/components/Audience/FollowersPage";

function Followers() {
  const props = usePage<FollowersPageProps>().props;

  return <FollowersPage {...props} />;
}

export default Followers;
