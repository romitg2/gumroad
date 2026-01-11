# frozen_string_literal: true

# Script to add archived products to seller@gumroad.com
# Run with: rails runner db/seeds/020_development_staging/04_seller_archived_products.rb
# Or as part of: rails db:seed

seller = User.find_by(email: "seller@gumroad.com")

if seller.blank?
  puts "Error: seller@gumroad.com not found. Please run the user seeds first."
  exit 1
end

puts "Adding archived products for seller@gumroad.com..."

archived_products_data = [
  # Archived Courses (5)
  {
    name: "[Archived] Intro to Machine Learning",
    unique_permalink: "archivedmlintro",
    description: "An introductory course to machine learning concepts. This course has been discontinued.",
    price_cents: 3999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "[Archived] PHP Fundamentals",
    unique_permalink: "archivedphp",
    description: "Learn PHP from the ground up. This course is no longer maintained.",
    price_cents: 2999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "[Archived] Angular Legacy Complete Guide",
    unique_permalink: "archivedangularlegacy",
    description: "Master AngularJS 1.x framework. Deprecated in favor of modern Angular.",
    price_cents: 4999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "[Archived] jQuery Masterclass",
    unique_permalink: "archivedjquery",
    description: "Deep dive into jQuery. Content outdated, consider modern alternatives.",
    price_cents: 1999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "[Archived] Flash Game Development",
    unique_permalink: "archivedflash",
    description: "Create games with Adobe Flash. Technology discontinued.",
    price_cents: 3499,
    native_type: "course",
    filetype: "course",
  },

  # Archived Ebooks (5)
  {
    name: "[Archived] SEO Guide Old Edition",
    unique_permalink: "archivedseoold",
    description: "SEO strategies for 2020. Outdated content.",
    price_cents: 1499,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "[Archived] Social Media Trends Legacy",
    unique_permalink: "archivedsocialold",
    description: "Social media marketing trends from 2019.",
    price_cents: 999,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "[Archived] Startup Funding Guide First Edition",
    unique_permalink: "archivedfundingold",
    description: "First edition of our funding guide. Superseded by new version.",
    price_cents: 1999,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "[Archived] Remote Work Handbook Legacy",
    unique_permalink: "archivedremotework",
    description: "Guide to remote work during the pandemic era.",
    price_cents: 799,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "[Archived] Cryptocurrency Basics",
    unique_permalink: "archivedcrypto",
    description: "Introduction to cryptocurrency. Information may be outdated.",
    price_cents: 1299,
    native_type: "ebook",
    filetype: "pdf",
  },

  # Archived Digital Products (5)
  {
    name: "[Archived] iOS Legacy Icon Pack",
    unique_permalink: "archivediosicons",
    description: "Custom icons for iOS 14. Superseded by newer versions.",
    price_cents: 999,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "[Archived] Windows Wallpapers Legacy",
    unique_permalink: "archivedwinwalls",
    description: "Wallpaper collection for Windows 10.",
    price_cents: 499,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "[Archived] Sketch UI Kit v1",
    unique_permalink: "archivedsketchkit",
    description: "UI kit for Sketch app. First version, now deprecated.",
    price_cents: 2499,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "[Archived] Photoshop Actions Pack",
    unique_permalink: "archivedpsactions",
    description: "Collection of Photoshop actions. Legacy format.",
    price_cents: 1999,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "[Archived] Bootstrap Legacy Templates",
    unique_permalink: "archivedbootstrapold",
    description: "Website templates for Bootstrap 3. Use Bootstrap 5 instead.",
    price_cents: 1499,
    native_type: "digital",
    filetype: "zip",
  },

  # Archived Memberships (10)
  {
    name: "[Archived] Beta Testers Club",
    unique_permalink: "archivedbetaclub",
    description: "Exclusive beta testing membership. Program ended.",
    price_cents: 499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Early Adopters Circle",
    unique_permalink: "archivedearlyadopters",
    description: "Early adopter benefits program. Merged with main membership.",
    price_cents: 999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Legacy Pro Membership",
    unique_permalink: "archivedlegacypro",
    description: "Original pro membership tier. Replaced by new structure.",
    price_cents: 1999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Founders Edition Access",
    unique_permalink: "archivedfounders",
    description: "Special access for founding members. Program concluded.",
    price_cents: 2999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Weekly Workshop Pass",
    unique_permalink: "archivedweeklypass",
    description: "Weekly workshop access. Replaced by monthly format.",
    price_cents: 799,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Student Developer Program",
    unique_permalink: "archivedstudentdev",
    description: "Discounted access for students. Program restructured.",
    price_cents: 299,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Lifetime Access Plan",
    unique_permalink: "archivedlifetime",
    description: "One-time lifetime access. No longer offered.",
    price_cents: 9999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Team Collaboration Hub",
    unique_permalink: "archivedteamhub",
    description: "Team-based membership. Discontinued.",
    price_cents: 4999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Enterprise Trial Program",
    unique_permalink: "archivedenterprise",
    description: "Enterprise trial membership. Program ended.",
    price_cents: 0,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "[Archived] Community Moderator Access",
    unique_permalink: "archivedmodaccess",
    description: "Special access for community moderators. Restructured.",
    price_cents: 0,
    native_type: "membership",
    filetype: "membership",
  },

  # Archived Physical Products (3)
  {
    name: "[Archived] Limited Edition T-Shirt",
    unique_permalink: "archivedtshirt",
    description: "Limited edition branded t-shirt. Sold out.",
    price_cents: 2999,
    native_type: "physical",
    filetype: "physical",
  },
  {
    name: "[Archived] Conference Swag Box",
    unique_permalink: "archivedswagbox",
    description: "Conference merchandise bundle. Event concluded.",
    price_cents: 4999,
    native_type: "physical",
    filetype: "physical",
  },
  {
    name: "[Archived] Collector's Pin Set",
    unique_permalink: "archivedpins",
    description: "Limited collector's enamel pins. No longer available.",
    price_cents: 1999,
    native_type: "physical",
    filetype: "physical",
  },

  # Archived Bundles (2)
  {
    name: "[Archived] Annual Complete Bundle",
    unique_permalink: "archivedannualbundle",
    description: "All 2022 releases in one package. Superseded by 2023 bundle.",
    price_cents: 9999,
    native_type: "bundle",
    filetype: "bundle",
  },
  {
    name: "[Archived] Black Friday Special",
    unique_permalink: "archivedblackfriday",
    description: "Black Friday promotional bundle. Sale ended.",
    price_cents: 4999,
    native_type: "bundle",
    filetype: "bundle",
  },

  # Additional Archived Products (2)
  {
    name: "[Archived] Summer Sale Bundle",
    unique_permalink: "archivedsummersale",
    description: "Summer promotional bundle. Limited time offer expired.",
    price_cents: 3999,
    native_type: "bundle",
    filetype: "bundle",
  },
  {
    name: "[Archived] Holiday Gift Pack",
    unique_permalink: "archivedholidaypack",
    description: "Special holiday gift bundle. Seasonal offer concluded.",
    price_cents: 5999,
    native_type: "bundle",
    filetype: "bundle",
  },
]

