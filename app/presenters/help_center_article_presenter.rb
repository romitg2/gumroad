# frozen_string_literal: true

class HelpCenterArticlePresenter
  include Rails.application.routes.url_helpers

  def initialize(article:)
    @article = article
  end

  def show_props
    {
      article: {
        title: @article.title,
        slug: @article.slug,
        content: render_article_content,
        category: {
          title: @article.category.title,
          url: help_center_category_path(@article.category)
        }
      },
      sidebar_categories: @article.category.categories_for_same_audience.map do |category|
        {
          title: category.title,
          url: help_center_category_path(category),
          is_active: category == @article.category
        }
      end
    }
  end

  private
    attr_reader :article

    def render_article_content
      # Render ERB partial to HTML string
      ApplicationController.render(
        partial: @article.to_partial_path,
        formats: [:html]
      )
    end
end
