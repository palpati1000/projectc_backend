

import { sendHello } from '../controllers/hello.js';
import { authUser, registerUser } from '../controllers/authController.js';
import { createProjectByUser, deleteProjectByUser, editProjectByUser, getAllProjectsByUser, getAllResourcesForCloudProvider, getCloudProvidersList } from '../controllers/projectController.js';    
import { authenticate } from '../models/authenticate.js';

const registerRoutes = (router) => {
    router.get('/hello', sendHello);
    
router.post('/register', registerUser);
router.post('/login', authUser);
router.delete('/project/delete/:projectId', authenticate, deleteProjectByUser); 
router.get('/project', authenticate, getAllProjectsByUser);
router.post('/project/save', authenticate, createProjectByUser);
router.post('/project/update', authenticate, editProjectByUser); 
router.get('/cloud-provider', getCloudProvidersList);
router.get('/cloud-providers/reosurces/:cpId', getAllResourcesForCloudProvider);
};

export default registerRoutes;