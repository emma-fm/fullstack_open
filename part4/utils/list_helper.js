const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 
        0 : 
        blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ?
        {} :
        blogs.reduce((curr, item) => item.likes > curr.likes ? item : curr, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authorCounts = _.countBy(blogs, 'author')
    const bestAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author])

    return {
        'author': bestAuthor,
        'blogs': authorCounts[bestAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const blogsByAuthor = _.groupBy(blogs, 'author')
    const likesByAuthor = _.map(blogsByAuthor, (authorBlogs, author) => ({
        author: author,
        likes: _.sumBy(authorBlogs, 'likes')
    }))
    const bestAuthor = _.maxBy(likesByAuthor, 'likes')

    return bestAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}