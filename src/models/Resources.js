import client from '../config/database.js';

export const getallCloudProviders = async () => {
  console.log("getallCloudProviders");
  const result = await client.query('select * from cloud_provider');
  return result;
};


export const getResourcesForCloudProvider = async (cloud_provider_id) => {
  console.log("getResourcesForCloudProvider");
  const result = await client.query(
    'select * from resource_metadata where cloud_provider_id = $1',[cloud_provider_id]
  );
  return result;
};
