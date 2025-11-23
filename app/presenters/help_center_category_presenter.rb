# frozen_string_literal: true

class HelpCenterCategoryPresenter
  include Rails.application.routes.url_helpers

  def initialize(category:)
    @category = category
  end

  def show_props
    {
      category: {
        title: @category.title,
        slug: @category.slug,
        articles: @category.articles.map do |article|
          {
            title: article.title,
            url: help_center_article_path(article),
            slug: article.slug
          }
        end
      },
      sidebar_categories: @category.categories_for_same_audience.map do |category|
        {
          title: category.title,
          url: help_center_category_path(category),
          is_active: category == @category
        }
      end
    }
  end

  private
    attr_reader :category
end
