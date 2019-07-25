// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
    db.find()
        .then(bio => {
            res.status(200).json(bio);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: "The users information could not be retrieved."
            });
        });
});

// server.get("/api/users/:id", (req, res) => {
//     const { id } = req.params;
//     const findUserById = user => {
//       return user.id == id;
//     };
//     const foundUser = users.find(findUserById);
//     if (!foundUser) {
//       return sendUserError("The user with the specified ID does not exist.", res);
//     } else {
//       res.json(foundUser);
//     }
//   });

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "The user with the specified ID does not exist."
            });
        });
});

server.post("/api/users/", (req, res) => {
    const bioInfo = req.body;
    const bioName = req.body.name;
    const bio = req.body.bio;
    console.log(bioInfo);

    if (!bioName || !bio) {
        res.status(400).json({
            success: false,
            errorMessage: "Please provide name and bio for the user."
        });
    } else {
        db.insert(bioInfo)
            .then(bio => {
                res.status(201).json({ success: true, bio });
            })
            .catch(err => {
                res.status(500).json({ success: false, err });
            });
    }
});

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    success: false,
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params; 
    const bioInfo = req.body;

    db.update(id, bioInfo)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated });
            } else {
                res.status(404).json({
                    success: false,
                    message: "The user with the specified ID does not exist." 
                });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.listen(4000, () => {
    console.log("server listening on port 4000");
});
