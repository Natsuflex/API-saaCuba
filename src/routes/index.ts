import { Router } from 'express';
import auth from './auth';
import user from './user';
import picto from "./picto";
import cuento from "./cuento";
import escenario from "./escenario";
import coment from "./coment";
import imagen from "./imagen";
import pregunta from './pregunta';
import seccion from './seccion';
import prueba from './prueba';
import video from './video';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/picto', picto);
routes.use('/cuento', cuento);
routes.use('/escenario', escenario);
routes.use('/comentario', coment);
routes.use('/imagen', imagen);
routes.use('/pregunta', pregunta);
routes.use('/prueba', prueba);
routes.use('/seccion', seccion);
routes.use('/video', video);

export default routes;
