# frozen_string_literal: true

require "spec_helper"

describe "Ebook ISBN indexing", type: :system, js: true do
  let(:seller) { create(:named_seller) }

  it "provides e-book ISBN details in JSON-LD schema for search indexing" do
    product = create(:product, user: seller, native_type: Link::NATIVE_TYPE_EBOOK, price_cents: 500,
                               name: "My Ebook", description: "<p>Great book</p>", isbn: "9780306406157")

    visit short_link_path(product)

    script = find("script[type='application/ld+json']", visible: false)
    json = JSON.parse(script.text(:all))

    expect(json["@type"]).to eq("Book")
    expect(json["name"]).to eq("My Ebook")
    expect(json["isbn"]).to eq("9780306406157")
    expect(json["bookFormat"]).to eq("https://schema.org/EBook")
    expect(json["url"]).to eq(product.long_url)
    expect(json["description"]).to match(/Great book/i)

    expect(json["author"]).to be_a(Hash)
    expect(json["author"]["@type"]).to eq("Person")
    expect(json["author"]["name"]).to eq(seller.name_or_username)

    expect(json["offers"]).to be_a(Hash)
    expect(json["offers"]["@type"]).to eq("Offer")
    expect(json["offers"]["price"]).to eq("5.0")
    expect(json["offers"]["priceCurrency"]).to eq("USD")
    expect(json["offers"]["availability"]).to eq("https://schema.org/InStock")
  end
end
