const express = require("express");
const mysql = require('mysql');
const router = express.Router();
// const connection = require('../index.js')
const connection = require('../db');
// var errors;
router.get('/', (req, res) => {
    if (req.session.loggedin === true) {
        res.render('inbox');
    } else {
        res.render('signin', { errorMessage: null });
        // res.render('signin');
    }

});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username, password) {
        connection.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password],
            (err, results) => {
                const errorMessage = { message: 'Incorrect username or password' };
                if (results.length > 0) {
                    console.log(results);
                    req.session.loggedin = true;
                    req.session.username = username;
                    console.log(req.session.username)
                    res.redirect('/inbox');
                } else {
                    res.render('signin', { errorMessage: errorMessage.message });
                }
                res.end();
            }
        );
    } else {
        res.status(422).render('/', { errorMessage: 'Pls enter email and password' });
        res.end();
    }
})
router.get('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    });
    // console.log(req.session);
});





router.get('/signup', (req, res) => {
    return res.render('signup', { errorMessage: null });
})

router.post('/signup', (req, res) => {
    const { username, email, password, repassword } = req.body;
    if (password.length < 6) {
        res.status(401).render('signup', { errorMessage: 'Password must be more than 6 characters' });
        res.end();
    } else if (password !== repassword) {
        res.status(401).render('signup', { errorMessage: 'Confirmation password does not match' });
        res.end();
    }

    if (username, email, password) {
        connection.query('SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email, password],
            (err, results) => {
                if (results.length > 0) {
                    return res.status(409).render('signup', { errorMessage: 'Username or email are already exists ' })
                } else {
                    connection.query('INSERT INTO users (username, email,  password) VALUES (?, ?, ?)',
                        [username, email, password],
                        (err) => {
                            if (err) {
                                res.status(401).render('signup', { errorMessage: err });
                            } else {
                                return res.redirect('/');
                            }
                        })
                }
            })
    }
    else {
        res.status(422).render('signup', { errorMessage: 'Pls enter username, email and password' })
    }
})


module.exports = router;