import { Link, usePage } from "@inertiajs/react";
import * as React from "react";

import { HelpCenterLayout } from "$app/components/HelpCenter/Layout";

interface Category {
  title: string;
  url: string;
  is_active: boolean;
}

interface ShowProps {
  article: {
    title: string;
    slug: string;
    content: string;
    category: {
      title: string;
      url: string;
    };
  };
  sidebar_categories: Category[];
  [key: string]: any;
}

export default function HelpCenterArticleShow() {
  const { article, sidebar_categories } = usePage<ShowProps>().props;

  return (
    <HelpCenterLayout>
      <div className="flex flex-col-reverse max-w-7xl md:flex-row gap-8 md:gap-16">
        <div className="md:pt-8 md:pr-8">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-4 list-none pl-0!">
            {sidebar_categories.map((category) => (
              <li key={category.url}>
                <Link href={category.url} className={category.is_active ? "font-bold" : ""}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-[rgb(var(--filled))] border border-[rgb(var(--parent-color)/var(--border-alpha))] p-8 rounded-sm grow">
          <h2 className="text-3xl font-bold mb-6">{article.title}</h2>
          <div className="scoped-tailwind-preflight prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </HelpCenterLayout>
  );
}
