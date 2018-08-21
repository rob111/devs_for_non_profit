# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

client1 = Client.create!(
  email: 'cindy@sa.com',
  username: 'CindyCrawford',
  full_name: 'Cindy Crawford',
  company: 'Salvation Army',
  password: '000000',
  isadmin: false,
  profile_photo: 'cindy_cr_photo.jpg',
  avatar_url: '',
  uid: '',
  provider: '',
  oauth_token: '')

client2 = Client.create!(
  email: 'liz@puppy-connection.com',
  username: 'LizKebab',
  full_name: 'Liza Kebab',
  company: 'Puppy Connection',
  password: '000000',
  isadmin: false,
  profile_photo: 'liz_kedab.jpg',
  avatar_url: '',
  uid: '',
  provider: '',
  oauth_token: '')

clientInfo1 = ClientInfo.create!(
  client: client1,
  company_size: '100+',
  description: 'Helping people in needs to save money on second hand goods and others services.',
  rep_position: 'Project Manager')

clientInfo2 = ClientInfo.create!(
  client: client2,
  company_size: '15',
  description: 'Helping abandoned animals to find new owners.', 
  rep_position: 'Owner')
