import client from '../config/database.js';

export const deleteProject = async (user_id, project_id) => {
  console.log("deleteProject");
  const result = await client.query('delete FROM project WHERE user_id = $1 and project_id = $2 returning project_id', [user_id, project_id]);
  return result;
};

export const getAllProjects = async (user_id) => {
  console.log("getAllProjects");
  const result = await client.query('select * FROM project WHERE user_id = $1', [user_id]);
  return result;
};

export const checkProjectExists = async (cloud_provider_id, project_id) => {
  console.log("checkProjectExists");
  const result = await client.query('select * from project WHERE cloud_provider_id = $1 and project_id = $2', [cloud_provider_id, project_id]);
  return result.rows.length == 1 ? true : false;
};

export const checkProjectUserExists = async (project_id, user_id) => {
  console.log("checkProjectUserExists");
  const result = await client.query('select * from project where project_id = $1 and user_id = $2', [project_id, user_id]);
  return result.rows.length == 1 ? true : false;
};

export const checkProjectNameExists = async (project_name, cloud_provider_id) => {
  console.log("checkProjectUserExists");
  const result = await client.query('select * from project where project_name = $1 and cloud_provider_id = $2', [project_name, cloud_provider_id]);
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

export const saveProject = async ( project_name, cloud_provider, resource_data, user_id) => {
  console.log("saveProject");
  const result = await client.query(
    'insert into project(project_name, cloud_provider_id, resource_data, user_id) values ($1, $2, $3, $4) returning project_id',
    [project_name, cloud_provider, resource_data, user_id]
  );
  return result;
};