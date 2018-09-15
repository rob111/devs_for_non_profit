require 'rails_helper'

feature 'user adds a new project', %Q{
  As a signed in client
  I want to add project
  So that developers start work on project
} do
  scenario 'successfully adding a project' do
    client = Client.create!(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')

    visit new_client_session_path

    fill_in 'Email', with: client.email
    fill_in 'Password', with: client.password

    click_button 'Log in'

    click_link 'Dashboard'

    visit new_client_project_path(client)

    fill_in 'Description', with: 'Create a new project'

    select 'Active', from: 'Status'

    find_by_id('project_deadline_3i').find("option[value='1']").click
    find_by_id('project_deadline_2i').find("option[value='1']").click
    find("option[value='2021']").click

    fill_in 'Price', with: '500'

    click_button 'Add Project'

    expect(page).to have_content('Project added successfully.')

  end

  scenario 'submitting with blank input fields' do
    client = Client.create!(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')

    visit new_client_session_path

    fill_in 'Email', with: client.email
    fill_in 'Password', with: client.password

    click_button 'Log in'

    click_link 'Dashboard'

    visit new_client_project_path(client)

    select 'Active', from: 'Status'

    find_by_id('project_deadline_3i').find("option[value='1']").click
    find_by_id('project_deadline_2i').find("option[value='1']").click
    find("option[value='2021']").click

    click_button 'Add Project'
  
    expect(page).to have_content('Description can\'t be blank, Price can\'t be blank')
  end
end
