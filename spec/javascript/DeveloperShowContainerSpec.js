import DeveloperShowContainer from '../../app/javascript/containers/DeveloperShowContainer'
import { mount } from 'enzyme'
import React from 'react'
import fetchMock from 'fetch-mock'

describe('DeveloperShowContainerSpec', () => {
  let wrapper;
  let developer;
  let projects;
  let clients;
  let info;

  beforeEach(() => {
    developer = {
      id: 1,
      full_name: 'John Doe',
      username: 'jdoe',
      email: 'jdoe@test.com',
      company: 'Google',
      profile_photo: null
    },
    projects = [
      {
        id: 1,
        description: 'Create website',
        status: 'Active',
        deadline: '2018-10-10',
        price: '100',
        client_id: 1
      }
    ],
    clients = [
      {
        id: 1,
        email: "client@gmail.com",
        username: "client123",
        full_name: "Mary Johns",
        company: "Salvation Army",
        isadmin: false,
        profile_photo: null
      }
    ],
    info = {
      id: 1,
      developer_id: 1,
      years_of_experience: 2,
      preferred_technologies: 'Ruby on Rails',
      base_hourly_rate: '50'

    }

    fetchMock.get(`/api/v1/developers/${developer.id}`, {
      credentials: 'same-origin',
      status: 200,
      body: {developer: developer, projects: projects, clients: clients, info: info }
    })
    wrapper = mount(<DeveloperShowContainer params={{id: developer.id}} />)
  });

  afterEach(fetchMock.restore)

  describe('show page', () => {
    it('renders expected page formatting', () => {
        expect(wrapper.find('h2')).toBePresent()
    })

    it('renders expected developer and associated projects returned from api call', (done) => {
      setTimeout(() => {
        expect(wrapper.find('h2').first().text()).toEqual(developer.full_name)
        expect(wrapper.find('#company').text()).toEqual(`Company: ${developer.company}`)
        expect(wrapper.find('#email').text()).toEqual(`Email: ${developer.email}`)
        expect(wrapper.find('h2').last().text()).toEqual('Developer Projects')
        expect(wrapper.find('#project-company').text()).toEqual(`Company: ${clients[0].company}`)
        expect(wrapper.find('#project-description').text()).toEqual(`Description: ${projects[0].description}`)

        done()
      }, 0)
    })
  })

})
