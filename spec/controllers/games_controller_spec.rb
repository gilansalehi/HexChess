require 'rails_helper'
require 'factory_girl'
require 'byebug'

describe GamesController do
  describe '#create' do
    let (:sally) { create(:user) }
    let (:harry) { create(:user) }
    let (:headers) { {'ACCEPT' => 'application/json'} }

    it 'is able to create games' do
      post :create, params: { game: { creator_id: sally.id } }, format: 'application/json'

      expect(response.status).to eq(200)
    end
  end

  describe '#show'

  describe '#update'

  describe '#index'

  describe '#destroy'
end
