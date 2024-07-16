const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

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
        assert.strictEqual(listHelper.totalLikes([
            {
                'title': 'Blog1',
                'author': 'Author1',
                'url': 'url1',
                'likes': 10
            }
        ]), 10)
    })

    test('of a two elements list', () => {
        assert.strictEqual(listHelper.totalLikes([
            {
                'title': 'Blog1',
                'author': 'Author1',
                'url': 'url1',
                'likes': 10
            },
            {
                'title': 'Blog2',
                'author': 'Author2',
                'url': 'url2',
                'likes': 20
            }
        ]), 30)
    })
})