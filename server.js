const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

const errorHandler = require('./middleware/error')

app.use(express.json())
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use('/v1', require('./routes/employees.route'));
// app.use('/v1', require('./routes/stations.route'));
app.use(errorHandler);

// const PORT = process.env.PORT || 4001;

mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));
