import React from 'react'
import Blog from './Blog'
import { shallow } from 'enzyme'


describe.skip('<Blog />', () => {

    it('No details shown before first click', () => {
        const blogItem = {
            title: 'FINAL TEST',
            author: 'asdlögkj',
            url: 'ölkj',
            likes: 0,
            user:
                {
                    _id: '5b12c5ddaac018305f64ce4c',
                    username: 'salaatti',
                    name: 'Hertta Herkullinen'
                },
            __v: 0
        }


        const user = {
            _id: '5b12c5ddaac018305f64ce4c',
            username: 'salaatti',
            name: 'Hertta Herkullinen'
        }

        let mockDelete = jest.fn()
        let renderedBlog = shallow(<Blog id='444' handleDelete={mockDelete} user={user} blog={blogItem} />)
        const toggler = renderedBlog.find('.toggleButton')

        const detailedView = renderedBlog.find('.togglableItem')

        expect(detailedView.getElement().props.style).toEqual({ display: 'none' })

    })


    it('Shows details only after button has been clicked', () => {
        const blogItem = {
            title: 'FINAL TEST',
            author: 'asdlögkj',
            url: 'ölkj',
            likes: 0,
            user:
                {
                    _id: '5b12c5ddaac018305f64ce4c',
                    username: 'salaatti',
                    name: 'Hertta Herkullinen'
                },
            __v: 0
        }


        const user = {
            _id: '5b12c5ddaac018305f64ce4c',
            username: 'salaatti',
            name: 'Hertta Herkullinen'
        }

        let mockDelete = jest.fn()
        let renderedBlog = shallow(<Blog id='444' handleDelete={mockDelete} user={user} blog={blogItem} />)
        const toggler = renderedBlog.find('.toggleButton')

        toggler.simulate('click')

        const detailedView = renderedBlog.find('.togglableItem')

        expect(detailedView.text()).toContain(blogItem.likes.toString())
        expect(detailedView.text()).toContain(blogItem.url)

    })
})