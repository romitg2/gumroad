# frozen_string_literal: true

class HelpCenter::ArticlesController < HelpCenter::BaseController
  before_action :redirect_legacy_articles, only: :show

  def index
    presenter = HelpCenterArticlesPresenter.new
    @title = "Gumroad Help Center"

    render inertia: "HelpCenter/Articles/Index",
           props: presenter.index_props
  end

  def show
    @article = HelpCenter::Article.find_by!(slug: params[:slug])
    presenter = HelpCenterArticlePresenter.new(article: @article)
    @title = "#{@article.title} - Gumroad Help Center"

    render inertia: "HelpCenter/Articles/Show",
           props: presenter.show_props
  end

  private
    LEGACY_ARTICLE_REDIRECTS = {
      "284-jobs-at-gumroad" => "/about#jobs"
    }

    def redirect_legacy_articles
      return unless LEGACY_ARTICLE_REDIRECTS.key?(params[:slug])

      redirect_to LEGACY_ARTICLE_REDIRECTS[params[:slug]], status: :moved_permanently
    end
end
