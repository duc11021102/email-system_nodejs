const express = require("express");
const connection = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const user = req.session.username;
    console.log(user);
    if (req.session.loggedin) {
        return res.render('compose', { user: user });
    } else {
        res.render('signin', { errorMessage: null })
    }

})

router.post('/', (req, res) => {
    const date = new Date().toJSON();
    const sender_name = req.session.username;
    const receive_email = req.body.receiver_name;
    const { subject, body } = req.body;
    if (sender_name, receive_email, subject, body, date) {
        connection.query('INSERT INTO emails (sender_name, receiver_name, subject, body, timestamp) VALUES (?, (SELECT username FROM users WHERE email = ?),?,?,?)',
            [sender_name, receive_email, subject, body, date],
            (err, results) => {
                if (err) throw err;
                return res.redirect('/outbox');
            })
    } else {
        res.end()
    }
    // console.log(sender_name, receive_name, subject, body, date);
    // res.redirect('outbox')
})

module.exports = router;