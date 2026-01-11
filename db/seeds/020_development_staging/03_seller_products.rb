# frozen_string_literal: true

# Script to add published products to seller@gumroad.com
# Run with: rails runner db/seeds/020_development_staging/03_seller_products.rb
# Or as part of: rails db:seed

seller = User.find_by(email: "seller@gumroad.com")

if seller.blank?
  puts "Error: seller@gumroad.com not found. Please run the user seeds first."
  exit 1
end

puts "Adding products for seller@gumroad.com..."

products_data = [
  # Courses (5)
  {
    name: "Complete Ruby on Rails Course",
    unique_permalink: "railscourse",
    description: "Learn Ruby on Rails from scratch! This comprehensive course covers everything from basic setup to deploying production applications.",
    price_cents: 4999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "Python for Data Science",
    unique_permalink: "pythondatascience",
    description: "Master Python for data analysis, visualization, and machine learning. Includes hands-on projects and real-world datasets.",
    price_cents: 7999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "JavaScript Masterclass",
    unique_permalink: "jsmasterclass",
    description: "From basics to advanced concepts. Learn ES6+, async programming, and modern JavaScript frameworks.",
    price_cents: 5999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "UI UX Design Fundamentals",
    unique_permalink: "uiuxfundamentals",
    description: "Learn the principles of great design. Covers user research, wireframing, prototyping, and design systems.",
    price_cents: 3999,
    native_type: "course",
    filetype: "course",
  },
  {
    name: "DevOps Bootcamp",
    unique_permalink: "devopsbootcamp",
    description: "Learn Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure. Become a DevOps engineer.",
    price_cents: 8999,
    native_type: "course",
    filetype: "course",
  },

  # Ebooks (5)
  {
    name: "The Ultimate Guide to Web Development",
    unique_permalink: "webdevebook",
    description: "A complete ebook covering HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners and intermediate developers.",
    price_cents: 1999,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "Startup Playbook",
    unique_permalink: "startupplaybook",
    description: "Everything you need to know to launch and scale your startup. From idea validation to fundraising.",
    price_cents: 2499,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "The Art of Clean Code",
    unique_permalink: "cleancodebook",
    description: "Write maintainable, scalable, and elegant code. Best practices from industry experts.",
    price_cents: 1499,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "Marketing for Creators",
    unique_permalink: "marketingcreators",
    description: "Build your audience and monetize your passion. Social media, email marketing, and content strategy.",
    price_cents: 1999,
    native_type: "ebook",
    filetype: "pdf",
  },
  {
    name: "Financial Freedom Guide",
    unique_permalink: "financialfreedom",
    description: "Personal finance, investing, and wealth building strategies for the modern age.",
    price_cents: 999,
    native_type: "ebook",
    filetype: "pdf",
  },

  # Digital Products (5)
  {
    name: "Digital Art Assets Pack",
    unique_permalink: "artassets",
    description: "Over 500 high-quality digital art assets including icons, illustrations, and UI elements. Use them in your personal or commercial projects.",
    price_cents: 2499,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "Free Starter Template",
    unique_permalink: "freetemplate",
    description: "Get started with this free template. Perfect for learning and small projects.",
    price_cents: 0,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "Notion Productivity System",
    unique_permalink: "notionsystem",
    description: "Complete Notion template system for personal and professional productivity. Includes dashboards, databases, and workflows.",
    price_cents: 2999,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "Stock Photo Collection",
    unique_permalink: "stockphotos",
    description: "200 high-resolution stock photos for commercial use. Nature, business, lifestyle, and more.",
    price_cents: 4999,
    native_type: "digital",
    filetype: "zip",
  },
  {
    name: "Video Editing LUTs Pack",
    unique_permalink: "videoLUTs",
    description: "Professional color grading LUTs for video editors. 50 cinematic looks for any project.",
    price_cents: 3499,
    native_type: "digital",
    filetype: "zip",
  },

  # Memberships (30 total)
  {
    name: "Premium Membership",
    unique_permalink: "premiummembership",
    description: "Get exclusive access to premium content, early releases, and community features. Cancel anytime.",
    price_cents: 999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Pro Developer Community",
    unique_permalink: "prodevmembership",
    description: "Join our exclusive developer community. Weekly live sessions, code reviews, and networking.",
    price_cents: 1999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Creative Insider Access",
    unique_permalink: "creativeinsider",
    description: "Behind-the-scenes content, tutorials, and early access to all new releases.",
    price_cents: 499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Fitness Pro Monthly",
    unique_permalink: "fitnesspromonthly",
    description: "Monthly workout plans, nutrition guides, and live Q&A sessions with certified trainers.",
    price_cents: 1499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Music Production Academy",
    unique_permalink: "musicprodacademy",
    description: "Access to exclusive tutorials, sample packs, and monthly feedback sessions on your tracks.",
    price_cents: 2499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Photography Masters Club",
    unique_permalink: "photomastersclub",
    description: "Weekly photo challenges, editing tutorials, and portfolio reviews from professional photographers.",
    price_cents: 1799,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Writers Guild Membership",
    unique_permalink: "writersguildmember",
    description: "Writing prompts, peer critiques, and exclusive workshops with published authors.",
    price_cents: 1299,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Startup Founders Circle",
    unique_permalink: "founderscircle",
    description: "Network with fellow entrepreneurs, access investor introductions, and get mentorship from successful founders.",
    price_cents: 4999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "AI & Machine Learning Hub",
    unique_permalink: "aimlhub",
    description: "Stay ahead with the latest AI research, hands-on projects, and expert-led workshops.",
    price_cents: 2999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Game Dev Insider",
    unique_permalink: "gamedevinsider",
    description: "Game development tutorials, asset libraries, and monthly game jams with prizes.",
    price_cents: 1899,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Data Science Pro",
    unique_permalink: "datasciencepro",
    description: "Advanced data science courses, real-world datasets, and career coaching.",
    price_cents: 3499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Yoga & Wellness Journey",
    unique_permalink: "yogawellness",
    description: "Daily yoga sessions, meditation guides, and holistic wellness content.",
    price_cents: 999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Cooking Masterclass Club",
    unique_permalink: "cookingmasterclub",
    description: "Weekly recipes from world-class chefs, technique videos, and live cooking sessions.",
    price_cents: 1599,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Language Learning Elite",
    unique_permalink: "languageelite",
    description: "Learn any language with native speakers, cultural immersion content, and personalized feedback.",
    price_cents: 2199,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Illustration Artists Network",
    unique_permalink: "illustrationnetwork",
    description: "Monthly illustration challenges, professional critiques, and industry networking opportunities.",
    price_cents: 1699,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Cybersecurity Academy",
    unique_permalink: "cybersecurityacademy",
    description: "Ethical hacking tutorials, CTF challenges, and certification prep materials.",
    price_cents: 3999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "3D Art & Animation Hub",
    unique_permalink: "3dartanimation",
    description: "Blender and Maya tutorials, rigging masterclasses, and monthly render challenges.",
    price_cents: 2799,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Personal Finance Academy",
    unique_permalink: "personalfinanceacad",
    description: "Investment strategies, budgeting tools, and live Q&A with financial advisors.",
    price_cents: 1499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Podcast Creator Pro",
    unique_permalink: "podcastcreatorpro",
    description: "Podcasting tutorials, guest booking strategies, and monetization masterclasses.",
    price_cents: 1799,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "UX Research Lab",
    unique_permalink: "uxresearchlab",
    description: "User research methodologies, case studies, and portfolio review sessions.",
    price_cents: 2499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Mobile App Dev Club",
    unique_permalink: "mobileappdevclub",
    description: "iOS and Android development tutorials, code reviews, and app launch strategies.",
    price_cents: 2199,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Blockchain & Web3 Academy",
    unique_permalink: "blockchainweb3",
    description: "Smart contract development, DeFi strategies, and NFT creation tutorials.",
    price_cents: 3499,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Video Production Pro",
    unique_permalink: "videoprodpro",
    description: "Cinematography techniques, color grading tutorials, and monthly video challenges.",
    price_cents: 2299,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Social Media Mastery",
    unique_permalink: "socialmediamastery",
    description: "Growth strategies, content calendars, and analytics deep-dives for all platforms.",
    price_cents: 1399,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Freelancer Success Hub",
    unique_permalink: "freelancerhub",
    description: "Client acquisition strategies, contract templates, and pricing masterclasses.",
    price_cents: 1599,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Cloud Architecture Pro",
    unique_permalink: "cloudarchpro",
    description: "AWS, GCP, and Azure tutorials, certification prep, and architecture reviews.",
    price_cents: 3999,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Book Club Premium",
    unique_permalink: "bookclubpremium",
    description: "Monthly book selections, author interviews, and exclusive discussion groups.",
    price_cents: 799,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Interior Design Circle",
    unique_permalink: "interiordesigncircle",
    description: "Design trends, mood board tutorials, and client presentation strategies.",
    price_cents: 1899,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Productivity Systems Lab",
    unique_permalink: "productivitylab",
    description: "Weekly productivity workshops, tool reviews, and accountability groups to optimize your workflow.",
    price_cents: 1299,
    native_type: "membership",
    filetype: "membership",
  },
  {
    name: "Indie Hackers Elite",
    unique_permalink: "indiehackerselite",
    description: "Build profitable side projects with fellow indie hackers. Revenue sharing strategies and launch playbooks.",
    price_cents: 2999,
    native_type: "membership",
    filetype: "membership",
  },

  # Physical Products (4)
  {
    name: "Handcrafted Notebook",
    unique_permalink: "handcraftednotebook",
    description: "Beautiful handcrafted notebook with premium paper. Perfect for journaling, sketching, or note-taking.",
    price_cents: 2500,
    native_type: "physical",
    filetype: "physical",
  },
  {
    name: "Developer Sticker Pack",
    unique_permalink: "stickersdev",
    description: "Set of 20 high-quality vinyl stickers for developers. Waterproof and UV resistant.",
    price_cents: 1299,
    native_type: "physical",
    filetype: "physical",
  },
  {
    name: "Minimalist Desk Mat",
    unique_permalink: "deskmat",
    description: "Large premium desk mat with minimalist design. Water-resistant and easy to clean.",
    price_cents: 3999,
    native_type: "physical",
    filetype: "physical",
  },
  {
    name: "Coding Poster Set",
    unique_permalink: "codingposters",
    description: "Set of 3 beautiful posters featuring programming concepts. High-quality print on matte paper.",
    price_cents: 2999,
    native_type: "physical",
    filetype: "physical",
  },

  # Bundles (3)
  {
    name: "Productivity Bundle",
    unique_permalink: "productivitybundle",
    description: "Everything you need to supercharge your productivity. Includes templates, guides, and tools.",
    price_cents: 3999,
    native_type: "bundle",
    filetype: "bundle",
  },
  {
    name: "Complete Developer Toolkit",
    unique_permalink: "devtoolkit",
    description: "All our developer resources in one package. Courses, ebooks, templates, and assets.",
    price_cents: 14999,
    native_type: "bundle",
    filetype: "bundle",
  },
  {
    name: "Design Starter Bundle",
    unique_permalink: "designbundle",
    description: "Everything a new designer needs. UI kits, icon packs, fonts, and tutorials.",
    price_cents: 7999,
    native_type: "bundle",
    filetype: "bundle",
  },

  # Audiobooks (3)
  {
    name: "Audiobook: Success Mindset",
    unique_permalink: "successaudiobook",
    description: "Listen to this inspiring audiobook about developing a success mindset. Over 5 hours of content.",
    price_cents: 1499,
    native_type: "audiobook",
    filetype: "mp3",
  },
  {
    name: "Audiobook: Deep Work Strategies",
    unique_permalink: "deepworkaudio",
    description: "Learn to focus and produce quality work in a distracted world. 4 hours of practical advice.",
    price_cents: 1299,
    native_type: "audiobook",
    filetype: "mp3",
  },
  {
    name: "Audiobook: Creative Confidence",
    unique_permalink: "creativeaudio",
    description: "Unlock your creative potential. Stories and strategies from leading innovators.",
    price_cents: 1699,
    native_type: "audiobook",
    filetype: "mp3",
  },

  # Additional variety (2)
  {
    name: "Podcast: Tech Talks Collection",
    unique_permalink: "techtalkspodcast",
    description: "50 episodes of interviews with tech leaders. Learn from the best in the industry.",
    price_cents: 999,
    native_type: "podcast",
    filetype: "mp3",
  },
  {
    name: "Weekly Tech Newsletter",
    unique_permalink: "technewsletter",
    description: "Stay updated with the latest in tech. Curated news, tutorials, and resources delivered weekly.",
    price_cents: 500,
    native_type: "newsletter",
    filetype: "newsletter",
  },
]

