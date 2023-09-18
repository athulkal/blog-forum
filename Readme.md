# Blog-Forum

## Motivation

The motivation for this project came from the blogging website [Medium.com](https://medium.com). This project tries to mimic most of the features of the website and this is done purely just as a personal project for learning. This project is still in development and changes are going to be made on a regular basis.

### Tech used

**Node.js** - The backend is written using node with the express framework
**PostgreSql** - I'm using Postgres as the database I'm using the sequelize ORM.
**React** - The frontend is completely written using React and it's ecosystem with libraries like Redux,React-Router
**CSS** - For css I'm using tailwindCss.

### Details

I have a node server running on 3000 and a react project running on 3001.

I'm using session authentication using the express-session middleware and caching the loggedIn user to session store using redis.

You can take a look at the database schema in the server/models

```
├── Readme.md
└── server
    ├── app.js
    ├── config
    │   └── config.json
    ├── index.js
    ├── models
    │   ├── Blog.js
    │   ├── Comment.js
    │   ├── Follower.js
    │   ├── Following.js
    │   ├── Profile.js
    │   ├── ReadingList.js
    │   ├── Tags.js
    │   ├── TagsBlogs.js
    │   ├── TagsUsers.js
    │   ├── User.js
    │   └── index.js
    ├── package-lock.json
    └── package.json

```

Tests are written using jest library and using supertest for testing Api. All of the tests are not done at the moment as the project is still development.
