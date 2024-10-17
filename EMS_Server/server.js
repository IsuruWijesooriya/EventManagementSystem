const express = require('express');
const { Event } = require('./models');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Serve images from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// Get all events with adjusted image paths
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    // Convert Sequelize instances to plain objects
    const plainEvents = events.map(event => event.get({ plain: true }));
    console.log('Plain Events from DB:', plainEvents); // Log to check data format
    res.status(200).json(plainEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Add Event Route with Image Upload
app.post('/api/events', upload.single('image'), async (req, res) => {
  try {
    const { name, description, eventtimestamp, venue, category, noparticipants } = req.body;
    const image = req.file ? req.file.path : null;

    const newEvent = await Event.create({
      name,
      description,
      eventtimestamp: new Date(eventtimestamp),
      venue,
      image,
      category,
      noparticipants: parseInt(noparticipants)
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Update an event
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Event.update(req.body, { where: { id } });
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Event.destroy({ where: { id } });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
