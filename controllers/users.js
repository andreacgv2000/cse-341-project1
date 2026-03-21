const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tags = ['Users'];
    const result = await mongodb.getDatabase().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //swagger.tags = ['Users'];
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createUser = async (req, res) => {
    //swagger.tags = ['Users'];
    const user = {
        firstName: req.body.firstName,
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb
        .getDatabase() // ✅ quitamos .db()
        .collection('contacts') // ✅ corregido a 'contacts'
        .insertOne(user);

    if (response.acknowledged) { // ✅ corregido
        res.status(201).json(response); // mejor práctica
    } else {
        res.status(500).json(response.error || 'Error creating user');
    }
};

const updateUser = async (req, res) => {
    //swagger.tags = ['Users'];
    try {
        const userId = new ObjectId(req.params.id);

        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            ipaddress: req.body.ipaddress
        };

        const response = await mongodb
            .getDatabase()
            .collection('contacts') // ✅ corregido a 'contacts'
            .updateOne({ _id: userId }, { $set: user });

        console.log("UPDATE RESPONSE:", response); // 👈 AGREGA ESTO

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json("User not found or no changes made");
        }

    } catch (error) {
        console.error("🔥 ERROR REAL:", error); // 👈 ESTO ES CLAVE
        res.status(500).json(error.message); // 👈 MUESTRA EL ERROR REAL
    }
};

const deleteUser = async (req, res) => {
    //swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
        .getDatabase()
        .collection('contacts') // ✅ corregido a 'contacts'
        .deleteOne({ _id: userId }); // ✅ corregido

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json('Error deleting user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};

