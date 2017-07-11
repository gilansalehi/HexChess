namespace :hex_chess_tasks do
  task :flag_abandoned_games => :environment do
    puts "flagging abandoned games..."
    abandoned_games = Game.where("updated_at >= ? AND status = ?", 1.day.ago, "in progress")

    puts "cleaning up abandoned games..."
    abandoned_games.each do |game|
      game.status = "abandoned"
    end

    puts "done"
  end

  task :flag_abandoned_seeks => :environment do
    puts "flagging abandoned seeks..."
    abandoned_seeks = Game.where("updated_at >= ? AND p2_id = ?", 1.day.ago, nil)

    puts "cleaning up abandoned seeks..."
    abandoned_seeks.each do |seek|
      game.status = "abandoned"
    end

    puts "done"
  end
end
