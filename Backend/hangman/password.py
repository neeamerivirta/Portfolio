import bcrypt

# the password
password = 'kukkakaali'

# converting password to array of bytes
bytes = password.encode('utf-8')

# generating the salt
salt = bcrypt.gensalt()

# hashing the password
hash = bcrypt.hashpw(bytes, salt)

print(hash)