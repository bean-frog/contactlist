const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = 6969;

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/user1', async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      return res.status(400).json({ error: 'No JSON data provided' });
    }
    const filename = path.join(__dirname, 'data/user1.json');
    let existingData = [];
    try {
      const fileData = await fs.readFile(filename, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (readError) {
      console.error('Error reading file:', readError);
    }
    existingData.push(jsonData);
    await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
    res.status(200).json({ success: true, message: 'Data added to file' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/user2', async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      return res.status(400).json({ error: 'No JSON data provided' });
    }
    const filename = path.join(__dirname, 'data/user2.json');
    let existingData = [];
    try {
      const fileData = await fs.readFile(filename, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (readError) {
      console.error('Error reading file:', readError);
    }
    existingData.push(jsonData);
    await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
    res.status(200).json({ success: true, message: 'Data added to file' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/user3', async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      return res.status(400).json({ error: 'No JSON data provided' });
    }
    const filename = path.join(__dirname, 'data/user3.json');
    let existingData = [];
    try {
      const fileData = await fs.readFile(filename, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (readError) {
      console.error('Error reading file:', readError);
    }
    existingData.push(jsonData);
    await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
    res.status(200).json({ success: true, message: 'Data added to file' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/user4', async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      return res.status(400).json({ error: 'No JSON data provided' });
    }
    const filename = path.join(__dirname, 'data/user4.json');
    let existingData = [];
    try {
      const fileData = await fs.readFile(filename, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (readError) {
      console.error('Error reading file:', readError);
    }
    existingData.push(jsonData);
    await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
    res.status(200).json({ success: true, message: 'Data added to file' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteAll', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({error: "no data provided in req.body"})
    } 
    console.log(user);
    const filename = path.join(__dirname, 'data/' + req.body.user + '.json');
  } catch (error) {
    console.error('idk error doing stuff, you fucked up dumbass')
  }

})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
