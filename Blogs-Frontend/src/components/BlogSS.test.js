import React from 'react'
import Blog from './Blog'
import renderer from 'react-test-renderer'


// Snapshot test
describe('<Blog />', () => {

  it('Renders correctly', () => {
    const blog = renderer
      .create(<Blog />)
      .toJSON()

    expect(blog).toMatchSnapshot()
  })
})