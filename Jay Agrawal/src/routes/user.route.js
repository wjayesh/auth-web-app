const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticationLogin = require('../middlewares/checkAuth.middleware.js');

const Users = require('../models/user.js');

private_key = "" + process.env.PRIVATE_KEY;

router.post("/register", (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.name || !req.body.college || !req.body['year-of-graduation']) {
        res.status(400);
        res.send("Invalid details!");
    } else {
        let found = false;
        Users.filter(function (user) {
            if (user.username === req.body.username) {
                res.status("400");
                res.send("User Already Exists");
                found = true;
            }
        });
        if(!found) {
            var newUser = { username: req.body.username, password: req.body.password, name: req.body.name, college: req.body.college, "year-of-graduation": req.body['year-of-graduation'] };
            Users.push(newUser);

            res.status(200);
            res.send("Successfully registered!");
        }
    }    
});

router.get("/profiles", (req, res, next) => {
    const usersDataCopy = JSON.parse(JSON.stringify(Users));
    for(let i = 0; i < usersDataCopy.length; i++) {
        delete usersDataCopy['password'];
    }
    res.status(200);
    res.json(usersDataCopy);
});

router.post("/login", function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.send("Incorrect Credentials!");
    } else {
        let found = false;
        Users.filter(function (user) {
            if (user.username === req.body.username && user.password == req.body.password) {
                found = true;
            }
        }); 
        if (found) {
            const payload = {
                "username" : req.body.username
            };
            const token = jwt.sign(payload, private_key, { expiresIn: '1hr' });
            res.setHeader('auth-token', token);
            res.status(200);
            res.send("Logged in Successfully");
        } else {
            res.status(400);
            res.send("Incorrect Username or Password");
        }
    }
});

router.put("/profile", authenticationLogin, (req, res, next) => {
    const username = req.userInfo.username;

    if (!req.body.name || !req.body.college || !req.body['year-of-graduation']) {
        res.status(400);
        res.send("Invalid details!");

    } else {
        let isValid = false;
        let requestedUserIndexInGlobalArray = -1;

        for (let i = 0; i < Users.length; i++) {
            const currentUser = Users[i];
            if (currentUser.username == username) {
                isValid = true;
                requestedUserIndexInGlobalArray = i;
                break;
            }
        }

        if (!isValid) {
            res.status(401).json({ message: "Invalid username or password!" });
        } else {
            // update the user's details corresponding to the found user
            Users[requestedUserIndexInGlobalArray].name = req.body.name;
            Users[requestedUserIndexInGlobalArray].college = req.body.college;
            Users[requestedUserIndexInGlobalArray]['year-of-graduation'] = req.body['year-of-graduation'];
        }
        res.status(200);
        res.send("Updated Successfully!");
    }
    next();
});

module.exports = router;
