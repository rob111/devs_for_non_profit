require 'rails_helper'

RSpec.describe Api::V1::DevelopersController, type: :controller do
  describe 'GET#index' do
    it 'should return list of available developers' do
      developer1 = Developer.create!(type: 'Developer', email: 'developer1@aol.com', username: 'developer1', full_name: 'John John', password: '000000')
      developer2 = Developer.create!(type: 'Developer', email: 'developer2@aol.com', username: 'developer2', full_name: 'Sam Adams', password: '000000')

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["full_name"]).to eq('John John')
      expect(returned_json[1]["full_name"]).to eq('Sam Adams')
    end
  end

  describe 'GET#show' do
    it 'should return developer JSON with developer info and projects he is wokring on' do
      developer1 = Developer.create!(type: 'Developer', email: 'developer1@aol.com', username: 'developer1', full_name: 'John John', password: '000000')
      client1 = Client.create(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')
      project1 = Project.create!(description: "Upgrade webapp to new React version", status: "Proposed", deadline: Date.new(2020,1,1), price: '500', client_id: client1.id)
      collaboration1 = Collaboration.create!(project_id: project1.id, developer_id: developer1.id)
      devInfo = DeveloperInfo.create!(developer_id: developer1.id, years_of_experience: '5', preferred_technologies: 'Java and Ruby', base_hourly_rate: '54')

      get :show, params: {id: developer1.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json["developer"]["full_name"]).to eq('John John')
      expect(returned_json['projects'][0]['description']).to eq('Upgrade webapp to new React version')
      expect(returned_json['clients'][0]['full_name']).to eq('John John')
      expect(returned_json['info']['preferred_technologies']).to eq('Java and Ruby')
    end
  end
end
