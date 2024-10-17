const express = require('express');
const multer = require('multer');
const { Event } = require('./models');

const app = express();
app.use(express.json());

// Configure Multer for file upload
const upload = multer({ 
    dest: 'uploads/', // specify the directory to store uploaded files
    fileFilter: (req, file, cb) => {
        // Allow only PNG files
        if (file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG files are allowed!'), false);
        }
    }
});

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
});

// Create a new event
app.post('/api/events', upload.single('image'), async (req, res) => {
    try {
        const { eventName, eventDate, eventLocation, ticketPrices, eventDetails, category, participants } = req.body;
        
        const event = await Event.create({
            eventName,
            eventDate,
            venue: eventLocation,
            ticketPrices: JSON.stringify(JSON.parse(ticketPrices)), // Parse stringified JSON from the frontend
            description: eventDetails,
            image: req.file.path, // Store the file path of the uploaded image
            category,
            numParticipants: participants
        });

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});

// Update an event
app.put('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Event.update(req.body, { where: { id } });
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Event.destroy({ where: { id } });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
