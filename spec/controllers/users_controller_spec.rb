require 'rails_helper'
require 'factory_girl'
require 'byebug'

describe UsersController do
  describe 'POST create' do
    it 'permits only name and password params' do
      post :create, params: { user: { name: 'salman', password: 'rushdie'} }

      expect(response.body).to include('salman')
    end

    it 'expects name instead of username param' do
      post :create, params: { user: { username: 'tonks', password: 'mdonks'} }

      expect(response.status).to eq(403)
    end
  end
end
