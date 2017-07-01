json.array @games do |game|
  json.id       game.id
  json.creator  game.creator.try(:name)
  json.players  game.users
  json.position game.position
  json.status   game.status
end
