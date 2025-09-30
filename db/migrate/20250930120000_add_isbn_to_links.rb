# frozen_string_literal: true

class AddIsbnToLinks < ActiveRecord::Migration[7.1]
  def change
    add_column :links, :isbn, :string, limit: 20
  end
end
