# How VCR Works: A Step-by-Step Guide

## What is VCR?

VCR (Video Cassette Recorder) is a tool that records HTTP interactions during tests and replays them later, so you don't need to make real HTTP requests every time you run tests.

Think of it like recording a TV show on a VCR tape, then playing it back later instead of watching live TV.

## The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                    TEST EXECUTION FLOW                       │
└─────────────────────────────────────────────────────────────┘

FIRST RUN (Recording Mode):
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Test    │────▶│   VCR    │────▶│  Real    │────▶│  VCR     │
│  Code    │     │  Intercepts│     │  HTTP    │     │  Records │
│          │◀────│  Request  │◀────│  Request │◀────│  Response│
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                                                         │
                                                         ▼
                                                  ┌──────────┐
                                                  │ Cassette │
                                                  │   File   │
                                                  └──────────┘

SUBSEQUENT RUNS (Replay Mode):
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Test    │────▶│   VCR    │────▶│ Cassette │
│  Code    │     │  Matches │     │   File   │
│          │◀────│  Request │◀────│  (No     │
└──────────┘     └──────────┘     │  Network)│
                                  └──────────┘
```

## Step-by-Step: Recording Phase (First Time)

### Step 1: Test Starts

```
Test Code:
┌─────────────────────────────────────────┐
│ TranscodeVideoForStreamingWorker        │
│   .new.perform(product_file.id)         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ client = Aws::MediaConvert::      │  │
│   │   Client.new(...)                │  │
│   │                                 │  │
│   │ response = client.create_job(   │  │
│   │   build_mediaconvert_job(...)   │  │
│   │ )                               │  │
│   └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
         │
         │ Makes HTTP request
         ▼
```

### Step 2: VCR Intercepts the Request

```
┌─────────────────────────────────────────┐
│ VCR Configuration (spec_helper.rb)     │
│                                         │
│ VCR.configure do |config|              │
│   config.hook_into :webmock            │
│   config.cassette_library_dir = ...    │
│   config.filter_sensitive_data(        │
│     "<AWS_ACCOUNT_ID>") {              │
│       GlobalConfig.get("AWS_ACCOUNT_ID")│
│     }                                  │
│ end                                    │
└─────────────────────────────────────────┘
         │
         │ VCR sees: :vcr tag on test
         │ VCR loads cassette:
         │   HandleSnsTranscoderEventWorker/
         │   _perform/
         │   marks_the_transcoded_video_object_as_completed.yml
         │
         ▼
┌─────────────────────────────────────────┐
│ VCR Checks: Is this request recorded?  │
│                                         │
│ Cassette file exists?                   │
│   ├─ NO  → Go to RECORDING mode        │
│   └─ YES → Go to REPLAY mode           │
└─────────────────────────────────────────┘
```

### Step 3: Recording Mode - Request Goes Out

```
┌─────────────────────────────────────────┐
│ Original Request (Before Filtering)     │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Headers:                                │
│   Authorization: AWS4-HMAC-SHA256      │
│     Credential=AKIAIOSFODNN7EXAMPLE/   │
│     .../Signature=abc123...            │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:123456789012:queues/   │
│       staging",                         │
│     "role": "arn:aws:iam::             │
│       123456789012:role/..."            │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ VCR applies filters BEFORE recording
         ▼
┌─────────────────────────────────────────┐
│ Filtered Request (What Gets Recorded)   │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Headers:                                │
│   Authorization: AWS4-HMAC-SHA256      │
│     Credential=<AWS_ACCESS_KEY_ID>/    │
│     .../Signature=abc123...            │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:<AWS_ACCOUNT_ID>:      │
│       queues/staging",                 │
│     "role": "arn:aws:iam::             │
│       <AWS_ACCOUNT_ID>:role/..."       │
│   }                                     │
│                                         │
│ Note: 123456789012 → <AWS_ACCOUNT_ID>  │
│       AKIAIOSFODNN7EXAMPLE →           │
│       <AWS_ACCESS_KEY_ID>              │
└─────────────────────────────────────────┘
         │
         │ Request sent to real AWS
         ▼
