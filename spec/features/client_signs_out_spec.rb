require 'rails_helper'

feature 'client signs out', %Q{
  As an authenticated user
  I want to sign out
  So that my identity is forgotten about on the machine I'm using
} do
  # Acceptance Criteria
  # * If I'm signed in, I have an option to sign out
  # * When I opt to sign out, I get a confirmation that my identity has been
  #   forgotten on the machine I'm using

  scenario 'authenticated client signs out' do
    client = Client.create!(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')

    visit new_client_session_path

    fill_in 'Email', with: client.email
    fill_in 'Password', with: client.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_link 'Log out'
    expect(page).to have_content('Signed out successfully')
  end

  scenario 'unauthenticated user attempts to sign out' do
    visit '/'
    expect(page).to_not have_content('Log out')
  end
end
