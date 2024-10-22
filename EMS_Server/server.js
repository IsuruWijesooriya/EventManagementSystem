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

app.get('/', (req, res) => {
  res.send('Server started successfully');
});

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
app.put('/api/events/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, eventtimestamp, venue, category, noparticipants } = req.body;
 
    // Log incoming data to verify what's being received
    console.log('Incoming Data:', req.body);
    console.log('Uploaded File:', req.file);
 
    const event = await Event.findByPk(id);
    if (!event) {
      console.log('Event not found');
      return res.status(404).json({ error: 'Event not found' });
    }
 
    const updatedEvent = {
      name: name || event.name,
      description: description || event.description,
      eventtimestamp: eventtimestamp ? new Date(eventtimestamp) : event.eventtimestamp,
      venue: venue || event.venue,
      category: category || event.category,
      noparticipants: noparticipants ? parseInt(noparticipants) : event.noparticipants,
      image: req.file ? req.file.path : event.image,  // Only update image if a new one is uploaded
    };
 
    // Log the updated data before updating the database
    console.log('Updated Event Data:', updatedEvent);
 
    // Update the event in the database
    const updateResult = await Event.update(updatedEvent, { where: { id } });
    console.log('Update Result:', updateResult);  // Should log [1] if one row was updated
 
    // Fetch the updated event to ensure it's correctly updated
    const refreshedEvent = await Event.findByPk(id);
    console.log('Refreshed Event:', refreshedEvent);
 
    // Send the refreshed event back as the response
    res.json(refreshedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
    try {
      const { id } = req.params;  // Get event ID from route
      await Event.destroy({ where: { id } });  // Delete event from the database
      res.json({ message: 'Event deleted successfully' });  // Send success response
    } catch (error) {
      console.error('Error:', error);  // Log error
      res.status(500).json({ error: 'Failed to delete event' });  // Send error response
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
