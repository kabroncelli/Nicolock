import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import Dropdown from '../Dropdown'

configure({ adapter: new Adapter() })

describe('Components render correctly', () => {
  it('Dropdown renders correctly', () => {
    const valueEntered = jest.fn()
    const wrapper = shallow(
      <Dropdown
        options={[1, 2, 3]}
        label='dropdown test'
        valueEntered={valueEntered} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