┌─────────────────────────────────────────┐
│ Real AWS MediaConvert API               │
│                                         │
│ Processes request, returns response    │
└─────────────────────────────────────────┘
         │
         │ Response comes back
         ▼
┌─────────────────────────────────────────┐
│ Response (Before Filtering)             │
│                                         │
│ Status: 201 Created                     │
│                                         │
│ Body:                                   │
│   {                                     │
│     "job": {                           │
│       "arn": "arn:aws:mediaconvert:    │
│         us-east-1:123456789012:jobs/   │
│         1733430578845-2l9swd",         │
│       "queue": "arn:aws:mediaconvert:   │
│         us-east-1:123456789012:..."    │
│     }                                   │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ VCR filters response
         ▼
┌─────────────────────────────────────────┐
│ Filtered Response (What Gets Recorded) │
│                                         │
│ Status: 201 Created                     │
│                                         │
│ Body:                                   │
│   {                                     │
│     "job": {                           │
│       "arn": "arn:aws:mediaconvert:    │
│         us-east-1:<AWS_ACCOUNT_ID>:    │
│         jobs/1733430578845-2l9swd",    │
│       "queue": "arn:aws:mediaconvert:  │
│         us-east-1:<AWS_ACCOUNT_ID>:..."│
│     }                                   │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ Saved to cassette file
         ▼
┌─────────────────────────────────────────┐
│ Cassette File (YAML)                    │
│                                         │
│ http_interactions:                      │
│   - request:                            │
│       method: post                      │
│       uri: https://.../jobs             │
│       body:                             │
│         string: '{"queue":"...          │
│           <AWS_ACCOUNT_ID>..."}'        │
│       headers:                          │
│         Authorization:                  │
│           Credential=<AWS_ACCESS_KEY_ID>│
│   - response:                           │
│       status: 201                       │
│       body:                             │
│         string: '{"job":{"arn":"...     │
│           <AWS_ACCOUNT_ID>..."}}'       │
└─────────────────────────────────────────┘
```

## Step-by-Step: Replay Phase (Subsequent Runs)

### Step 1: Test Starts Again

```
Same test code runs:
┌─────────────────────────────────────────┐
│ TranscodeVideoForStreamingWorker        │
│   .new.perform(product_file.id)         │
│                                         │
│   client.create_job(...)                │
└─────────────────────────────────────────┘
         │
         │ Makes HTTP request
         ▼
```

### Step 2: VCR Intercepts Again

```
┌─────────────────────────────────────────┐
│ VCR Configuration                       │
│                                         │
│ Checks: Cassette exists? YES            │
│                                         │
│ Mode: REPLAY (not recording)            │
│                                         │
│ Loads cassette from file                │
└─────────────────────────────────────────┘
         │
         ▼
```

### Step 3: Request Matching Process

```
┌─────────────────────────────────────────┐
│ Current Request (From Test)             │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:123456789012:queues/   │
│       staging",                         │
│     "role": "arn:aws:iam::             │
│       123456789012:role/..."            │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ Step 3a: VCR applies filters
         ▼
┌─────────────────────────────────────────┐
│ Filtered Current Request                │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:<AWS_ACCOUNT_ID>:      │
│       queues/staging",                  │
│     "role": "arn:aws:iam::             │
│       <AWS_ACCOUNT_ID>:role/..."       │
│   }                                     │
│                                         │
│ Note: 123456789012 → <AWS_ACCOUNT_ID>  │
└─────────────────────────────────────────┘
         │
         │ Step 3b: VCR compares with cassette
         ▼
┌─────────────────────────────────────────┐
│ Cassette Request (Already Filtered)    │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:<AWS_ACCOUNT_ID>:      │
│       queues/staging",                  │
│     "role": "arn:aws:iam::             │
│       <AWS_ACCOUNT_ID>:role/..."       │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ Step 3c: Matching Logic
         ▼
┌─────────────────────────────────────────┐
│ VCR Matching Configuration              │
│                                         │
│ match_requests_on: [:method, :uri]      │
│                                         │
│ Compare:                                │
│   Method: POST == POST ✓                │
│   URI:    https://.../jobs ==           │
│           https://.../jobs ✓            │
│                                         │
│ Result: MATCH!                          │
└─────────────────────────────────────────┘
         │
         │ If match found, return recorded response
         ▼
┌─────────────────────────────────────────┐
│ Return Recorded Response                │
│                                         │
│ Status: 201 Created                     │
│                                         │
│ Body:                                   │
│   {                                     │
│     "job": {                           │
│       "arn": "arn:aws:mediaconvert:    │
│         us-east-1:<AWS_ACCOUNT_ID>:    │
│         jobs/1733430578845-2l9swd"     │
│     }                                   │
│   }                                     │
│                                         │
│ Note: VCR unfilters before returning:  │
│   <AWS_ACCOUNT_ID> → 123456789012      │
└─────────────────────────────────────────┘
         │
         │ Response returned to test
         ▼
┌─────────────────────────────────────────┐
│ Test Code Receives Response             │
│                                         │
│ response.job.id = "1733430578845-2l9swd"│
│                                         │
│ Test continues normally                 │
└─────────────────────────────────────────┘
```

## What Happens When Credentials Are Missing?

### The Problem Scenario

```
┌─────────────────────────────────────────┐
│ Test Runs WITHOUT AWS Credentials       │
│                                         │
│ ENV["AWS_ACCOUNT_ID"] = nil            │
│ ENV["AWS_ACCESS_KEY_ID"] = nil         │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Code Tries to Build ARN                 │
│                                         │
│ MEDIACONVERT_QUEUE =                    │
│   "arn:aws:mediaconvert:us-east-1:     │
│    #{AWS_ACCOUNT_ID}:queues/staging"   │
│                                         │
│ Result:                                 │
│   "arn:aws:mediaconvert:us-east-1:     │
│    :queues/staging"  ← Empty!           │
│    (Double colon)                       │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Request Created                         │
│                                         │
│ POST https://...mediaconvert.../jobs   │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1::queues/staging",       │
│              ↑↑                         │
│         Empty account ID!               │
│     "role": "arn:aws:iam::              │
│       :role/..."                        │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ VCR tries to filter
         ▼
┌─────────────────────────────────────────┐
│ VCR Filtering                           │
│                                         │
│ filter_sensitive_data("<AWS_ACCOUNT_ID>")│
│   { GlobalConfig.get("AWS_ACCOUNT_ID") }│
│                                         │
│ Problem: Returns nil!                   │
│                                         │
│ VCR can't filter nil → no replacement   │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Filtered Request (No Change)            │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1::queues/staging",      │
│     "role": "arn:aws:iam::             │
│       :role/..."                        │
│   }                                     │
│                                         │
│ Note: Still has empty account ID!       │
└─────────────────────────────────────────┘
         │
         │ VCR tries to match
         ▼
