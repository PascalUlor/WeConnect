import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Application started on port ${port}`));