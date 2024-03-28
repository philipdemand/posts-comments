class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.belongs_to :post
      t.belongs_to :user
      t.text :comment_body
      t.integer :likes, :default => 0
      t.timestamps
    end
  end
end
