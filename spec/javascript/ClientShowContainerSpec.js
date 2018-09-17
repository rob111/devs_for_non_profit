import ClientShowContainer from '../../app/javascript/containers/ClientShowContainer'
import { mount } from 'enzyme'
import React from 'react'
import fetchMock from 'fetch-mock'

describe('DeveloperShowContainerSpec', () => {
  let wrapper;
  let client;
  let projects;
  let client_info;
  let current_user;

  beforeEach(() => {
    client = {
      id: 1,
      username: 'client1',
      full_name: "Betsy Dawson",
      company: "CutePuppies",
      email: "client@gmail.com",
      profile_photo: {url: 'https://d36gb93zszu20a.cloudfront.net/i/br/fma2.jpg'}
    },
    projects = [
      {
        id: 1,
        description: "Create website with Rails",
        status: "Active",
        deadline: "2018-10-01",
        price: "500",
        client_id: 1
      }
    ],
    client_info = {
        id: 1,
        client_id: 6,
        company_size: "25",
        description: "small non-profit organization",
        rep_position: "Manager"
    },
    current_user = {
      username: 'client1',
      id: 1
    }

    fetchMock.get(`/api/v1/clients/${client.id}`, {
      credentials: 'same-origin',
      status: 200,
      body: { client: client, projects: projects, client_info: client_info, current_user: current_user }
    })
    wrapper = mount(<ClientShowContainer params={{id: client.id}} />)
  });

  afterEach(fetchMock.restore)

  describe('show page', () => {
    it('renders expected page formatting', () => {
        expect(wrapper.find('h2')).toBePresent()
    })

    it('renders expected developer and associated projects returned from api call', (done) => {
      setTimeout(() => {
        expect(wrapper.find('h2').first().text()).toEqual(client.full_name)
        expect(wrapper.find('.company-name').text()).toEqual(`Company: ${client.company}`)
        expect(wrapper.find('.email').text()).toEqual(`Email: ${client.email}`)
        expect(wrapper.find('h2').last().text()).toEqual('Client Projects')
        expect(wrapper.find('#project-description').text()).toEqual(`Description: ${projects[0].description}`)
        expect(wrapper.find('#project-status').text()).toEqual(`Status: ${projects[0].status}`)

        done()
      }, 0)
    })
  })

})
