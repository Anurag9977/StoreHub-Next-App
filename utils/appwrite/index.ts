import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";

const { endpoint, projectID, apiSecretKey } = appwriteConfig;

export async function createSessionClient() {
  const client = new Client().setEndpoint(endpoint).setProject(projectID);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) throw new Error("No session found");

  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setKey(apiSecretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
}
