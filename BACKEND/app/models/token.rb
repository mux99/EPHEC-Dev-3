class Token < ApplicationRecord
    has_one :user

    def update_ttl
        tokens = Token.all
        tokens.each do |t|
            new_ttl = t.ttl - 1
            if new_ttl == 0
                t.destroy
            end
            t.update(ttl: new_ttl)
        end
    end

    validates :token, presence: true
    validates :user_id, presence: true
end