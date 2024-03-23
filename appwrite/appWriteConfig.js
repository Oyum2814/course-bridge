import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65f96cc040b5130aefd5");

export const storage = new Storage(client);
