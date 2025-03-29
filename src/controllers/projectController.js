import { deleteProject, editProject }  from '../models/Project.js';


export const deleteProjectByUser = async (req, res) => {
  try {
    const {userId, projectId} = req.params;
    console.log("deleteProject");
    console.log(req.params);
    const projectExists = await checkProjectExists(userId, projectId);
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
