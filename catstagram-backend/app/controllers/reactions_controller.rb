class ReactionsController < ApplicationController

  def index
    reactions = Reaction.all
    render json: reactions.to_json(
      :except => [:updated_at, :created_at])
  end

  def show
    reaction = Reaction.find_by(id: params[:id])
    if reaction
      render json: reaction.to_json(
        :except => [:updated_at, :created_at])
    else
      render json: {message: "you messed up" }
    end
  end

  def create
    reaction = Reaction.create(reaction_params)
    render json: reaction
  end


  def destroy
    reaction = Reaction.find_by(id: params[:id])
    reaction.destroy
    render json: {message: "Successfully destroyed!! X_X" }
  end

  private

  def reaction_params
    params.permit(:cat_id, :location_id, :emoji)
  end

end