created_count = 0
skipped_count = 0

archived_products_data.each do |product_data|
  existing = Link.fetch(product_data[:unique_permalink])
  if existing.present?
    puts "  Skipping '#{product_data[:name]}' - already exists"
    skipped_count += 1
    next
  end

  product = seller.products.new(product_data)
  product.display_product_reviews = true

  price = product.prices.build(price_cents: product.price_cents)
  if product.native_type == "membership"
    price.recurrence = BasePrice::Recurrence::MONTHLY
  else
    price.recurrence = 0
  end

  if product.native_type == "physical"
    product.require_shipping = true
    product.shipping_destinations.build(
      country_code: ShippingDestination::Destinations::ELSEWHERE,
      one_item_rate_cents: 500,
      multiple_items_rate_cents: 300
    )
  end

  if product.save
    product.update!(
      draft: false,
      purchase_disabled_at: Time.current,
      deleted_at: nil,
      archived: true
    )
    puts "  Created archived product '#{product_data[:name]}' (#{product.unique_permalink})"
    created_count += 1
  else
    puts "  Error creating '#{product_data[:name]}': #{product.errors.full_messages.join(', ')}"
  end
end

puts "\nDone! Created #{created_count} archived products, skipped #{skipped_count} existing products."
puts "Total archived products for seller@gumroad.com: #{seller.archived_products_count}"
