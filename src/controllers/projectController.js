import { deleteProject, editProject, saveProject , checkProjectExists, checkProjectUserExists, checkProjectNameExists}  from '../models/Project.js';
import { getallCloudProviders, getResourcesForCloudProvider } from '../models/Resources.js';

export const deleteProjectByUser = async (req, res) => {
  try {
    const { projectId, cloudProviderId} = req.params;
    const {userId} = req.userId;
    console.log("deleteProject");
    console.log(req.params);
    const projectExists = await checkProjectExists(cloudProviderId, projectId);
    if (!projectExists) {
      return res.status(400).json({ message: 'Project Doesnt Exist!' });
    }
    const proj = await deleteProject(userId, projectId);
    res.status(200).json({ message: 'Project Deleted Successfully!', proj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const editProjectByUser = async(req, res) => { 
  console.log("editProject");
  const {userId} = req.userId;
  const {projectId,project_name, cloud_provider, resource_data} = req.body;
  const projectExists = await checkProjectUserExists(projectId. userId);
  if (!projectExists) {
    console.log("project doesn't exist for the given userId");
    return res.status(400).json({ message: 'Project Doesnt Exist!' });
  }
  const updatedProject = await editProject(projectId,project_name, cloud_provider, resource_data);
  console.log("updated the project successfully !");
  res.status(200).json({ message: 'Project Updated Successfully!', updatedProject });
};

export const createProjectByUser = async(req, res) => {
  console.log("createProjectbyUser");
  const {userId} = req;
  const {projectId,project_name, cloud_provider, resource_data} = req.body;

  
  const projectExists = await checkProjectNameExists(project_name, cloud_provider);
  if (projectExists) {
    console.log("project already exists with the given name");
    return res.status(400).json({ message: 'Project Exists with the given Name!' });
  }
   const savedProject = await saveProject(project_name, cloud_provider, resource_data, userId);
  console.log("saved the project successfully !");
  res.status(200).json({ message: 'Project Saved Successfully!', savedProject });

};

export const getAllProjectsByUser = async (req, res) => {
  const userId = req;
  console.log("getCloudProviderList");
  const listOfCloudProviders = await getAllProjectsByUser(userId);
  res.status(200).json({ message: '', listOfCloudProviders });
};


export const getCloudProvidersList = async(req, res) => {
  console.log("getCloudProviderList");
  const listOfCloudProviders = await getallCloudProviders();
  res.status(200).json({ message: '', listOfCloudProviders });
};

export const getAllResourcesForCloudProvider = async(req, res) => {
  const cpId = req.params;
  console.log("getResourcesForCloudProvider");
  const listOfResources = await getResourcesForCloudProvider(cpId);
  res.status(200).json({listOfResources});
};