namespace :hex_chess_tasks do
  task :flag_abandoned_games do
    abandoned_games = Game.where("updated_at >= ? AND status = ?", 1.day.ago, "in progress")
    abandoned_games.each do |game|
      game.status = "abandoned"
    end
  end

  task :flag_abandoned_seeks do
    abandoned_seeks = Game.where("updated_at >= ? AND p2_id = ?", 1.day.ago, nil)
    abandoned_seeks.each do |seek|
      game.status = "abandoned"
    end
  end
end
