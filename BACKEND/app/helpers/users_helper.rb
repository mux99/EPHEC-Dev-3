module UsersHelper
    ERR_USER_EXIST = 'Error: this user already exists'
    ERR_USER_NOT_EXIST = 'Error: this user does not exist'
    TAG_LENGTH = 4
    def generate_usertag
        charset = Array('0'..'9')
        Array.new(TAG_LENGTH) { charset.sample(random: SecureRandom) }.join
    end
end