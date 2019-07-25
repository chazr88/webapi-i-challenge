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
            res.status(500).json({ success: false, err });
        });
});

server.get("/api/users/:id", (req, res) => {
    db.find()
        .then(bio => {
            res.status(200).json(bio.user);
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.post("/api/users/", (req, res) => {
    const bioInfo = req.body;
    console.log(bioInfo);

    db.add(bioInfo)
        .then(bio => {
            res.status(201).json({ success: true, bio });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
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
                    message: "I cannot find the hub you are looking for."
                });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});
