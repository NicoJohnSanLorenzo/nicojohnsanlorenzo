const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const deptRoutes = require('./routes/deptRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studRoutes = require('./routes/studRoutes');
const newRoutes = require('./routes/newRoutes');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Nico John C. San Lorenzo");
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/dept', deptRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/stud', studRoutes);
app.use('/api/new', newRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});