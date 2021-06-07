const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = Number(process.env.PORT);
const uri = String(process.env.MONGO_URI);
const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose
    .connect(uri, connectOptions)
    .then()
    .catch((err) => console.log('Error:' + err));
mongoose.connection.once('open', () =>
    console.log('Connected to MongoDB successfully...')
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('case sensitive routing', true);

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

const main = require('./routes/main');
const notice = require('./routes/notice');
const timetable = require('./routes/timetable');
const user = require('./routes/user');

app.use('/', main);
app.use('/notice', notice);
app.use('/profile', user);
app.use('/timetable', timetable);

app.get('*', (_req, res) => {
    res.render('404', { pageTitle: `Elece | 404` } );
});

app.listen(port, () => console.log(`Web server started at port: ${port}`));
