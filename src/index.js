const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const inboxRoutes = require('./routes/inbox');
const outboxRoutes = require('./routes/outbox');
const composeRoutes = require('./routes/compose');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));



// routes
app.use('/', authRoutes);
app.use('/inbox', inboxRoutes);
app.use('/outbox', outboxRoutes);
app.use('/compose', composeRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// module.exports = connection;