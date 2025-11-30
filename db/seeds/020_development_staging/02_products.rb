# frozen_string_literal: true

product = Link.fetch("demo")
if product.blank?
  # Demo product used on /widgets page for non-logged in users
  seller = User.find_by(email: "seller@gumroad.com")
  seller.products.create!(
    name: "Beautiful widget",
    unique_permalink: "demo",
    description: "Description for demo product",
    filetype: "link",
    price_cents: 0,
  )
end

# Create additional products for seller@gumroad.com for testing
seller = User.find_by(email: "seller@gumroad.com")
if seller.present?
  product_types = [
    { name: "E-book: Complete Guide to Ruby", description: "Comprehensive guide to Ruby programming", filetype: "pdf", price_cents: 2999 },
    { name: "Video Course: Rails Mastery", description: "Learn Ruby on Rails from scratch", filetype: "video", price_cents: 4999 },
    { name: "Design Templates Pack", description: "Professional design templates", filetype: "zip", price_cents: 1999 },
    { name: "Music Album: Digital Dreams", description: "Original music compositions", filetype: "audio", price_cents: 999 },
    { name: "Photography Presets", description: "Lightroom presets for stunning photos", filetype: "zip", price_cents: 1499 },
    { name: "Fitness Training Program", description: "12-week fitness transformation", filetype: "pdf", price_cents: 3999 },
    { name: "Business Template Bundle", description: "Essential business document templates", filetype: "zip", price_cents: 2499 },
    { name: "Icon Set Pro", description: "500+ vector icons", filetype: "zip", price_cents: 1999 },
    { name: "Coding Interview Guide", description: "Ace your technical interviews", filetype: "pdf", price_cents: 2999 },
    { name: "Podcast Starter Kit", description: "Everything you need to start podcasting", filetype: "link", price_cents: 3499 },
    { name: "Social Media Graphics Pack", description: "Ready-to-use social media templates", filetype: "zip", price_cents: 1499 },
    { name: "Productivity Planner 2024", description: "Digital planner for maximum productivity", filetype: "pdf", price_cents: 999 },
    { name: "Photography Course: Portrait Edition", description: "Master portrait photography", filetype: "video", price_cents: 5999 },
    { name: "Recipe E-book: Healthy Meals", description: "100 healthy and delicious recipes", filetype: "pdf", price_cents: 1999 },
    { name: "UI Kit: Modern Dashboard", description: "Complete UI kit for web dashboards", filetype: "zip", price_cents: 4999 },
    { name: "Writing Workshop: Fiction Writing", description: "Learn to write compelling fiction", filetype: "video", price_cents: 3999 },
    { name: "Stock Photos Bundle", description: "High-quality stock photos", filetype: "zip", price_cents: 2999 },
    { name: "Marketing Email Templates", description: "Convert with proven email templates", filetype: "zip", price_cents: 1499 },
    { name: "3D Asset Pack: Low Poly", description: "Low poly 3D models for games", filetype: "zip", price_cents: 3499 },
    { name: "Meditation Audio Collection", description: "Guided meditation sessions", filetype: "audio", price_cents: 1999 },
    { name: "JavaScript Masterclass", description: "Advanced JavaScript techniques", filetype: "video", price_cents: 5499 },
    { name: "SEO Guide 2024", description: "Complete SEO optimization guide", filetype: "pdf", price_cents: 2499 },
    { name: "Procreate Brush Pack", description: "100+ custom Procreate brushes", filetype: "zip", price_cents: 1999 },
    { name: "Email Marketing Course", description: "Build and grow your email list", filetype: "video", price_cents: 4499 },
    { name: "Logo Design Kit", description: "Professional logo templates", filetype: "zip", price_cents: 2999 },
    { name: "Python Programming Bundle", description: "Learn Python from beginner to advanced", filetype: "pdf", price_cents: 3999 },
    { name: "Wedding Photography Presets", description: "Lightroom presets for weddings", filetype: "zip", price_cents: 2499 },
    { name: "Content Creator Toolkit", description: "Essential tools for content creators", filetype: "link", price_cents: 1999 },
    { name: "Vegan Cookbook", description: "Delicious plant-based recipes", filetype: "pdf", price_cents: 1499 },
  ]

  product_types.each do |product_data|
    unless seller.products.exists?(name: product_data[:name])
      seller.products.create!(product_data)
    end
  end
end
