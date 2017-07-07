json.array!(@games) do |game|
  json.id       game.id
  json.creator  game.creator.try(:name)
  json.challenger game.challenger.try(:name)
  json.p1_id    game.p1_id
  json.p2_id    game.p2_id
  json.players  game.users
  json.position game.position
  json.status   game.status
  json.winner   game.winner
end
