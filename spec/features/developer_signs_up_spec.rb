require 'rails_helper'

feature 'user registers', %Q{
  As a visitor
  I want to register
  So that I can create an account
} do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * If I don't specify the required information, I am presented with
  #   an error message

  scenario 'provide valid registration information' do
    visit new_developer_registration_path

    expect(page).to have_content("Sign up as a Developer")

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Username', with: 'user1'
    fill_in 'Company', with: 'TestInc'
    fill_in 'Full name', with: 'Test Test'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'

    click_button 'Sign up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Log out')
  end

  scenario 'provide invalid registration information' do
    visit new_developer_registration_path

    click_button 'Sign up'
    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Log out')
  end
end
