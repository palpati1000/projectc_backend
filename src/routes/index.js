import { sendHello } from '../controllers/hello.js';

const registerRoutes = (router) => {
    router.get('/hello', sendHello);
};
export default registerRoutes;
