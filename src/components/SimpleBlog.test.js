import React from 'react'
import SimpleBlog from './SimpleBlog'
import { shallow } from 'enzyme'


describe.skip(<SimpleBlog />, () => {
    it('Renders SimpleBlog', () => {
        const sBlog = {
            title: "This is the test title",
            author: "Test A. Uthor",
            likes: 45
        }

        const blogC = shallow(<SimpleBlog blog={sBlog} />)

        const headerDiv = blogC.find('.headers')
        expect(headerDiv.text()).toContain(sBlog.title)
        expect(headerDiv.text()).toContain(sBlog.author)

        const likesDiv = blogC.find('.likes')
        expect (likesDiv.text()).toContain(sBlog.likes.toString())
    })


    it ('registers clicks of a button', () => {
        const sBlog = {
            title: 'my tes title',
            author: 'Jest icle',
            likes: 3
        }
        const mockHandler = jest.fn()

        const blogC = shallow(<SimpleBlog blog={sBlog} onClick={mockHandler} />)

        const butt = blogC.find('button')
        butt.simulate('click')
        butt.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)



    })

})