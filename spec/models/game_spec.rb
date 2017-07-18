# require 'rspec'
require 'rails_helper'
require 'factory_girl'
require 'byebug'

describe Game do
  let(:player_1) { create(:user) }
  let(:player_2) { create(:user) }

  describe '#valid?' do
    it 'it has a creator' do
      game_1 = Game.create({ creator: player_1 })
      game_2 = Game.create({ creator: nil })

      expect(game_1.valid?).to be(true)
      expect(game_2.valid?).to be(false)
    end

    it 'is updateable' do
      game_1 = Game.create({ creator: player_1, status: 'abandoned' })
      game_2 = Game.create({ creator: player_2, status: 'seeking' })

      expect(game_1.updateable).to be(false)
      expect(game_2.updateable).to be(true)
    end
  end

  describe 'class methods' do
    let(:game) { build(:game, creator: player_1, challenger: player_2 )}

    it '#challenger' do
      expect(game.challenger).to eq(player_2)
    end
  end

  describe 'updateable fields:' do
    let(:game) { build(:game, creator: player_1) }

    it 'game creator cannot be overwritten' do
      expect(game.creator).to eq(player_1)

      game.creator = player_2
      expect(game.creator).to eq(player_1)
    end

    it 'p1_id cannot be overwritten' do
      # p1_id not set to creator id by default on model
      expect(game.p1_id).to be(nil)

      # can set p1_id if it hasn't yet been set
      game.p1_id = player_1.id
      expect(game.p1_id).to be(player_1.id)

      # but once set, it cannot be changed
      game.p1_id = player_2.id
      expect(game.p1_id).to eq(player_1.id)
    end

    it 'p2_id cannot be overwritten' do
      expect(game.p2_id).to be(nil)

      # can set p2_id if it hasn't yet been set
      game.p2_id = player_2.id
      expect(game.p2_id).to be(player_2.id)

      # but once set, it cannot be changed
      game.p2_id = player_1.id
      expect(game.p2_id).to eq(player_2.id)
    end

    it 'status cannot be updated once game is abandoned' do
      game.status = 'in progress'
      expect(game.status).to eq('in progress')

      game.status = 'abandoned'
      expect(game.status).to eq('abandoned')

      # cannot update an abandoned game
      expect { game.status = 'finished' }.to raise_error(ArgumentError)
      expect(game.status).to eq('abandoned')
    end

    it 'cannot overwrite winner once a winner is declared' do
      expect(game.winner).to be(nil)

      game.winner = 'P1'
      expect(game.winner).to eq('P1')

      game.winner = 'P2' #does nothing now
      expect(game.winner).to eq('P1')
    end
  end
end
