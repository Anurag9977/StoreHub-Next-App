export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!,
  projectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  usersCollectionID: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  filesCollectionID: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
  bucketID: process.env.NEXT_PUBLIC_BUCKET_ID!,
  apiSecretKey: process.env.APPWRITE_API_SECRET!,
};
