// This file was auto-generated from ERB partials
// Do not edit manually - regenerate using: bin/migrate_api_partials_to_ts

export type HttpMethod = "get" | "post" | "put" | "delete";

export type Parameter = {
  name: string;
  description: string;
  required: boolean;
  type?: string;
  default?: string;
};

export type ApiMethodData = {
  type: HttpMethod;
  path: string;
  description: string;
  isOauth?: boolean;
  curlExample?: string;
  parameters?: Parameter[];
  responseExample?: string;
};

export type ApiResourceData = {
  name: string;
  methods: ApiMethodData[];
};

export const API_METHODS: ApiResourceData[] = [
  {
    name: "Products",
    methods: [
      {
        type: "get",
        path: "/products",
        description: `Retrieve all of the existing products for the authenticated user.`,
        curlExample: `curl https://api.gumroad.com/v2/products \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "products": [{
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": true,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "purchasing_power_parity_prices": {
      "US": 100,
      "IN": 50,
      "EC": 25
    },
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/72iaezqqthnj1350mdc618namqki/f2f9c6fc18a80b8bafa38f3562360c0e42507f1c0052dcb708593f7efa3bdab8",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "sales_count": "0", # available with the 'view_sales' scope
    "sales_usd_cents": "0", # available with the 'view_sales' scope
    "is_tiered_membership": true,
    "recurrences": ["monthly"], # if is_tiered_membership is true, renders list of available subscription durations; otherwise null
    "variants": [
      {
        "title": "Tier",
        "options": [
          {
            "name": "First Tier",
            "price_difference": 0, # set for non-membership product options
            "purchasing_power_parity_prices": { # set for non-membership product options
              "US": 200,
              "IN": 100,
              "EC": 50
            },
            "is_pay_what_you_want": false,
            "recurrence_prices": { # present for membership products; otherwise null
              "monthly": {
                "price_cents": 300,
                "suggested_price_cents": null, # may return number if is_pay_what_you_want is true
                "purchasing_power_parity_prices": {
                  "US": 400,
                  "IN": 200,
                  "EC": 100
                }
              }
            }
          }
        ]
      }
    ]
  }, {...}, {...}]
}`,
      },
      {
        type: "get",
        path: "/products/:id",
        description: `Retrieve the details of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "product": {
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": true,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "purchasing_power_parity_prices": {
      "US": 100,
      "IN": 50,
      "EC": 25
    },
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/72iaezqqthnj1350mdc618namqki/f2f9c6fc18a80b8bafa38f3562360c0e42507f1c0052dcb708593f7efa3bdab8",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "sales_count": "0", # available with the 'view_sales' scope
    "sales_usd_cents": "0", # available with the 'view_sales' scope
    "is_tiered_membership": true,
    "recurrences": ["monthly"], # if is_tiered_membership is true, renders list of available subscription durations; otherwise null
    "variants": [
      {
        "title": "Tier",
        "options": [
          {
            "name": "First Tier",
            "price_difference": 0, # set for non-membership product options
            "purchasing_power_parity_prices": { # set for non-membership product options
              "US": 200,
              "IN": 100,
              "EC": 50
            },
            "is_pay_what_you_want": false,
            "recurrence_prices": { # present for membership products; otherwise null
              "monthly": {
                "price_cents": 300,
                "suggested_price_cents": null, # may return number if is_pay_what_you_want is true
                "purchasing_power_parity_prices": {
                  "US": 400,
                  "IN": 200,
                  "EC": 100
                }
              }
            }
          }
        ]
      }
    ]
  }
}`,
      },
      {
        type: "delete",
        path: "/products/:id",
        description: `Permanently delete a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA== \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The product has been deleted successfully."
}`,
      },
      {
        type: "put",
        path: "/products/:id/enable",
        description: `Enable an existing product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/enable \
  -d "access_token=ACCESS_TOKEN" \
  -X PUT`,
        responseExample: `{
  "success": true,
  "product": {
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": true,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "purchasing_power_parity_prices": {
      "US": 100,
      "IN": 50,
      "EC": 25
    },
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/72iaezqqthnj1350mdc618namqki/f2f9c6fc18a80b8bafa38f3562360c0e42507f1c0052dcb708593f7efa3bdab8",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "sales_count": "0", # available with the 'view_sales' scope
    "sales_usd_cents": "0", # available with the 'view_sales' scope
    "is_tiered_membership": true,
    "recurrences": ["monthly"], # if is_tiered_membership is true, renders list of available subscription durations; otherwise null
    "variants": [
      {
        "title": "Tier",
        "options": [
          {
            "name": "First Tier",
            "price_difference": 0, # set for non-membership product options
            "purchasing_power_parity_prices": { # set for non-membership product options
              "US": 200,
              "IN": 100,
              "EC": 50
            },
            "is_pay_what_you_want": false,
            "recurrence_prices": { # present for membership products; otherwise null
              "monthly": {
                "price_cents": 300,
                "suggested_price_cents": null, # may return number if is_pay_what_you_want is true
                "purchasing_power_parity_prices": {
                  "US": 400,
                  "IN": 200,
                  "EC": 100
                }
              }
            }
          }
        ]
      }
    ]
  }
}`,
      },
      {
        type: "put",
        path: "/products/:id/disable",
        description: `Disable an existing product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/disable \
  -d "access_token=ACCESS_TOKEN" \
  -X PUT`,
        responseExample: `{
  "success": true,
  "product": {
    "custom_permalink": null,
    "custom_receipt": null,
    "custom_summary": "You'll get one PSD file.",
    "custom_fields": [],
    "customizable_price": null,
    "description": "I made this for fun.",
    "deleted": false,
    "max_purchase_count": null,
    "name": "Pencil Icon PSD",
    "preview_url": null,
    "require_shipping": false,
    "subscription_duration": null,
    "published": false,
    "url": "http://sahillavingia.com/pencil.psd",
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "price": 100,
    "currency": "usd",
    "short_url": "https://sahil.gumroad.com/l/pencil",
    "thumbnail_url": "https://public-files.gumroad.com/variants/72iaezqqthnj1350mdc618namqki/f2f9c6fc18a80b8bafa38f3562360c0e42507f1c0052dcb708593f7efa3bdab8",
    "tags": ["pencil", "icon"],
    "formatted_price": "$1",
    "file_info": {},
    "view_count": "0", # available with the 'view_sales' scope
    "sales_count": "0", # available with the 'view_sales' scope
    "sales_usd_cents": "0", # available with the 'view_sales' scope
    "is_tiered_membership": true,
    "recurrences": ["monthly"], # if is_tiered_membership is true, renders list of available subscription durations; otherwise null
    "variants": [
      {
        "title": "Tier",
        "options": [
          {
            "name": "First Tier",
            "price_difference": 0, # set for non-membership product options
            "is_pay_what_you_want": false,
            "recurrence_prices": { # present for membership products; otherwise null
              "monthly": {
                "price_cents": 300,
                "suggested_price_cents": null # may return number if is_pay_what_you_want is true
              }
            }
          }
        ]
      }
    ]
  }
}`,
      }
    ],
  },
  {
    name: "Variant categories",
    methods: [
      {
        type: "post",
        path: "/products/:product_id/variant_categories",
        description: `Create a new variant category on a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories \
  -d "access_token=ACCESS_TOKEN" \
  -d "title=colors" \
  -X POST`,
        parameters: [
          {
            name: "variant_category",
            description: ``,
            required: true,
          },
          {
            name: "title",
            description: ``,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "variant_category": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }
}`,
      },
      {
        type: "get",
        path: "/products/:product_id/variant_categories/:id",
        description: `Retrieve the details of a variant category of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "variant_category": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }
}`,
      },
      {
        type: "put",
        path: "/products/:product_id/variant_categories/:id",
        description: `Edit a variant category of an existing product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \
  -d "access_token=ACCESS_TOKEN" \
  -d "title=sizes" \
  -X PUT`,
        parameters: [
          {
            name: "variant_category",
            description: ``,
            required: true,
          },
          {
            name: "title",
            description: ``,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "variant_category": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }
}`,
      },
      {
        type: "delete",
        path: "/products/:product_id/variant_categories/:id",
        description: `Permanently delete a variant category of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g== \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The variant_category has been deleted successfully."
}`,
      },
      {
        type: "get",
        path: "/products/:product_id/variant_categories",
        description: `Retrieve all of the existing variant categories of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "variant_categories": [{
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "title": "colors"
  }, {...}, {...}]
}`,
      },
      {
        type: "post",
        path: "/products/:product_id/variant_categories/:variant_category_id/variants",
        description: `Create a new variant of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants \
  -d "access_token=ACCESS_TOKEN" \
  -d "name=red" \
  -d "price_difference_cents=250"`,
        parameters: [
          {
            name: "variant",
            description: ``,
            required: true,
          },
          {
            name: "name",
            description: ``,
            required: true,
          },
          {
            name: "price_difference_cents",
            description: ``,
            required: true,
          },
          {
            name: "max_purchase_count",
            description: `(optional)`,
            required: false,
          },
        ],
        responseExample: `{
  "success": true,
  "variant": {
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }
}`,
      },
      {
        type: "get",
        path: "/products/:product_id/variant_categories/:variant_category_id/variants/:id",
        description: `Retrieve the details of a variant of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "variant": {
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }
}`,
      },
      {
        type: "put",
        path: "/products/:product_id/variant_categories/:variant_category_id/variants/:id",
        description: `Edit a variant of an existing product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \
  -d "access_token=ACCESS_TOKEN" \
  -d "price_difference_cents=150" \
  -X PUT`,
        parameters: [
          {
            name: "variant",
            description: ``,
            required: true,
          },
          {
            name: "name",
            description: ``,
            required: true,
          },
          {
            name: "price_difference_cents",
            description: ``,
            required: true,
          },
          {
            name: "max_purchase_count",
            description: `(optional)`,
            required: false,
          },
        ],
        responseExample: `{
  "success": true,
  "variant": {
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }
}`,
      },
      {
        type: "delete",
        path: "/products/:product_id/variant_categories/:variant_category_id/variants/:id",
        description: `Permanently delete a variant of a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants/kuaXCPHTmRuoK13rNGVbxg== \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The variant has been deleted successfully."
}`,
      },
      {
        type: "get",
        path: "/products/:product_id/variant_categories/:variant_category_id/variants",
        description: `Retrieve all of the existing variants in a variant category.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/variant_categories/mN7CdHiwHaR9FlxKvF-n-g==/variants \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "variants": [{
    "id": "l5C1XQfr2TG3WXcGY7YrUg==",
    "max_purchase_count": null,
    "name": "red",
    "price_difference_cents": 100
  }, {...}, {...}]
}`,
      }
    ],
  },
  {
    name: "Offer codes",
    methods: [
      {
        type: "get",
        path: "/products/:product_id/offer_codes",
        description: `Retrieve all of the existing offer codes for a product. Either amount_cents or percent_off will be returned depending if the offer code is a fixed amount off or a percentage off. A universal offer code is one that applies to all products.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "offer_codes": [{
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": null,
    "universal": false,
    "times_used": 1
  }, {
    "id": "l5C1XQfr2TG3WXcGY7-r-g==",
    "name": "HALFOFF",
    "percent_off": 50,
    "max_purchase_count": null,
    "universal": false,
    "times_used": 1
  }, {...}, {...}]
}`,
      },
      {
        type: "get",
        path: "/products/:product_id/offer_codes/:id",
        description: `Retrieve the details of a specific offer code of a product`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \
  -d "access_token=ACCESS_TOKEN" \
  -d "name=1OFF" \
  -d "amount_cents=100" \
  -X GET`,
        responseExample: `{
  "success": true,
  "offer_code": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": null,
    "times_used": 1
  }
}`,
      },
      {
        type: "post",
        path: "/products/:product_id/offer_codes",
        description: `Create a new offer code for a product. Default offer code is in cents. A universal offer code is one that applies to all products.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes \
  -d "access_token=ACCESS_TOKEN" \
  -d "name=1OFF" \
  -d "amount_off=100" \
  -d "offer_type=cents" \
  -X POST`,
        parameters: [
          {
            name: "name",
            description: `(the coupon code used at checkout)`,
            required: true,
          },
          {
            name: "amount_off",
            description: ``,
            required: true,
          },
          {
            name: "offer_type",
            description: `(optional, "cents" or "percent") Default: "cents"`,
            required: false,
            default: "cents",
          },
          {
            name: "max_purchase_count",
            description: `(optional)`,
            required: false,
          },
          {
            name: "universal",
            description: `(optional, true or false) Default: false`,
            required: false,
            default: "false",
          },
        ],
        responseExample: `{
  "success": true,
  "offer_code": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": null,
    "times_used": 1
  }
}`,
      },
      {
        type: "put",
        path: "/products/:product_id/offer_codes/:id",
        description: `Edit an existing product's offer code.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \
  -d "access_token=ACCESS_TOKEN" \
  -d "max_purchase_count=10" \
  -X PUT`,
        parameters: [
          {
            name: "offer_code",
            description: ``,
            required: true,
          },
          {
            name: "max_purchase_count",
            description: ``,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "offer_code": {
    "id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "name": "1OFF",
    "amount_cents": 100,
    "max_purchase_count": 10,
    "universal": false
  }
}`,
      },
      {
        type: "delete",
        path: "/products/:product_id/offer_codes/:id",
        description: `Permanently delete a product's offer code.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/offer_codes/bfi_30HLgGWL8H2wo_Gzlg== \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The offer_code has been deleted successfully."
}`,
      }
    ],
  },
  {
    name: "Custom fields",
    methods: [
      {
        type: "get",
        path: "/products/:product_id/custom_fields",
        description: `Retrieve all of the existing custom fields for a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "custom_fields": [{
    "name": "phone number",
    "required": "false"
  }, {...}, {...}]
}`,
      },
      {
        type: "post",
        path: "/products/:product_id/custom_fields",
        description: `Create a new custom field for a product.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields \
  -d "access_token=ACCESS_TOKEN" \
  -d "name=phone number" \
  -d "required=true" \
  -X POST`,
        parameters: [
          {
            name: "variant",
            description: ``,
            required: true,
          },
          {
            name: "name",
            description: ``,
            required: true,
          },
          {
            name: "required",
            description: `(true or false)`,
            required: true,
          },
        ],
        responseExample: `{
    "success": true,
    "custom_field": {
      "name": "phone number",
      "required": "false"
    }
  }`,
      },
      {
        type: "put",
        path: "/products/:product_id/custom_fields/:name",
        description: `Edit an existing product's custom field.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields/phone%20number \
  -d "access_token=ACCESS_TOKEN" \
  -d "required=false" \
  -d "name=phone number" \
  -X PUT`,
        parameters: [
          {
            name: "variant",
            description: ``,
            required: true,
          },
          {
            name: "required",
            description: `(true or false)`,
            required: true,
          },
        ],
        responseExample: `{
    "success": true,
    "custom_field": {
      "name": "phone number",
      "required": "false"
    }
  }`,
      },
      {
        type: "delete",
        path: "/products/:product_id/custom_fields/:name",
        description: `Permanently delete a product's custom field.`,
        curlExample: `curl https://api.gumroad.com/v2/products/A-m3CDDC5dlrSdKZp0RFhA==/custom_fields/phone%20number \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The custom_field has been deleted successfully."
}`,
      }
    ],
  },
  {
    name: "User",
    methods: [
      {
        type: "get",
        path: "/user",
        description: `Retrieve the user's data.`,
        curlExample: `curl https://api.gumroad.com/v2/user \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "user": {
    "bio": "a sailor, a tailor",
    "name": "John Smith",
    "twitter_handle": null,
    "user_id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "email": "johnsmith@gumroad.com", # available with the 'view_sales' scope
    "url": "https://gumroad.com/sailorjohn" # only if username is set
  }
}`,
      }
    ],
  },
  {
    name: "Resource subscriptions",
    methods: [
      {
        type: "put",
        path: "/resource_subscriptions",
        description: `Subscribe to a resource. Currently there are 8 supported resource names - "sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", and "subscription_restarted".</p><p><strong>sale</strong> - When subscribed to this resource, you will be notified of the user's sales with an HTTP POST to your post_url. The format of the POST is described on the <a href='/ping'>Gumroad Ping</a> page.</p><p><strong>refund</strong> - When subscribed to this resource, you will be notified of refunds to the user's sales with an HTTP POST to your post_url. The format of the POST is same as described on the <a href='/ping'>Gumroad Ping</a> page.</p><p><strong>dispute</strong> - When subscribed to this resource, you will be notified of the disputes raised against user's sales with an HTTP POST to your post_url. The format of the POST is described on the <a href='/ping'>Gumroad Ping</a> page.</p><p><strong>dispute_won</strong> - When subscribed to this resource, you will be notified of the sale disputes won by the user with an HTTP POST to your post_url. The format of the POST is described on the <a href='/ping'>Gumroad Ping</a> page.</p><p><strong>cancellation</strong> - When subscribed to this resource, you will be notified of cancellations of the user's subscribers with an HTTP POST to your post_url.</p><p><strong>subscription_updated</strong> - When subscribed to this resource, you will be notified when subscriptions to the user's products have been upgraded or downgraded with an HTTP POST to your post_url. A subscription is "upgraded" when the subscriber switches to an equally or more expensive tier and/or subscription duration. It is "downgraded" when the subscriber switches to a less expensive tier and/or subscription duration. In the case of a downgrade, this change will take effect at the end of the current billing period. (Note: This currently applies only to tiered membership products, not to all subscription products.)</p><p><strong>subscription_ended</strong> - When subscribed to this resource, you will be notified when subscriptions to the user's products have ended with an HTTP POST to your post_url. These events include termination of a subscription due to: failed payment(s); cancellation; or a subscription of fixed duration ending. Notifications are sent at the time the subscription has officially ended, not, for example, at the time cancellation is requested.</p><p><strong>subscription_restarted</strong> - When subscribed to this resource, you will be notified when subscriptions to the user's products have been restarted with an HTTP POST to your post_url. A subscription is "restarted" when the subscriber restarts their subscription after previously terminating it.</p><p>
                        <span>In each POST request, Gumroad sends these parameters:</span><br>
                        <strong>subscription_id</strong>: id of the subscription<br>
                        <strong>product_id</strong>: id of the product<br>
                        <strong>product_name</strong>: name of the product<br>
                        <strong>user_id</strong>: user id of the subscriber<br>
                        <strong>user_email</strong>: email address of the subscriber<br>
                        <strong>purchase_ids</strong>: array of charge ids belonging to this subscription<br>
                        <strong>created_at</strong>: timestamp when subscription was created<br>
                        <strong>charge_occurrence_count</strong>: number of charges made for this subscription<br>
                        <strong>recurrence</strong>: subscription duration - monthly/quarterly/biannually/yearly/every_two_years<br>
                        <strong>free_trial_ends_at</strong>: timestamp when free trial ends, if free trial is enabled for the membership<br>
                        <strong>custom_fields</strong>: custom fields from the original purchase<br>
                        <strong>license_key</strong>: license key from the original purchase
                      </p>
                      <p>
                        <em>For "cancellation" resource:</em><br>
                        <strong>cancelled</strong>: true if subscription has been cancelled, otherwise false<br>
                        <strong>cancelled_at</strong>: timestamp at which subscription will be cancelled<br>
                        <strong>cancelled_by_admin</strong>: true if subscription was been cancelled by admin, otherwise not present<br>
                        <strong>cancelled_by_buyer</strong>: true if subscription was been cancelled by buyer, otherwise not present<br>
                        <strong>cancelled_by_seller</strong>: true if subscription was been cancelled by seller, otherwise not present<br>
                        <strong>cancelled_due_to_payment_failures</strong>: true if subscription was been cancelled automatically because of payment failure, otherwise not present
                      </p>
                      <p>
                        <em>For "subscription_updated" resource:</em><br>
                        <strong>type</strong>: "upgrade" or "downgrade"<br>
                        <strong>effective_as_of</strong>: timestamp at which the change went or will go into effect<br>
                        <strong>old_plan</strong>: tier, subscription duration, price, and quantity of the subscription before the change<br>
                        <strong>new_plan</strong>: tier, subscription duration, price, and quantity of the subscription after the change
                      </p>
<figure class="code">
  <figcaption>Example</figcaption><pre tabindex="0">{
  ...
  type: "upgrade",
  effective_as_of: "2021-02-23T16:31:44Z",
  old_plan: {
    tier: { id: "G_-mnBf9b1j9A7a4ub4nFQ==", name: "Basic tier" },
    recurrence: "monthly",
    price_cents: "1000",
    quantity: 1
  },
  new_plan: {
    tier: { id: "G_-mnBf9b1j9A7a4ub4nFQ==", name: "Basic tier" },
    recurrence: "yearly",
    price_cents: "12000",
    quantity: 2
  }
}</pre></figure><p></p>
                      <p>
                        <em>For "subscription_ended" resource:</em><br>
                        <strong>ended_at</strong>: timestamp at which the subscription ended<br>
                        <strong>ended_reason</strong>: the reason for the subscription ending ("cancelled", "failed_payment", or "fixed_subscription_period_ended")
                      </p>
                      <p>
                        <em>For "subscription_restarted" resource:</em><br>
                        <strong>restarted_at</strong>: timestamp at which the subscription was restarted<br>
                      `,
        curlExample: `curl https://api.gumroad.com/v2/resource_subscriptions \
  -d "access_token=ACCESS_TOKEN" \
  -d "resource_name=sale" \
  -d "post_url=https://postatmebro.com" \
  -X PUT`,
        responseExample: `{
  "success": true,
  "resource_subscription": {
    "id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "resource_name": "sale",
    "post_url": "https://postatmebro.com"
  }
}`,
      },
      {
        type: "get",
        path: "/resource_subscriptions",
        description: `Show all active subscriptions of user for the input resource.`,
        curlExample: `curl https://api.gumroad.com/v2/resource_subscriptions \
  -d "access_token=ACCESS_TOKEN" \
  -d "resource_name=sale" \
  -X GET`,
        parameters: [
          {
            name: "resource_name",
            description: `(string) - Currently there are 8 supported values - "sale", "refund", "dispute", "dispute_won", "cancellation", "subscription_updated", "subscription_ended", and "subscription_restarted".`,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "resource_subscriptions": [{
    "id": "G_-mnBf9b1j9A7a4ub4nFQ==",
    "resource_name": "sale",
    "post_url": "https://postatmebro.com"
  }, {...}, {...}]
}`,
      },
      {
        type: "delete",
        path: "/resource_subscriptions/:resource_subscription_id",
        description: `Unsubscribe from a resource.`,
        curlExample: `curl https://api.gumroad.com/v2/resource_subscriptions/G_-mnBf9b1j9A7a4ub4nFQ== \
  -d "access_token=ACCESS_TOKEN" \
  -X DELETE`,
        responseExample: `{
  "success": true,
  "message": "The resource_subscription was deleted successfully."
}`,
      }
    ],
  },
  {
    name: "Sales",
    methods: [
      {
        type: "get",
        path: "/sales",
        description: `Retrieves all of the successful sales by the authenticated user. Available with the 'view_sales' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/sales \
  -d "access_token=ACCESS_TOKEN" \
  -d "before=2021-09-03" \
  -d "after=2020-09-03" \
  -d "product_id=bfi_30HLgGWL8H2wo_Gzlg==" \
  -d "email=calvin@gumroad.com" \
  -X GET`,
        parameters: [
          {
            name: "after",
            description: `(optional, date in form YYYY-MM-DD) - Only return sales after this date`,
            required: false,
          },
          {
            name: "before",
            description: `(optional, date in form YYYY-MM-DD) - Only return sales before this date`,
            required: false,
          },
          {
            name: "product_id",
            description: `(optional) - Filter sales by this product`,
            required: false,
          },
          {
            name: "email",
            description: `(optional) - Filter sales by this email`,
            required: false,
          },
          {
            name: "order_id",
            description: `(optional) - Filter sales by this Order ID`,
            required: false,
          },
          {
            name: "page_key",
            description: `(optional) - A key representing a page of results. It is given in the response as 'next_page_key'.`,
            required: false,
          },
        ],
        responseExample: `{
  "success": true,
  "next_page_url": "/v2/sales?page_key=20230119081040000000-123456&before=2021-09-03&after=2020-09-03&email=calvin%40gumroad.com",
  "next_page_key": "20230119081040000000-123456",
  "sales": [
    {
      "id": "B28UKN-dvxYabdavG97Y-Q==",
      "email": "calvin@gumroad.com",
      "seller_id": "kL0paVL2SdmJSYsNs-OCMg==",
      "timestamp": "about 2 months ago",
      "daystamp": " 5 Jan 2021 11:38 AM",
      "created_at": "2021-01-05T19:38:56Z",
      "product_name": "Pencil Icon PSD",
      "product_has_variants": true,
      "price": 1000,
      "gumroad_fee": 60,
      "subscription_duration": "monthly",
      "formatted_display_price": "$10 a month",
      "formatted_total_price": "$10 a month",
      "currency_symbol": "$",
      "amount_refundable_in_currency": "0",
      "product_id": "32-nPainqpLj1B_WIwVlMw==",
      "product_permalink": "XCBbJ",
      "partially_refunded": false,
      "chargedback": false,
      "purchase_email": "calvin@gumroad.com",
      "zip_code": "625003",
      "paid": false,
      "has_variants": true,
      "variants": {
        "Tier": "Premium"
      },
      "variants_and_quantity": "(Premium)",
      "has_custom_fields": true,
      "custom_fields": {"Twitter handle": "@gumroad"},
      "order_id": 524459995,
      "is_product_physical": false,
      "purchaser_id": "5530311507811",
      "is_recurring_billing": true,
      "can_contact": true,
      "is_following": false,
      "disputed": false,
      "dispute_won": false,
      "is_additional_contribution": false,
      "discover_fee_charged": false,
      "is_gift_sender_purchase": false,
      "is_gift_receiver_purchase": false,
      "referrer": "https://www.facebook.com",
      "card": {
        "visual": null,
        "type": null
      },
      "product_rating": null,
      "reviews_count": 0,
      "average_rating": 0,
      "subscription_id": "GazW4_NBcQy-o7Gjjng7lw==",
      "cancelled": false,
      "ended": false,
      "recurring_charge": false,
      "license_key": "83DB262A-C19D3B06-A5235A6B-8C079166",
      "license_id": "bEtKQ3Zu9SgNopem0-ZywA==",
      "license_disabled": false,
      "affiliate": {
        "email": "affiliate@example.com",
        "amount": "$2.50"
      },
      "quantity": 1
    }, {...}, {...}
  ]
}`,
      },
      {
        type: "get",
        path: "/sales/:id",
        description: `Retrieves the details of a sale by this user. Available with the 'view_sales' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/sales/FO8TXN-dvxYabdavG97Y-Q== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "sale": {
    "id": "FO8TXN-dvxYabdavG97Y-Q==",
    "email": "calvin@gumroad.com",
    "seller_id": "kL0paVL2SdmJSYsNs-OCMg==",
    "timestamp": "about 2 months ago",
    "daystamp": " 5 Jan 2021 11:38 AM",
    "created_at": "2021-01-05T19:38:56Z",
    "product_name": "Pencil Icon PSD",
    "product_has_variants": true,
    "price": 1000,
    "gumroad_fee": 60,
    "subscription_duration": "monthly",
    "formatted_display_price": "$10 a month",
    "formatted_total_price": "$10 a month",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "0",
    "product_id": "32-nPainqpLj1B_WIwVlMw==",
    "product_permalink": "XCBbJ",
    "partially_refunded": false,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "zip_code": "625003",
    "paid": false,
    "has_variants": true,
    "variants": {
      "Tier": "Premium"
    },
    "variants_and_quantity": "(Premium)",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 524459995,
    "is_product_physical": false,
    "purchaser_id": "5530311507811",
    "is_recurring_billing": true,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "subscription_id": "GazW4_NBcQy-o7Gjjng7lw==",
    "cancelled": false,
    "ended": false,
    "recurring_charge": false,
    "license_key": "83DB262A-C19D3B06-A5235A6B-8C079166",
    "license_id": "bEtKQ3Zu9SgNopem0-ZywA==",
    "license_disabled": false,
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "offer_code": {
      "name": "FLAT50",
      "displayed_amount_off": "50%"
    }
    "quantity": 1
  }
}`,
      },
      {
        type: "put",
        path: "/sales/:id/mark_as_shipped",
        description: `Marks a sale as shipped. Available with the 'mark_sales_as_shipped' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/mark_as_shipped \
  -d "access_token=ACCESS_TOKEN" \
  -d "tracking_url=https://www.shippingcompany.com/track/t123" \
  -X PUT`,
        parameters: [
          {
            name: "tracking_url",
            description: `(optional)`,
            required: false,
          },
        ],
        responseExample: `{
  "success": true,
  "sale": {
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "email": "calvin@gumroad.com",
    "seller_id": "RkCCaDkPPciPd9155vcaJg==",
    "timestamp": "about 1 month ago",
    "daystamp": "23 Jan 2021 12:23 PM",
    "created_at": "2021-01-23T20:23:21Z",
    "product_name": "classic physical product",
    "product_has_variants": true,
    "price": 2200,
    "gumroad_fee": 217,
    "formatted_display_price": "$22",
    "formatted_total_price": "$22",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "22",
    "product_id": "CCQadnagaqfmKxdHaG5AKQ==",
    "product_permalink": "KHc",
    "refunded": false,
    "partially_refunded": false,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "full_name": "Sample Name",
    "street_address": "Sample street",
    "city": "New York",
    "state": "NY",
    "zip_code": "10001",
    "country": "United States",
    "country_iso2": "US",
    "paid": true,
    "has_variants": true,
    "variants": {
      "Format": "Premium"
    },
    "variants_and_quantity": "(Premium)",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 292372715,
    "is_product_physical": true,
    "purchaser_id": "6225273416381",
    "is_recurring_billing": false,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": "**** **** **** 4242",
      "type": "visa"
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "shipped": true,
    "tracking_url": "https://www.shippingcompany.com/track/t123",
    "license_key": "740A36FE-80134D88-9998290C-1B30910C",
    "license_id": "mN7CdHiwHaR9FlxKvF-n-g==",
    "license_disabled": false,
    "sku_id": "6Oo2MGSSagZU5naeWaDaNQ==",
    "sku_external_id": "6Oo2MGSS1gaU5a5eWaDaNQ==",
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "quantity": 1
  }
}`,
      },
      {
        type: "put",
        path: "/sales/:id/refund",
        description: `Refunds a sale. Available with the 'edit_sales' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/refund \
  -d "access_token=ACCESS_TOKEN" \
  -d "amount_cents=200" \
  -X PUT`,
        parameters: [
          {
            name: "amount_cents",
            description: `(optional) - Amount in cents (in currency of the sale) to be refunded. If set, issue partial refund by this amount.
If not set, issue full refund. You can issue multiple partial refunds per sale until it is fully refunded.`,
            required: false,
          },
        ],
        responseExample: `{
  "success": true,
  "sale": {
    "id": "A-m3CDDC5dlrSdKZp0RFhA==",
    "email": "calvin@gumroad.com",
    "seller_id": "RkCCODaPPciPd9155vcQJg==",
    "timestamp": "about 1 month ago",
    "daystamp": "23 Jan 2021 10:24 AM",
    "created_at": "2021-01-23T18:24:07Z",
    "product_name": "Pencil Icon PSD",
    "product_has_variants": false,
    "price": 1000,
    "gumroad_fee": 115,
    "formatted_display_price": "$10",
    "formatted_total_price": "$10",
    "currency_symbol": "$",
    "amount_refundable_in_currency": "8",
    "product_id": "e7xqFa2WL0E-qJlQ4WYJxA==",
    "product_permalink": "RSE",
    "refunded": false,
    "partially_refunded": true,
    "chargedback": false,
    "purchase_email": "calvin@gumroad.com",
    "street_address": "",
    "city": "",
    "state": "AA",
    "zip_code": "67600",
    "paid": true,
    "has_variants": false,
    "variants_and_quantity": "",
    "has_custom_fields": false,
    "custom_fields": {},
    "order_id": 343932147,
    "is_product_physical": false,
    "is_recurring_billing": false,
    "can_contact": true,
    "is_following": false,
    "disputed": false,
    "dispute_won": false,
    "is_additional_contribution": false,
    "discover_fee_charged": false,
    "is_gift_sender_purchase": false,
    "is_gift_receiver_purchase": false,
    "referrer": "direct",
    "card": {
      "visual": "**** **** **** 4242",
      "type": "visa"
    },
    "product_rating": null,
    "reviews_count": 0,
    "average_rating": 0,
    "affiliate": {
      "email": "affiliate@example.com",
      "amount": "$2.50"
    },
    "quantity": 1
  }
}`,
      },
      {
        type: "post",
        path: "/sales/:id/resend_receipt",
        description: `Resend the purchase receipt to the customer's email. Available with the 'edit_sales' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/sales/A-m3CDDC5dlrSdKZp0RFhA==/resend_receipt \
  -d "access_token=ACCESS_TOKEN" \
  -X POST`,
        responseExample: `{
  "success": true
}`,
      }
    ],
  },
  {
    name: "Subscribers",
    methods: [
      {
        type: "get",
        path: "/products/:product_id/subscribers",
        description: `Retrieves all of the active subscribers for one of the authenticated user's products. Available with the 'view_sales' scope<p>A subscription is terminated if any of <strong>failed_at</strong>, <strong>ended_at</strong>, or <strong>cancelled_at</strong> timestamps are populated and are in the past.</p><p>A subscription's <strong>status</strong> can be one of: <strong>alive</strong>, <strong>pending_cancellation</strong>, <strong>pending_failure</strong>, <strong>failed_payment</strong>, <strong>fixed_subscription_period_ended</strong>, <strong>cancelled</strong>.</p>`,
        curlExample: `curl https://api.gumroad.com/v2/products/0ssD7adjRklGBjS5cwlWPq==/subscribers \
  -d "access_token=ACCESS_TOKEN" \
  -d "paginated=true" \
  -d "email=calvin@gumroad.com" \
  -X GET`,
        parameters: [
          {
            name: "email",
            description: `(optional) - Filter subscribers by this email`,
            required: false,
          },
          {
            name: "paginated",
            description: `(optional, default: "false") - Set to "true" to limit the number of subscribers returned to 100.`,
            required: false,
            default: "false",
          },
          {
            name: "page_key",
            description: `(optional) - A key representing a page of results. It is given in the paginated response of the previous page as 'next_page_key'.`,
            required: false,
          },
        ],
        responseExample: `{
  "success":true,
  "next_page_url": "/v2/products/0ssD7adjRklGBjS5cwlWPq==/subscribers?page_key=20241004235318372406-857093235&email=calvin%40gumroad.com",
  "next_page_key": "20241004235318372406-857093235",
  "subscribers": [{
    "id": "P5ppE6H8XIjy2JSCgUhbAw==",
    "product_id": "0ssD7adjRklGBjS5cwlWPq==",
    "product_name":"Pencil Icon PSD",
    "user_id": "3523953790232",
    "user_email":"calvin@gumroad.com",
    "purchase_ids": [O4pjE6H8XNjy2JSCgKhbAw==],
    "created_at": "2015-06-30T17:38:04Z",
    "user_requested_cancellation_at": null,
    "charge_occurrence_count": null,
    "recurrence": "monthly",
    "cancelled_at": null,
    "ended_at": null,
    "failed_at": null,
    "free_trial_ends_at": null,
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "status": "alive"
  }]
}`,
      },
      {
        type: "get",
        path: "/subscribers/:id",
        description: `Retrieves the details of a subscriber to this user's product. Available with the 'view_sales' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/subscribers/P5ppE6H8XIjy2JSCgUhbAw== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success":true,
  "subscribers": {
    "id": "P5ppE6H8XIjy2JSCgUhbAw==",
    "product_id": "0ssD7adjRklGBjS5cwlWPq==",
    "product_name":"Pencil Icon PSD",
    "user_id": "3523953790232",
    "user_email":"calvin@gumroad.com",
    "purchase_ids": [O4pjE6H8XNjy2JSCgKhbAw==],
    "created_at": "2015-06-30T17:38:04Z",
    "user_requested_cancellation_at": null,
    "charge_occurrence_count": null,
    "recurrence": "monthly",
    "cancelled_at": null,
    "ended_at": null,
    "failed_at": null,
    "free_trial_ends_at": null,
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "status": "alive"
  }
}`,
      }
    ],
  },
  {
    name: "Licenses",
    methods: [
      {
        type: "post",
        path: "/licenses/verify",
        description: `Verify a license`,
        curlExample: `curl https://api.gumroad.com/v2/licenses/verify \
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \
  -X POST`,
        parameters: [
          {
            name: "product_id",
            description: `(the unique ID of the product, available on product's edit page)`,
            required: true,
          },
          {
            name: "license_key",
            description: `(the license key provided by your customer)`,
            required: true,
          },
          {
            name: "increment_uses_count",
            description: `("true"/"false", optional, default: "true")`,
            required: true,
            default: "true",
          },
        ],
        responseExample: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false, # purchase was refunded, non-subscription product only
    "subscription_ended_at": null, # subscription was ended, subscription product only
    "subscription_cancelled_at": null, # subscription was cancelled, subscription product only
    "subscription_failed_at": null # we were unable to charge the subscriber's card
  }
}`,
      },
      {
        type: "put",
        path: "/licenses/enable",
        description: `Enable a license`,
        curlExample: `curl https://api.gumroad.com/v2/licenses/enable \
  -d "access_token=ACCESS_TOKEN" \
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \
  -X PUT`,
        parameters: [
          {
            name: "product_id",
            description: `(the unique ID of the product, available on product's edit page)`,
            required: true,
          },
          {
            name: "license_key",
            description: `(the license key provided by your customer)`,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false, # purchase was refunded, non-subscription product only
    "subscription_ended_at": null, # subscription was ended, subscription product only
    "subscription_cancelled_at": null, # subscription was cancelled, subscription product only
    "subscription_failed_at": null # we were unable to charge the subscriber's card
  }
}`,
      },
      {
        type: "put",
        path: "/licenses/disable",
        description: `Disable a license`,
        curlExample: `curl https://api.gumroad.com/v2/licenses/disable \
  -d "access_token=ACCESS_TOKEN" \
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \
  -X PUT`,
        parameters: [
          {
            name: "product_id",
            description: `(the unique ID of the product, available on product's edit page)`,
            required: true,
          },
          {
            name: "license_key",
            description: `(the license key provided by your customer)`,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false, # purchase was refunded, non-subscription product only
    "subscription_ended_at": null, # subscription was ended, subscription product only
    "subscription_cancelled_at": null, # subscription was cancelled, subscription product only
    "subscription_failed_at": null # we were unable to charge the subscriber's card
  }
}`,
      },
      {
        type: "put",
        path: "/licenses/decrement_uses_count",
        description: `Decrement the uses count of a license`,
        curlExample: `curl https://api.gumroad.com/v2/licenses/decrement_uses_count \
  -d "access_token=ACCESS_TOKEN" \
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \
  -X PUT`,
        parameters: [
          {
            name: "product_id",
            description: `(the unique ID of the product, available on product's edit page)`,
            required: true,
          },
          {
            name: "license_key",
            description: `(the license key provided by your customer)`,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false, # purchase was refunded, non-subscription product only
    "subscription_ended_at": null, # subscription was ended, subscription product only
    "subscription_cancelled_at": null, # subscription was cancelled, subscription product only
    "subscription_failed_at": null # we were unable to charge the subscriber's card
  }
}`,
      },
      {
        type: "put",
        path: "/licenses/rotate",
        description: `Rotate a license key. The old license key will no longer be valid.`,
        curlExample: `curl https://api.gumroad.com/v2/licenses/rotate \
  -d "access_token=ACCESS_TOKEN" \
  -d "product_id=32-nPAicqbLj8B_WswVlMw==" \
  -d "license_key=A1B2C3D4-E5F60718-9ABCDEF0-1234ABCD" \
  -X PUT`,
        parameters: [
          {
            name: "product_id",
            description: `(the unique ID of the product, available on product's edit page)`,
            required: true,
          },
          {
            name: "license_key",
            description: `(the license key provided by your customer)`,
            required: true,
          },
        ],
        responseExample: `{
  "success": true,
  "uses": 3,
  "purchase": {
    "seller_id": "kL0psVL2admJSYRNs-OCMg==",
    "product_id": "32-nPAicqbLj8B_WswVlMw==",
    "product_name": "licenses demo product",
    "permalink": "QMGY",
    "product_permalink": "https://sahil.gumroad.com/l/pencil",
    "email": "customer@example.com",
    "price": 0,
    "gumroad_fee": 0,
    "currency": "usd",
    "quantity": 1,
    "discover_fee_charged": false,
    "can_contact": true,
    "referrer": "direct",
    "card": {
      "visual": null,
      "type": null
    },
    "order_number": 524459935,
    "sale_id": "FO8TXN-dbxYaBdahG97Y-Q==",
    "sale_timestamp": "2021-01-05T19:38:56Z",
    "purchaser_id": "5550321502811",
    "subscription_id": "GDzW4_aBdQc-o7Gbjng7lw==",
    "variants": "",
    "license_key": "85DB562A-C11D4B06-A2335A6B-8C079166",
    "is_multiseat_license": false,
    "ip_country": "United States",
    "recurrence": "monthly",
    "is_gift_receiver_purchase": false,
    "refunded": false,
    "disputed": false,
    "dispute_won": false,
    "id": "FO8TXN-dvaYbBbahG97a-Q==",
    "created_at": "2021-01-05T19:38:56Z",
    "custom_fields": [],
    "chargebacked": false, # purchase was refunded, non-subscription product only
    "subscription_ended_at": null, # subscription was ended, subscription product only
    "subscription_cancelled_at": null, # subscription was cancelled, subscription product only
    "subscription_failed_at": null # we were unable to charge the subscriber's card
  }
}`,
      }
    ],
  },
  {
    name: "Payouts",
    methods: [
      {
        type: "get",
        path: "/payouts",
        description: `Retrieves all of the payouts for the authenticated user. Available with the 'view_payouts' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/payouts \
  -d "access_token=ACCESS_TOKEN" \
  -d "before=2021-09-03" \
  -d "after=2020-09-03" \
  -X GET`,
        parameters: [
          {
            name: "after",
            description: `(optional, date in form YYYY-MM-DD) - Only return payouts after this date`,
            required: false,
          },
          {
            name: "before",
            description: `(optional, date in form YYYY-MM-DD) - Only return payouts before this date`,
            required: false,
          },
          {
            name: "page_key",
            description: `(optional) - A key representing a page of results. It is given in the response as 'next_page_key'.`,
            required: false,
          },
          {
            name: "include_upcoming",
            description: `(optional, default: "true") - Set to "false" to exclude the upcoming payout from the response.`,
            required: false,
            default: "true",
          },
        ],
        responseExample: `{
  "success": true,
  "next_page_url": "/v2/payouts?page_key=20240709081040000000-fEGTaE&before=2021-09-03&after=2020-09-03",
  "next_page_key": "20240709081040000000-fEGTaE",
  "payouts": [
    {
      "id": null,
      "amount": "75.00",
      "currency": "USD",
      "status": "payable",
      "created_at": "2021-01-14T00:00:00Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    }
    {
      "id": "fEGTaEpuKDsnDvf_MfecTA==",
      "amount": "150.00",
      "currency": "USD",
      "status": "completed",
      "created_at": "2021-01-05T19:38:56Z",
      "processed_at": "2021-01-06T10:15:30Z",
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    },
    {
      "id": "32-nPainqpLj1B_WIwVlMw==",
      "amount": "275.50",
      "currency": "USD",
      "status": "pending",
      "created_at": "2021-01-04T14:22:10Z",
      "processed_at": null,
      "payment_processor": "paypal",
      "bank_account_visual": null,
      "paypal_email": "test@example.com"
    },
    {
      "id": "GazW4_NBcQy-o7Gjjng7lw==",
      "amount": "89.99",
      "currency": "EUR",
      "status": "failed",
      "created_at": "2021-01-03T09:45:32Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    }
  ]
}`,
      },
      {
        type: "get",
        path: "/payouts/:id",
        description: `Retrieves the details of a specific payout by this user. Available with the 'view_payouts' scope.`,
        curlExample: `curl https://api.gumroad.com/v2/payouts/fEGTaEpuKDsnDvf_MfecTA== \
  -d "access_token=ACCESS_TOKEN" \
  -X GET`,
        responseExample: `{
  "success": true,
  "payout": {
    "id": "fEGTaEpuKDsnDvf_MfecTA==",
    "amount": "150.00",
    "currency": "USD",
    "status": "completed",
    "created_at": "2021-01-05T19:38:56Z",
    "processed_at": "2021-01-06T10:15:30Z",
    "payment_processor": "stripe"
  }
}`,
      }
    ],
  }
];
