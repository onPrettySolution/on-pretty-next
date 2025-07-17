import { list } from 'aws-amplify/storage';

export const listFiles = async (websiteId: string) => await list({
  path: ({ identityId }) => `${identityId}/${websiteId}/`
});