const express = require('express');
const { Event } = require('./models');

const app = express();
app.use(express.json());

// Get all events
app.get('/api/events', async (req, res) => {
    const events = await Event.findAll();
    res.json(events);
});

// Create a new event
app.post('/api/events', async (req, res) => {
    const event = await Event.create(req.body);
    res.json(event);
});

// Update an event
app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    await Event.update(req.body, { where: { id } });
    res.json({ message: 'Event updated successfully' });
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    await Event.destroy({ where: { id } });
    res.json({ message: 'Event deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
