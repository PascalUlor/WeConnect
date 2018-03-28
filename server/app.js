import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';

import dbRoutes from './routes/dbRoutes';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Home page route
app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Welcome to WeConnect',
        message: 'Get Your Business To The World'
    });
});


// Postgres ROUTES
app.use('/api/v1/', dbRoutes);

// Trivial Route
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Invalid routes'
    });
});


app.listen(port, () => console.log(`Application started on port ${port}, ${process.cwd()}, ${__dirname}`));
export default app;