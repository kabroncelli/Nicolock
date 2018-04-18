import React from 'react'
import renderer from 'react-test-renderer'
import moxios from 'moxios'
import moment from 'moment'

import App from '../App'
import Calendar from '../components/Calendar'
import CalendarControl from '../components/CalendarControl'
import CalendarDay from '../components/CalendarDay'
import DatePicker from '../components/DatePicker'

describe('Event components render correctly', () => {
  beforeEach(() => {
    moxios.install()
    moxios.stubRequest(
      '/rest/events',
      {
        status: 200,
        response: [
          {
            'id': 1,
            'name': 'September Event',
            'description': 'Some event in september',
            'start_date': '2017-09-26',
            'start_time': '20:35:17',
            'end_date': '2017-09-26',
            'end_time': '20:35:19',
            'timezone': 'US/Mountain',
            'address': '570 N 300 E',
            'city': 'Logan',
            'state': 'UT',
            'postal_code': '84321',
            'register_link': '',
          },
        ],
      }
    )
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('App renders correctly', () => {
    const tree = renderer.create(
      <App date={moment('2017-09-26', 'YYYY-MM-DD')} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Calendar renders correctly', () => {
    const dateChangeFunc = jest.fn()
    const tree = renderer.create(
      <Calendar
        date={moment('2017-09-26', 'YYYY-MM-DD')}
        dateChange={dateChangeFunc} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('CalendarControl renders correctly', () => {
    const backwardFunc = jest.fn()
    const forwardFunc = jest.fn()
    const tree = renderer.create(
      <CalendarControl
        backwardClick={backwardFunc}
        forwardClick={forwardFunc}
        month={'September'} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('CalendarDay renders correctly', () => {
    const tree = renderer.create(
      <CalendarDay
        day={1}
        events={[{id: 1, name: 'Test Event', slug: 'Slug'}]} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('DatePicker renders correctly', () => {
    const dateChangeFunc = jest.fn()
    const tree = renderer.create(
      <DatePicker
        dateChange={dateChangeFunc}
        date={moment('2017-09-26', 'YYYY-MM-DD')} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
