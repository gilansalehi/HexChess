json.id         @game.id
json.creator    @game.creator.try(:name)
json.challenger @game.challenger.try(:name)
json.p1_id      @game.p1_id
json.p2_id      @game.p2_id
json.position   @game.position
json.status     @game.status
json.winner     @game.winner
json.created_at @game.created_at
json.player     !current_user ? 'observer' :
                current_user.id == @game.p1_id ? 'P1' :
                current_user.id == @game.p2_id ? 'P2' :
                'observer'
