var router = require('express').Router();
const jwt = require('jsonwebtoken');

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// login user
router.post('/login', (req, res) => {
    
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
            const token = jwt.sign({credential},process.env.JWT_SECRET_KEY,{ expiresIn: '1h' },(err, token) =>{
                if (err) {
                console.log("token tidak berhasil di buat");
                }
                //res.json({token});
                console.log(req.session.user);
                res.redirect('/mahasiswa');
            });
    } else {
        res.end("Invalid Username")
    }
});

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error")
        } else {
            res.render('login', { title: "Express", logout: "logout Successfully...!" })
        }
    })
})

module.exports = router;