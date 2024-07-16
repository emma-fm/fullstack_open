const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const testBlog1 = {
    'title': 'Blog1',
    'author': 'Author1',
    'url': 'url1',
    'likes': 10
}

const testBlog2 = {
    'title': 'Blog2',
    'author': 'Author2',
    'url': 'url2',
    'likes': 20
}

const testBlog3 = {
    'title': 'Blog3',
    'author': 'Author2',
    'url': 'url3',
    'likes': 30
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    test('of an empty list', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('of a one element list', () => {
        assert.strictEqual(listHelper.totalLikes([testBlog1]), 10)
    })

    test('of a two elements list', () => {
        assert.strictEqual(listHelper.totalLikes([testBlog1, testBlog2]), 30)
    })
})

describe('favoriteBlog', () => {
    test('of an empty list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
    })

    test('of a one element list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([testBlog1]), testBlog1)
    })

    test('of a two elements list', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([testBlog1, testBlog2]), testBlog2)
    })
})

describe('mostBlogs', () => {
    test('of an empty list', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), {})
    })

    test('of a one author list', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([testBlog1]), {
            'author': testBlog1.author,
            'blogs': 1
        })
    })

    test('of a two authors list', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([testBlog1, testBlog2, testBlog3]), {
            'author': testBlog2.author,
            'blogs': 2
        })
    })

})