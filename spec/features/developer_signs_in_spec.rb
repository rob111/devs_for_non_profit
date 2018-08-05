require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do
    developer = Developer.create!(email: 'john@developer.com', username: 'test', full_name: 'John John', password: '111111')

    visit new_developer_session_path

    fill_in 'Email', with: developer.email
    fill_in 'Password', with: developer.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully.')
    expect(page).to have_content('Log out')
  end

  scenario 'specify invalid credentials' do
    visit new_developer_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Log out')
  end
end
