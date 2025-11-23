# frozen_string_literal: true

class HelpCenter::CategoriesController < HelpCenter::BaseController
  def show
    @category = HelpCenter::Category.find_by!(slug: params[:slug])
    presenter = HelpCenterCategoryPresenter.new(category: @category)
    @title = "#{@category.title} - Gumroad Help Center"

    render inertia: "HelpCenter/Categories/Show",
           props: presenter.show_props
  end
end
