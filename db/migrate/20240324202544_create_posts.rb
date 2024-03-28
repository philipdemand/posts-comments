class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.belongs_to :user
      t.text :post_body
      t.integer :likes, :default => 0
      t.timestamps
    end
  end
end
