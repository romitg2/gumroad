import { Link, usePage } from "@inertiajs/react";
import * as React from "react";

import { HelpCenterLayout } from "$app/components/HelpCenter/Layout";

interface Article {
  title: string;
  url: string;
  slug: string;
}

interface Category {
  title: string;
  url: string;
  is_active: boolean;
}

interface ShowProps {
  category: {
    title: string;
    slug: string;
    articles: Article[];
  };
  sidebar_categories: Category[];
  [key: string]: any;
}

export default function HelpCenterCategoryShow() {
  const { category, sidebar_categories } = usePage<ShowProps>().props;

  return (
    <HelpCenterLayout>
      <div className="flex flex-col-reverse max-w-7xl md:flex-row gap-8 md:gap-16">
        <div className="md:pt-8 md:pr-8">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-4 list-none pl-0!">
            {sidebar_categories.map((cat) => (
              <li key={cat.url}>
                <Link href={cat.url} className={cat.is_active ? "font-bold" : ""}>
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-[rgb(var(--filled))] border border-[rgb(var(--parent-color)/var(--border-alpha))] p-8 rounded-sm grow">
          <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
          <div className="space-y-4">
            {category.articles.map((article) => (
              <div key={article.url} className="flex items-center space-x-3">
                <Link href={article.url} className="hover:text-blue-600 hover:underline font-medium flex items-center gap-2 w-fit">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  {article.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HelpCenterLayout>
  );
}
