import express from 'express';
import Example from '../models/exampleModel.jsx';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const examples = await Example.find();
        res.json(examples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const example = new Example({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const newExample = await example.save();
        res.status(201).json(newExample);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;