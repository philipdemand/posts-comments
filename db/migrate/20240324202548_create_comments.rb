class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.belongs_to :post
      t.text :comment_body
      t.timestamps
    end
  end
end
