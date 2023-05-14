# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
include UsersHelper
User.create(name: 'Laure Emipsum', email:'l.emipsum@seriousbusiness.com', password: 'motdepasse', tag: generate_usertag)
Project.create(name: 'Morrowind', description: 'Timelines of the story of The Elder Scrolls III: Morrowind', owner: '85d8316a-931d-48b4-8a93-fda8245c4009', visibility: true)
Project.create(name: 'WW2', description: 'Mockup for a WW2 timeline', owner: 'de3a4360-609e-421a-8033-773ff7199e3b', visibility: true)