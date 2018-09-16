require 'rails_helper'

RSpec.describe Api::V1::ClientsController, type: :controller do
  describe 'GET#show' do
    it 'should return a client and his info' do
      client = Client.create(type: "Client", email: 'john@example.com', username: 'test', full_name: 'John John', password: '111111')
      project1 = Project.create(description: 'Fix unit test with Rspec', status: 'Proposed', deadline: Date.new(2020,1,1), price: '500', client_id: client.id)
      client_info = ClientInfo.create(client_id: client.id, company_size: '50', description: 'small non-profit company', rep_position: 'Manager')

      get :show, params: {id: client.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 4
      expect(returned_json["client"]["full_name"]).to eq "John John"
      expect(returned_json["projects"][0]["description"]).to eq "Fix unit test with Rspec"
      expect(returned_json["client_info"]["description"]).to eq "small non-profit company"
    end
  end
end
