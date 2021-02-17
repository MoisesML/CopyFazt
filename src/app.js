import express from 'express'
import morgan from 'morgan' // Middleware de express
import cors from 'cors'
import helmet from 'helmet'

import pkg from '../package.json'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'

import { createRoles, createAdmin } from './libs/initialSetup'


const app = express();
// setTimeout(createRoles,150000)
// setTimeout(createAdmin,150000)
createRoles();
createAdmin();

app.set('pkg', pkg); //Guardar en una variable pkg el contenido del package
app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // sirve para mostrar las solicitudes que se hacen al servidor
app.use(express.json()); //Para que entienda los objetos json que llegan al servidor
app.use(express.urlencoded({ extended : false }));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to my Products API',
        name: app.get('pkg').name,
        version: app.get('pkg').version,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
    });
})

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

export default app;