┌─────────────────────────────────────────┐
│ Matching Attempt                        │
│                                         │
│ Current Request:                        │
│   "queue": "...us-east-1::queues..."   │
│                                         │
│ Cassette Request:                       │
│   "queue": "...us-east-1:<AWS_ACCOUNT_ID>│
│   :queues..."                           │
│                                         │
│ Even though match_requests_on is        │
│ [:method, :uri], the body is different!│
│                                         │
│ Result: NO MATCH                        │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ VCR Error                               │
│                                         │
│ VCR::Errors::UnhandledHTTPRequestError  │
│                                         │
│ "An HTTP request has been made that    │
│  VCR does not know how to handle"      │
│                                         │
│ Test FAILS                              │
└─────────────────────────────────────────┘
```

## The Solution: Adding Credentials

### With Credentials Set

```
┌─────────────────────────────────────────┐
│ .env.test                               │
│                                         │
│ AWS_ACCOUNT_ID=123456789012             │
│ AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE  │
│ AWS_SECRET_ACCESS_KEY=...               │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Code Builds Valid ARN                   │
│                                         │
│ MEDIACONVERT_QUEUE =                    │
│   "arn:aws:mediaconvert:us-east-1:     │
│    123456789012:queues/staging"         │
│                                         │
│ ✓ Valid ARN!                            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Request Created                         │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:123456789012:queues/   │
│       staging",                           │
│     "role": "arn:aws:iam::             │
│       123456789012:role/..."            │
│   }                                     │
└─────────────────────────────────────────┘
         │
         │ VCR filters successfully
         ▼
