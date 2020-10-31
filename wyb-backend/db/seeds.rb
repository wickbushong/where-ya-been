# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Visit.destroy_all
Business.destroy_all
User.destroy_all

Business.create(
    name: "Brown's Diner",
    phone: "6151234567",
    email: "bud@browns.com",
    location: "corner of 21st and Blair"
)

Business.create(
    name: "PM",
    phone: "6159482804",
    email: "asian@nashville.com",
    location: "Belmont Dr"
)

User.create(
    first_name: "Wick",
    last_name: "Bushong",
    phone: "7138185446",
    email: "wickbushong@gmail.com"
)

User.create(
    first_name: "Margaret",
    last_name: "Long",
    phone: "7138262161",
    email: "long.mkat@gmail.com"
)

User.create(
    first_name: "Matt",
    last_name: "Logan",
    phone: "1234567890",
    email: "matt@logan.com"
)

User.create(
    first_name: "Robby",
    last_name: "Cowan",
    phone: "9876543210",
    email: "robby@cowan.com"
)

User.create(
    first_name: "Haley",
    last_name: "Lyerly",
    phone: "1111111111",
    email: "haley@lyerly.com"
)

seconds = [86400, 172800, 259200, 345600, 432000, 518400, 604800, 691200, 777600, 864000, 950400, 1036800, 1123200, 
1209600, 129600, 1382400]
past16days = seconds.map do |s|
    Time.now - s
end

past16days.each do |d|
    Visit.create(
        user_id: 1,
        business_id: 1,
        time_in: d,
        time_out: d + 3600,
        party_size: 2
    )
end

# Visit.create(
#     user_id: 1,
#     business_id: 1,
#     time_in: Time.now - 20000,
#     time_out: Time.now - 19500,
#     party_size: 2
# )

Visit.create(
    user_id: 4,
    business_id: 1,
    time_in: Time.now - 86400,
    time_out: Time.now - 85400,
    party_size: 2
)

Visit.create(
    user_id: 3,
    business_id: 1,
    time_in: Time.now - 88000,
    time_out: Time.now - 86000,
    party_size: 3
)

Visit.create(
    user_id: 2,
    business_id: 1,
    time_in: Time.now - 2400,
    time_out: Time.now - 1200,
    party_size: 5
)

Visit.create(
    user_id: 2,
    business_id: 1,
    time_in: Time.now - 346000,
    time_out: Time.now - 345000,
    party_size: 5
)

Visit.create(
    user_id: 3,
    business_id: 1,
    time_in: Time.now - 346000,
    time_out: Time.now - 345000,
    party_size: 5
)

Visit.create(
    user_id: 2,
    business_id: 1,
    time_in: Time.now,
    party_size: 5
)

Visit.create(
    user_id: 5,
    business_id: 1,
    time_in: Time.now - 10000,
    time_out: Time.now - 9500,
    party_size: 5
)



