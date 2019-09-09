class CatsController < ApplicationController
  
  def index
    cats = Cat.all
    render json: cats.to_json(
      :except => [:updated_at, :created_at])
  end

end
