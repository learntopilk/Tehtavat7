import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from './Blog'

jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe.only('integration tests', () => {
    let app


    describe('not signed in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        it('Blogs are not shown when user not signed in', () => {
            app.update()
            console.log("App initialized")

            expect(app.text()).not.toContain('Author:')
            expect(app.text()).not.toContain('Address:')
            expect(app.text()).not.toContain('Likes:')

            const blogs = app.find('.blogpost')
            expect(blogs.length).toBe(0)
        })
    })

    describe('once logged in:', () => {
        beforeEach(() => {
            const user = {
                username: 'testaaja',
                token: '243234234',
                name: 'Serbia'
            }

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            console.log(window.localStorage.getItem('loggedUser'))

            app = mount(<App />)
        })

        it('A user who has signed in can see a list of blogs', () => {
            app.update()
            console.log("App updated")

            const blogs = app.find('.blogpost')
            expect(blogs.length).toBe(blogService.blogs.length)
        })
    })



})
