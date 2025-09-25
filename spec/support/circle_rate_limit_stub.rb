# frozen_string_literal: true

RSpec.configure do |config|
  config.around(:each) do |example|
    RSpec::Mocks.with_temporary_scope do
      allow_any_instance_of(CircleApi).to receive(:rate_limited_call).and_wrap_original do |_, &blk|
        blk.call
      end
      example.run
    end
  end
end
