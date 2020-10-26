# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Business.destroy_all
User.destroy_all
Visit.destroy_all

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
    name: "Wick",
    phone: "7138185446",
    email: "wickbushong@gmail.com"
)

User.create(
    name: "Margaret",
    phone: "7138262161",
    email: "long.mkat@gmail.com"
)

User.create(
    name: "Matt",
    phone: "1234567890",
    email: "matt@logan.com"
)

User.create(
    name: "Robby",
    phone: "9876543210",
    email: "robby@cowan.com"
)

Visit.create(
    user_id: 1,
    business_id: 1,
    time_in: Time.now,
    party_size: 2
)

Visit.create(
    user_id: 4,
    business_id: 1,
    time_in: Time.now,
    party_size: 2
)

Visit.create(
    user_id: 3,
    business_id: 1,
    time_in: Time.now - 3600,
    time_out: Time.now - 1800,
    party_size: 3
)

Visit.create(
    user_id: 2,
    business_id: 1,
    time_in: Time.now - 2400,
    time_out: Time.now - 1200,
    party_size: 5
)




