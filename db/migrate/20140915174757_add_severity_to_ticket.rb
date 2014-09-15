class AddSeverityToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :severity, :string
    add_column :tickets, :phase, :string
  end
end
