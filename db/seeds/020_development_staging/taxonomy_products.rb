# frozen_string_literal: true

def find_or_create_recommendable_user(category_name)
  user = User.find_by(email: "gumbo_#{category_name}@gumroad.com")
  return user if user

  user = User.create!(
    name: "Gumbo #{category_name}",
    username: "gumbo#{category_name}",
    email: "gumbo_#{category_name}@gumroad.com",
    password: SecureRandom.hex(24),
    user_risk_state: "compliant",
    confirmed_at: Time.current,
    payment_address: "gumbo_#{category_name}@gumroad.com"
  )

  # Skip validations to set a pwned but easy password
  user.password = "password"
  user.save!(validate: false)

  user
end

def find_or_create_universal_free_offer_code_for(seller)
  offer_code = seller.offer_codes
    .universal
    .alive
    .find_by(amount_percentage: 100)
  return offer_code if offer_code.present?

  OfferCode.create!(
    user: seller,
    universal: true,
    amount_percentage: 100,
    code: "seed-#{seller.id}-#{SecureRandom.hex(3)}"
  )
end

def create_purchase(seller, buyer, product)
  purchase = Purchase.new(
    link_id: product.id,
    seller_id: seller.id,
    price_cents: 0,
    displayed_price_cents: 0,
    tax_cents: 0,
    gumroad_tax_cents: 0,
    total_transaction_cents: 0,
    purchaser_id: buyer.id,
    email: buyer.email,
    card_country: "US",
    ip_address: "199.241.200.176",
    offer_code: find_or_create_universal_free_offer_code_for(seller)
  )
  purchase.send(:calculate_fees)
  purchase.save!
  purchase.update!(purchase_state: "successful", succeeded_at: Time.current)

  purchase.post_review(rating: 3)
end

def create_recommendable_product_if_not_exists(user, taxonomy_slug)
  product_name = "Beautiful #{taxonomy_slug} widget"
  product = user.links.find_by(name: product_name)

  return if product.present?

  product = user.links.create!(
    name: product_name,
    description: "Description for demo product",
    filetype: "link",
    price_cents: 500,
    taxonomy: Taxonomy.find_by(slug: taxonomy_slug),
    display_product_reviews: true
  )
  product.tag!(taxonomy_slug[0..19])

  buyer = User.find_by(email: "seller@gumroad.com")
  create_purchase(user, buyer, product)
end

taxonomies = [
  { category: "film", slug: "films" },
  { category: "music", slug: "music-and-sound-design" },
  { category: "writing", slug: "writing-and-publishing" },
  { category: "education", slug: "education" },
  { category: "software", slug: "software-development" },
  { category: "comics", slug: "comics-and-graphic-novels" },
  { category: "drawing", slug: "drawing-and-painting" },
  { category: "animation", slug: "3d" },
  { category: "audio", slug: "audio" },
  { category: "games", slug: "gaming" },
  { category: "photography", slug: "photography" },
  { category: "crafts", slug: "self-improvement" },
  { category: "design", slug: "design" },
  { category: "sports", slug: "fitness-and-health" },
  { category: "merchandise", slug: "fiction-books" },
  { category: "cooking", slug: "food-and-drink" },
  { category: "business", slug: "business-and-money" },
  { category: "lifestyle", slug: "comics-and-graphic-novels" },
  { category: "fashion", slug: "design" },
  { category: "travel", slug: "fiction-books" },
  { category: "tech", slug: "software-development" },
  { category: "art", slug: "drawing-and-painting" },
  { category: "wellness", slug: "fitness-and-health" },
  { category: "marketing", slug: "business-and-money" },
  { category: "productivity", slug: "self-improvement" },
  { category: "language", slug: "education" },
  { category: "science", slug: "education" },
  { category: "history", slug: "writing-and-publishing" },
  { category: "poetry", slug: "writing-and-publishing" },
  { category: "dance", slug: "fitness-and-health" },
]

taxonomies.each do |taxonomy_data|
  create_recommendable_product_if_not_exists(
    find_or_create_recommendable_user(taxonomy_data[:category]),
    taxonomy_data[:slug]
  )
end

DevTools.delete_all_indices_and_reindex_all
