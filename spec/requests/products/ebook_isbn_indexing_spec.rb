# frozen_string_literal: true

require "spec_helper"

describe "Ebook ISBN indexing", type: :system, js: true do
  let(:seller) { create(:named_seller) }

  it "provides e-book ISBN details in JSON-LD schema for search indexing" do
    product = create(:product, user: seller, native_type: Link::NATIVE_TYPE_EBOOK, price_cents: 500,
                               name: "My Ebook", description: "<p>Great book</p>", isbn: "9780306406157")

    visit short_link_path(product)

    # Find JSON-LD script
    script = find("script[type='application/ld+json']", visible: false)
    json = JSON.parse(script.text(:all))

    expect(json["@type"]).to eq("Book")
    expect(json["name"]).to eq("My Ebook")
    expect(json["isbn"]).to eq("9780306406157")
    expect(json["bookFormat"]).to eq("https://schema.org/EBook")
    expect(json["url"]).to eq(product.long_url)
    # Description is stripped of HTML and squished in view
    expect(json["description"]).to match(/Great book/i)
  end
end
