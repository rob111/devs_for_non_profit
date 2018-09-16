require 'rails_helper'

feature 'client sends a message', %Q{
  As a signed in client
  I want to send a message to developer from list of developers
  So that the developer will know what I want
 } do
   scenario 'successfully sent a message' do
     client = Client.create!(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')
     developer = Developer.create!(type: "Developer", email: 'dev@atom.com', username: 'testDeveloper', full_name: 'Samuel Adams', password: '000000')

     visit new_client_session_path

     fill_in 'Email', with: client.email
     fill_in 'Password', with: client.password

     click_button 'Log in'

     click_link 'Find a developer'

     visit developers_path(developer.id)

     visit("/messages/new?receiver_id=#{developer.id}")

     fill_in 'Send a message', with: 'Hello Samuel Adams'

     click_button 'Send Message'

     expect(page).to have_content('Your message sent successfully!')
     expect(page).to have_content('Hello Samuel Adams')

   end

   scenario 'sending a message with empty body' do
     client = Client.create!(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')
     developer = Developer.create!(type: "Developer", email: 'dev@atom.com', username: 'testDeveloper', full_name: 'Samuel Adams', password: '000000')

     visit new_client_session_path

     fill_in 'Email', with: client.email
     fill_in 'Password', with: client.password

     click_button 'Log in'

     click_link 'Find a developer'

     visit developers_path(developer.id)

     visit("/messages/new?receiver_id=#{developer.id}")

     fill_in 'Send a message', with: ''

     click_button 'Send Message'

     expect(page).to have_content('Body can\'t be blank')
     expect(page).to have_content("Chatting with #{developer.full_name}")
   end
 end
