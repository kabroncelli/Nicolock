import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import App from '../App'
import Panel from '../components/Panel'
import TextField from '../components/TextField'
import Modal from '../components/Modal'

configure({ adapter: new Adapter() })

describe('Find contractor components render correctly', () => {
  it('Modal renders correctly', () => {
    const dismiss = jest.fn()
    const title = 'Title!'
    const message = 'Message!'
    const wrapper = shallow(
      <Modal
        dismiss={dismiss}
        title={title}
        message={message} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Panel renders correctly', () => {
    const wrapper = shallow(
      <Panel
        id={1}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('TextField renders correctly', () => {
    const fn = jest.fn()
    const wrapper = shallow(
      <TextField
        label='Test'
        valueEntered={fn}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('App renders correctly', () => {
    const wrapper = shallow(
      <App
        resourceUrl='http://nicolock.com'
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
