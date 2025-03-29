import client from '../config/database.js';

export const deleteProject = async (user_id, project_id) => {
  console.log("deleteProject");
  const result = await client.query('delete FROM project WHERE user_id = $1 and project_id = $2 returning project_id', [user_id, project_id]);
  return result;
};

export const checkProjectExists = async (cloud_provider_id, project_name) => {
  console.log("deleteProject");
  const result = await client.query('select * from project WHERE cloud_provider_id = $1 and project_name = $2', [cloud_provider_id, project_name]);
  return result.rows.length == 1 ? true : false;
};


export const editProject = async (project_id, project_name, cloud_provider, resource_data) => {
  console.log("editProject");
  const result = await client.query(
    'update project set project_name = $1, cloud_provider_id= $2, resource_data = $3 where project_id=$4 returning project_id',
    [project_name, cloud_provider, resource_data,project_id]
  );
  return result;
};
