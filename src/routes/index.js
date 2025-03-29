

import { sendHello } from '../controllers/hello.js';
import { authUser, registerUser } from '../controllers/authController.js';
import { deleteProjectByUser } from '../controllers/projectController.js';    


const registerRoutes = (router) => {
    router.get('/hello', sendHello);
    
router.post('/register', registerUser);
router.post('/login', authUser);
router.delete('/project/delete/:userId/:projectId', deleteProjectByUser);  
};

export default registerRoutes;