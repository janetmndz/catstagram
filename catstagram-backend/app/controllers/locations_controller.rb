class LocationsController < ApplicationController

  def index
    locations = Location.all
    render json: locations.to_json(
      :include => {
      :reactions => {:only => [:id, :emoji, :cat_id]},
      },
      :except => [:updated_at, :created_at])
  end

  def show
    location = Location.find_by(id: params[:id])
    if location
      render json: location.to_json(
        :include => {
        :reactions => {:only => [:id, :emoji, :cat_id]},
        },
        :except => [:updated_at, :created_at])
    else
      render json:  {message: "Location not found" }
    end
  end

  def create
    location = Location.create(location_params)
    render json: location.to_json(
      :include => {
        :reactions => {:only => [:id, :emoji, :cat_id]}
      },
      :except => [:updated_at, :created_at])
  end

  def update
    location = Location.find_by(id: params[:id])
    location.update(location_params)
    render json: location
  end

  private

  def location_params
    params.permit(:description, :picture, :cat_id)
  end

end
