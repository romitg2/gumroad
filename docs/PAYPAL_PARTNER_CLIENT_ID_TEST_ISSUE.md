# Missing `PAYPAL_PARTNER_CLIENT_ID` During Pre-rendering Tests

## Problem

Multiple tests were failing during **pre-rendering** (server-side rendering of React components) because the `PAYPAL_PARTNER_CLIENT_ID` environment variable was missing from the test environment configuration.

### CI Failure

https://github.com/antiwork/gumroad/actions/runs/20626922491

The CI shows multiple test failures with errors related to `PAYPAL_PARTNER_CLIENT_ID` being `nil` during component pre-rendering. Tests fail when React components try to access this environment variable value that hasn't been set in the test environment.

<img width="1626" alt="CI test failures showing multiple specs failing during pre-rendering" src="https://github.com/user-attachments/assets/1e516b33-2794-4829-9416-6ac1ed7e4a67" />

### Local Test Failure (Before Fix)

When running tests locally without the environment variable set, you would see errors indicating that the constant `PAYPAL_PARTNER_CLIENT_ID` is `nil`, causing failures in any test that renders components requiring this value.

<img width="1853" alt="Local test failure showing prerender error" src="https://github.com/user-attachments/assets/27bafb63-f327-442a-b596-4640cf99c084" />

## Why This Happens: The Flow

Here's the detailed flow of how this issue occurs:

### 1. Application Initialization

**Location**: `config/initializers/paypal.rb:11`

```ruby
PAYPAL_PARTNER_CLIENT_ID = GlobalConfig.get("PAYPAL_PARTNER_CLIENT_ID")
```

When Rails boots up, this initializer runs and creates a constant by fetching the value from environment variables or Rails credentials via `GlobalConfig.get()`.

### 2. GlobalConfig Resolution

**Location**: `lib/utilities/global_config.rb:10-13`

```ruby
def get(name, default = :__no_default_provided__)
  if default == :__no_default_provided__
    value = ENV.fetch(name, fetch_from_credentials(name))
    value.presence
  end
end
```

- First checks `ENV["PAYPAL_PARTNER_CLIENT_ID"]`
- If not found, tries to fetch from Rails encrypted credentials
- If neither exists, returns `nil`

### 3. React Component Pre-rendering

**Location**: `app/helpers/admin_helper.rb:83`

```ruby
def admin_action(props)
  react_component("AdminActionButton", props:, prerender: true)
end
```

When tests render admin components with `prerender: true`, React components are rendered on the **server-side** (in Ruby/Node.js) before being sent to the client.

### 4. CheckoutPresenter Props

**Location**: `app/presenters/checkout_presenter.rb:282`

```ruby
def checkout_common
  {
    discover_url: discover_url(protocol: PROTOCOL, host: DISCOVER_DOMAIN),
    countries: Compliance::Countries.for_select.to_h,
    us_states: STATES,
    ca_provinces: Compliance::Countries.subdivisions_for_select(Compliance::Countries::CAN.alpha2).map(&:first),
    recaptcha_key: GlobalConfig.get("RECAPTCHA_MONEY_SITE_KEY"),
    paypal_client_id: PAYPAL_PARTNER_CLIENT_ID,  # ← Uses the constant
  }
end
```

When checkout-related components are rendered, they need `PAYPAL_PARTNER_CLIENT_ID` in their props.

### 5. The Failure

If `PAYPAL_PARTNER_CLIENT_ID` is `nil`:

- The constant is set to `nil` during Rails initialization
- When pre-rendering happens, components receive `paypal_client_id: nil`
- JavaScript code might try to use this value, causing errors
- Tests fail during server-side rendering

## Example Test Failure Flow

```
Test starts
  ↓
Rails initializes
  ↓
config/initializers/paypal.rb runs
  ↓
PAYPAL_PARTNER_CLIENT_ID = GlobalConfig.get("PAYPAL_PARTNER_CLIENT_ID")
  ↓
Checks ENV["PAYPAL_PARTNER_CLIENT_ID"] → Not found in .env.test
  ↓
Checks Rails credentials → Not found (or no test credentials)
  ↓
PAYPAL_PARTNER_CLIENT_ID = nil
  ↓
Test renders admin component with prerender: true
  ↓
CheckoutPresenter builds props with paypal_client_id: nil
  ↓
React component tries to use nil value during server rendering
  ↓
ERROR: Cannot read property of null/undefined
  ↓
Test fails ❌
```

## The Solution

Add the environment variable to `.env.test`:

```bash
# .env.test
PAYPAL_PARTNER_CLIENT_ID=AQiKjZAqXGcN_oU8wh-RKelv6Nf3IrWVY9J9rrhz1pF7aqiyZjutSdG75I6ahd3zJe1ThpklFp5jNaman
```

This ensures:

1. During test initialization, `GlobalConfig.get()` finds the value in `ENV`
2. The constant is set to a valid string instead of `nil`
3. Pre-rendered components receive valid props
4. Tests pass ✅

### Local Test Success (After Fix)

After adding `PAYPAL_PARTNER_CLIENT_ID` to `.env.test`, all tests pass successfully. The environment variable is now properly loaded during test initialization, allowing components to render without errors.

<img width="1333" alt="Tests passing after adding PAYPAL_PARTNER_CLIENT_ID to .env.test" src="https://github.com/user-attachments/assets/ef1af1a2-3f27-4593-9271-4223fc149efd" />

## Why a Dummy Value Works

The value doesn't need to be a real/working PayPal Partner Client ID during tests because:

- **VCR cassettes** (`spec/support/fixtures/vcr_cassettes/`) record and replay HTTP interactions
- The sensitive values are filtered out (`spec/spec_helper.rb:84`):
  ```ruby
  config.filter_sensitive_data("<PAYPAL_PARTNER_CLIENT_ID>") { GlobalConfig.get("PAYPAL_PARTNER_CLIENT_ID") }
  ```
- Tests never make real API calls to PayPal
- The value just needs to be present (not `nil`) for components to render without errors

## Related Files

| File                                                                       | Line       | Purpose                              |
| -------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| `config/initializers/paypal.rb`                                            | 11         | Initializes the constant             |
| `app/presenters/checkout_presenter.rb`                                     | 282        | Uses in component props              |
| `app/business/payments/charging/implementations/paypal/paypal_rest_api.rb` | 10-11, 195 | PayPal API integration               |
| `spec/spec_helper.rb`                                                      | 84         | VCR sensitive data filtering         |
| `.env.example`                                                             | 65         | Documentation                        |
| `.env.development`                                                         | -          | Contains dummy value for development |

## Key Takeaway

Environment variables used during **initialization** (in `config/initializers/`) or during **pre-rendering** must be present in `.env.test`, even if they're just dummy values. The application needs these constants to be non-nil to avoid runtime errors during server-side rendering.
