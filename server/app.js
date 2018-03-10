import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import appRoutes from './routes/appRoutes';

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Home page route
app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Don Ulor',
        message: 'Welcome to WeConnect'
    });
});

app.use('/api/v1/', appRoutes);

// Trivial Route
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Invalid routes'
    });
});


app.listen(3001, () => console.log(`Application started on port ${port}`));
export default app;