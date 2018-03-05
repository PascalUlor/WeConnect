import express from 'express';
import bodyParser from 'body-parser';
import appRoutes from '../server/routes/approutes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home page route
app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Don Ulor',
        message: 'Welcome to WeConnect'
    });
});

app.use('/api/', appRoutes);

app.listen(3000, () => console.log(`Application started on port ${port}`));
export default app;