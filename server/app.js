import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

// Home page route
app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Don Ulor',
        message: 'Welcome to WeConnect'
    });
});

app.listen(3000, () => console.log(`Application started on port ${port}`));
export default app;