┌─────────────────────────────────────────┐
│ Filtered Request                        │
│                                         │
│ Body:                                   │
│   {                                     │
│     "queue": "arn:aws:mediaconvert:    │
│       us-east-1:<AWS_ACCOUNT_ID>:      │
│       queues/staging",                  │
│     "role": "arn:aws:iam::             │
│       <AWS_ACCOUNT_ID>:role/..."       │
│   }                                     │
│                                         │
│ ✓ Matches cassette!                    │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Test PASSES                             │
└─────────────────────────────────────────┘
```

## Key Concepts Summary

### 1. Filtering Happens Twice

```
Recording:
  Real Value → Filter → Placeholder → Save to Cassette

Replaying:
  Real Value → Filter → Placeholder → Compare with Cassette
```

### 2. Matching Logic

```
VCR compares:
  1. Method (POST, GET, etc.)
  2. URI (the URL)

It does NOT compare (by default):
  - Headers (except for matching purposes)
  - Body content
  - Query parameters

But: Body differences can still cause issues if filtering fails!
```

### 3. Why Credentials Matter

```
Without Credentials:
  ARN = "arn:aws:...::queues/staging"  ← Invalid
  Filtering fails (nil value)
  Matching fails
  Test fails

With Credentials:
  ARN = "arn:aws:...:123456789012:queues/staging"  ← Valid
  Filtering works (replaces 123456789012)
  Matching works
  Test passes
```

## Visual Flow Diagram

```
                    TEST EXECUTION
                         │
                         ▼
            ┌────────────────────────┐
            │  Load VCR Configuration│
            └────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │  Cassette File Exists?  │
            └────────────────────────┘
            │            │
         NO │            │ YES
            │            │
            ▼            ▼
    ┌──────────┐  ┌──────────┐
    │ RECORD   │  │  REPLAY  │
    │  MODE    │  │   MODE   │
    └──────────┘  └──────────┘
         │            │
         │            │
    ┌────▼────┐  ┌────▼────┐
    │ Intercept│  │ Intercept│
    │ Request │  │ Request │
    └────┬────┘  └────┬────┘
         │            │
    ┌────▼────┐  ┌────▼────┐
    │  Filter │  │  Filter │
    │ Sensitive│  │ Sensitive│
    │   Data  │  │   Data  │
    └────┬────┘  └────┬────┘
         │            │
    ┌────▼────┐  ┌────▼────┐
    │ Send to │  │  Match  │
    │ Real API│  │ Against │
    │         │  │ Cassette│
    └────┬────┘  └────┬────┘
         │            │
    ┌────▼────┐  ┌────▼────┐
    │ Receive │  │ Return  │
    │ Response│  │ Recorded│
    │         │  │ Response│
    └────┬────┘  └────┬────┘
         │            │
    ┌────▼────┐  ┌────▼────┐
    │  Filter │  │ Unfilter│
    │ Response│  │ Response│
    └────┬────┘  └────┬────┘
         │            │
    ┌────▼────┐  ┌────▼────┐
    │  Save   │  │ Return  │
    │ Cassette│  │ to Test │
    └─────────┘  └─────────┘
```

## Important Takeaways

1. **VCR records HTTP interactions** so tests don't need real network calls
2. **Filtering happens before matching** - sensitive data is replaced with placeholders
3. **Matching is configurable** - by default it matches on method + URI
4. **Credentials are needed** - even for dummy values, to build valid request structures
5. **The cassette is a snapshot** - it contains the exact request/response from when it was recorded