created_count = 0
skipped_count = 0

products_data.each do |product_data|
  existing = Link.fetch(product_data[:unique_permalink])
  if existing.present?
    puts "  Skipping '#{product_data[:name]}' - already exists"
    skipped_count += 1
    next
  end

  product = seller.products.new(product_data)
  product.display_product_reviews = true

  # Build a default price
  price = product.prices.build(price_cents: product.price_cents)
  # Memberships should have monthly recurrence, others are one-time
  if product.native_type == "membership"
    price.recurrence = BasePrice::Recurrence::MONTHLY
  else
    price.recurrence = 0
  end

  # For physical products, add shipping info
  if product.native_type == "physical"
    product.require_shipping = true
    product.shipping_destinations.build(
      country_code: ShippingDestination::Destinations::ELSEWHERE,
      one_item_rate_cents: 500,
      multiple_items_rate_cents: 300
    )
  end

  if product.save
    # Publish the product (mark it as not a draft and enable purchasing)
    product.update_columns(
      draft: false,
      purchase_disabled_at: nil,
      deleted_at: nil
    )
    puts "  Created '#{product_data[:name]}' (#{product.unique_permalink})"
    created_count += 1
  else
    puts "  Error creating '#{product_data[:name]}': #{product.errors.full_messages.join(', ')}"
  end
end

puts "\nDone! Created #{created_count} products, skipped #{skipped_count} existing products."
puts "Total products for seller@gumroad.com: #{seller.products.reload.count}"
