# frozen_string_literal: true

class HelpCenterArticlesPresenter
  include Rails.application.routes.url_helpers

  def index_props
    {
      categories: HelpCenter::Category.all.map do |category|
        {
          title: category.title,
          url: help_center_category_path(category),
          slug: category.slug,
          audience: category.audience,
          articles: category.articles.map do |article|
            {
              title: article.title,
              url: help_center_article_path(article),
              slug: article.slug
            }
          end
        }
      end
    }
  end
end
