module UsersHelper
    TAG_LENGTH = 4
    def generate_usertag
        charset = Array('0'..'9')
        Array.new(TAG_LENGTH) { charset.sample(random: SecureRandom) }.join
    end
end