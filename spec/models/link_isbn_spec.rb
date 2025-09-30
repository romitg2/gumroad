# frozen_string_literal: true

require "spec_helper"

describe Link, type: :model do
  describe "ISBN normalization and validation" do
    let(:product) { build(:product, native_type: Link::NATIVE_TYPE_DIGITAL) }

    it "normalizes hyphens/spaces and uppercases X for ISBN-10" do
      product.isbn = "0-306-40615-2"
      expect(product).to be_valid
      product.save!
      expect(product.reload.isbn).to eq("0306406152")
    end

    it "accepts a valid ISBN-10" do
      product.isbn = "0306406152" # valid checksum
      expect(product).to be_valid
    end

    it "accepts a valid ISBN-13" do
      product.isbn = "9780306406157" # valid checksum
      expect(product).to be_valid
    end

    it "rejects an invalid ISBN checksum" do
      product.isbn = "1234567890" # invalid checksum
      expect(product).not_to be_valid
      expect(product.errors[:isbn]).to be_present
    end
  end
end
