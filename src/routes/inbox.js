const express = require("express");
const connection = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.loggedin) {
        connection.query("SELECT * FROM emails where receiver_name =  (select username from users where username = ?)",
            [req.session.username],
            (err, results) => {
                if (err) throw err;
                else {
                    return res.status(200).render('inbox', { emails: results })
                }
            })
    } else {
        return res.redirect('/');
    }
})

module.exports = router;