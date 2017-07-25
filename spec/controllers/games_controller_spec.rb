require 'rails_helper'
require 'factory_girl'
require 'byebug'

describe GamesController do
  let (:genghis) { create(:user) }
  let (:attila) { create(:user) }

  describe '#create' do
    it 'is able to create games' do
      post :create, params: { game: { creator_id: genghis.id } }, format: 'application/json'

      expect(response.status).to eq(200)
    end
  end

  describe '#show' do
    it 'responds with the relevant game data' do
      game = Game.create({ creator_id: genghis.id, status: 'in progress' })
      game.challenger = attila
      game.save

      get :show, params: { id: game.id }, format: 'application/json'
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
    end
  end

  describe '#update' do
    it 'responds with the updated version of the game' do
      game = Game.create({ creator_id: genghis.id, status: 'seeking' })

      post :update,
        method: :put,
        params: { id: game.id,
          game: {
            p2_id: attila.id,
            status: 'in progress'
            }
          },
        format: 'application/json'

      expect(response.status).to eq(200)
      expect(response.content_type).to eq 'application/json'
    end

    it 'will not update an abandoned game' do
      game = Game.create({ creator_id: genghis.id, status: 'abandoned' })

      post :update,
        method: :put,
        params: { id: game.id,
          game: {
            p2_id: attila.id,
            status: 'in progress'
            }
          },
        format: 'application/json'

        expect(response.status).to eq(422)
    end

    it 'will not update a finished  game' do
      game = Game.create({ creator_id: genghis.id, status: 'finished' })

      post :update,
        method: :put,
        params: { id: game.id,
          game: {
            p2_id: attila.id,
            status: 'in progress'
            }
          },
        format: 'application/json'

        expect(response.status).to eq(422)
    end
  end

  describe '#index' do
    let(:games_list) { create_list(:game, 5, status: 'seeking') }
    let(:sad_game) { create(:game, status: 'abandoned' )}
    it 'responds 200 with active games' do
      get :index, format: 'application/json'

      expect(response.status).to eq(200)
      expect(response.content_type).to eq 'application/json'
    end
  end

  describe '#destroy' do
    it 'game is updated to abandoned instead of destroyed' do
      game = Game.create({ creator_id: genghis.id, p1_id: genghis.id })

      post :destroy,
        method: :delete,
        params: { id: game.id },
        format: 'application/json'

      expect(response.status).to eq(200)
      expect(response.content_type).to eq 'application/json'
    end
  end
end
