class HomeController < ApplicationController

  before_filter :authenticate_user!
  skip_authorization_check



  def index

    @result_json = [{"count" => "100", "status" => "open"}, {"count" => "20", "status" => "closed"}]
    # @agents = User.agents
    #
    # params[:status] ||= 'open'
    #
    # @labels = Ticket.active_labels(params[:status])
    # unless current_user.agent?
    #   @labels = current_user.labels & @labels
    # end
    #
    # @tickets = Ticket.all

    # @tickets = @tickets.by_status(params[:status])
    # .search(params[:q])
    # .by_label_id(params[:label_id])
    # .filter_by_assignee_id(params[:assignee_id])
    # .page(params[:page])
    # .ordered
  end
end
