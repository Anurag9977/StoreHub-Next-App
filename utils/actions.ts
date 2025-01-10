"use server";

import { getAuthSchema, OTPSchema, validatedFieldsWithZod } from "./schemas";
import { createAdminClient, createSessionClient } from "./appwrite/";
import { ID, Models, Query } from "node-appwrite";
import { appwriteConfig } from "./appwrite/config";
import { cookies } from "next/headers";
import {
  constructBucketImageURL,
  getExtension,
  getFileType,
  parseStringify,
} from "@/lib/utils";
import { FilesSortType, FileStatsType, FileType } from "@/utils/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const { databaseID, usersCollectionID, filesCollectionID, bucketID } =
  appwriteConfig;

export async function getError(
  error: unknown
): Promise<{ message: string; payload: any }> {
  return {
    message: error instanceof Error ? error.message : "Something went wrong!",
    payload: null,
  };
}

export async function isExistingUser(email: string) {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(databaseID, usersCollectionID, [
    Query.equal("email", email),
  ]);
  return result.documents.length > 0 ? result.documents[0] : null;
}

export async function sendEmailOTP(email: string) {
  try {
    const { account } = await createAdminClient();
    const sessionToken = await account.createEmailToken(ID.unique(), email);
    const accountID = sessionToken.userId;
    return parseStringify({ accountID });
  } catch (error) {
    throw new Error("Failed to send OTP. Please try again.");
  }
}

export async function loginAction(
  data: any
): Promise<{ message: string; payload?: any }> {
  try {
    const validatedFields = validatedFieldsWithZod(
      getAuthSchema("login"),
      data
    );
    const { email } = validatedFields;
    if (!(await isExistingUser(email))) {
      return { message: "User not registered. Please sign up." };
    }
    //Get account ID from email
    const { accountID } = await sendEmailOTP(email);
    return {
      message: "OTP has been sent to your registered email.",
      payload: parseStringify({ accountID }),
    };
  } catch (error) {
    return await getError(error);
  }
}
export async function signUpAction(data: any) {
  try {
    const validatedFields = validatedFieldsWithZod(
      getAuthSchema("sign-up"),
      data
    );
    const { email, firstName, lastName } = validatedFields;
    if (await isExistingUser(email)) {
      return {
        message: "User already registered. Please login.",
        payload: null,
      };
    }
    const { databases } = await createAdminClient();
    //Get account ID from email
    const { accountID } = await sendEmailOTP(email);
    await databases.createDocument(databaseID, usersCollectionID, ID.unique(), {
      email,
      firstName,
      lastName,
      avatar: process.env.AVATAR_URL,
      accountID,
    });
    return {
      message: "OTP has been sent to your email",
      payload: parseStringify({ accountID }),
    };
  } catch (error) {
    return await getError(error);
  }
}

export async function verifyOTPAction(accountID: string, data: any) {
  try {
    const validatedFields = validatedFieldsWithZod(OTPSchema, data);
    const { pin } = validatedFields;
    const { account } = await createAdminClient();
    const session = await account.createSession(accountID, pin);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return {
      message: "OTP successfully verified.",
      payload: parseStringify({ sessionID: session.$id }),
    };
  } catch (error) {
    return await getError(error);
  }
}

export async function getCurrentUser() {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const result = await databases.listDocuments(
      databaseID,
      usersCollectionID,
      [Query.equal("accountID", user.$id)]
    );
    return {
      message: `Welcome back, ${result.documents[0].firstName}!`,
      payload: result.documents[0],
    };
  } catch (error) {
    return getError(error);
  }
}

export async function logoutAction() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
    return { message: "Logged out successfully" };
  } catch (error) {
    return getError(error);
  }
}

function getTotalFileSize({ files }: { files: Models.Document[] }) {
  let totalSize = 0;
  files.forEach((document) => {
    totalSize += document.size;
  });
  return totalSize;
}

export async function uploadFile({
  file,
  accountID,
  ownerID,
  pathname,
}: {
  file: File;
  accountID: string;
  ownerID: string;
  pathname: string;
}) {
  try {
    const { databases, storage } = await createAdminClient();
    //Check if file size exceeds the file size limit
    if (
      file.size >
      parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB!) * 1024 * 1000
    ) {
      throw new Error(
        `File ${file.name} cannot be uploaded. File size limit exceeded.`
      );
    }
    // Check if file size exceeds the storage limit allocated for the user
    const maxStorageAllocated =
      parseInt(process.env.NEXT_PUBLIC_MAX_STORAGE_ALLOCATED_MB!) * 1024 * 1000;
    const result = await getAllFiles({ sort: "latest", search: "" });
    const totalFileSize =
      getTotalFileSize({ files: result.documents }) + file.size;
    console.log({
      total: totalFileSize,
      maxStorageAllocated,
    });
    if (totalFileSize > maxStorageAllocated) {
      throw new Error(
        `File ${file.name} cannot be uploaded. Storage limit is exceeding.`
      );
    }
    // Upload file to appwrite bucket
    const uploadedFile = await storage.createFile(bucketID, ID.unique(), file);
    const { $id: fileID, name, sizeOriginal } = uploadedFile;
    //Get the file name without the extension
    const split = name.split(".");
    split.pop();
    const fileName = split.join(".");
    //Add file document into database collection
    const fileDocument = {
      name: fileName,
      url: constructBucketImageURL(fileID),
      type: getFileType(name),
      size: sizeOriginal,
      extension: getExtension(name),
      accountID,
      owner: ownerID,
      bucketFieldID: fileID,
    };
    try {
      await databases.createDocument(
        databaseID,
        filesCollectionID,
        ID.unique(),
        fileDocument
      );
    } catch (error) {
      await storage.deleteFile(bucketID, fileID);
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
    revalidatePath(pathname);
    return { message: "File uploaded successfully" };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
}

function getQueries({
  type,
  userInfo,
}: {
  type: FileType;
  userInfo: Models.Document;
}) {
  return [
    Query.or([
      Query.equal("owner", userInfo.$id),
      Query.contains("users", userInfo.email),
    ]),
    Query.equal("type", type),
  ];
}

function getSortQueries({ sort }: { sort: FilesSortType }) {
  switch (sort) {
    case "latest":
      return [Query.orderDesc("$updatedAt")];
    case "a-z":
      return [Query.orderAsc("name")];
    case "z-a":
      return [Query.orderDesc("name")];
    case "s-l":
      return [Query.orderAsc("size")];
    case "l-s":
      return [Query.orderDesc("size")];
    default:
      return [Query.orderDesc("$updatedAt")];
  }
}

export async function getAllFiles({
  sort,
  search,
}: {
  sort: FilesSortType;
  search: string;
}): Promise<{
  documents: Models.Document[];
  total: number;
  totalSize: number;
}> {
  const { databases } = await createAdminClient();
  const user = await getCurrentUser();
  if (!user.payload) return redirect("/login");
  const result = await databases.listDocuments(databaseID, filesCollectionID, [
    Query.contains("name", search),
    Query.or([
      Query.equal("owner", user.payload.$id),
      Query.contains("users", user.payload.email),
    ]),
    ...getSortQueries({ sort }),
  ]);
  return {
    documents: parseStringify(result.documents),
    total: result.total,
    totalSize: getTotalFileSize({ files: result.documents }),
  };
}

export async function getFilesByType({
  type,
  sort,
}: {
  type: FileType;
  sort: FilesSortType;
}): Promise<{
  documents: Models.Document[];
  total: number;
  totalSize: number;
}> {
  const { databases } = await createAdminClient();
  const user = await getCurrentUser();
  if (!user.payload) return redirect("/login");
  const result = await databases.listDocuments(databaseID, filesCollectionID, [
    ...getQueries({ type, userInfo: user.payload }),
    ...getSortQueries({ sort }),
  ]);
  return {
    documents: parseStringify(result.documents),
    total: result.total,
    totalSize: getTotalFileSize({ files: result.documents }),
  };
}

export async function getFileStatsByType() {
  const { databases } = await createAdminClient();
  const user = await getCurrentUser();
  if (!user.payload) return redirect("/login");
  const result = await databases.listDocuments(databaseID, filesCollectionID, [
    Query.or([
      Query.equal("owner", user.payload.$id),
      Query.contains("users", user.payload.email),
    ]),
    Query.orderDesc("$updatedAt"),
  ]);

  let stats: FileStatsType[] = [
    {
      type: "documents",
      size: 0,
      total: 0,
      lastUpdated: "",
    },
    {
      type: "images",
      size: 0,
      total: 0,
      lastUpdated: "",
    },
    {
      type: "media",
      size: 0,
      total: 0,
      lastUpdated: "",
    },
    {
      type: "others",
      size: 0,
      total: 0,
      lastUpdated: "",
    },
  ];

  result.documents.reduce(
    (total: FileStatsType[], current: Models.Document) => {
      const findObj = total.find((obj) => obj.type === current.type);
      if (findObj) {
        findObj.size += current.size;
        findObj.total += 1;
        findObj.lastUpdated = findObj.lastUpdated || current.$updatedAt;
      } else {
        total.push({
          type: current.type,
          size: current.size,
          total: 1,
          lastUpdated: current.$updatedAt,
        });
      }
      return total;
    },
    stats
  );
  return stats;
}

export async function renameFile({
  file,
  newName,
  pathname,
}: {
  file: Models.Document;
  newName: string;
  pathname: string;
}) {
  try {
    const { databases } = await createSessionClient();
    const user = await getCurrentUser();
    if (user.payload.$id !== file.owner.$id)
      return {
        message: "Current user is not the owner of this file.",
        payload: null,
      };
    const updatedDocument = await databases.updateDocument(
      databaseID,
      filesCollectionID,
      file.$id,
      {
        name: newName,
      }
    );
    revalidatePath(pathname);
    return {
      message: "File name updated successfully",
      payload: parseStringify(updatedDocument),
    };
  } catch (error) {
    return getError(error);
  }
}

export async function shareFiles({
  file,
  emails,
  pathname,
}: {
  file: Models.Document;
  emails: string;
  pathname: string;
}) {
  try {
    const { databases } = await createSessionClient();
    const user = await getCurrentUser();
    if (user.payload.$id !== file.owner.$id)
      throw new Error("Current user is not the owner of this file.");

    let data: string[] = [];
    if (emails) {
      //Check if email has already been shared
      let emailsArray: string[] = [];
      emails.split(",").forEach((email) => {
        if (file.owner.email === email.trim())
          throw new Error("Cannot share file with the owner.");
        if (email) {
          emailsArray.push(email);
        }
      });
      data = emailsArray.filter(
        (item, index) => emailsArray.indexOf(item) === index
      );
    }

    const updatedDocument = await databases.updateDocument(
      databaseID,
      filesCollectionID,
      file.$id,
      {
        users: [...data],
      }
    );
    revalidatePath(pathname);
    return {
      message: "File shared with users successfully.",
      payload: parseStringify(updatedDocument),
    };
  } catch (error) {
    return getError(error);
  }
}

export async function removeSharedUser({
  file,
  email,
  pathname,
}: {
  file: Models.Document;
  email: string;
  pathname: string;
}) {
  try {
    const { databases } = await createSessionClient();
    const user = await getCurrentUser();
    if (user.payload.$id !== file.owner.$id)
      throw new Error("Current user is not the owner of this file.");

    const data = file.users.filter((user: string) => user !== email);

    const updatedDocument = await databases.updateDocument(
      databaseID,
      filesCollectionID,
      file.$id,
      {
        users: [...data],
      }
    );
    revalidatePath(pathname);
    return {
      message: "File unshared with user.",
      payload: parseStringify(updatedDocument),
    };
  } catch (error) {
    return getError(error);
  }
}

export async function deleteFile({
  file,
  pathname,
}: {
  file: Models.Document;
  pathname: string;
}) {
  try {
    const { storage } = await createAdminClient();
    const { databases } = await createSessionClient();
    const user = await getCurrentUser();
    if (user.payload.$id !== file.owner.$id)
      throw new Error("This file is owned by another user.");

    //Remove file from bucket
    await storage.deleteFile(bucketID, file.bucketFieldID);
    //Remove file document
    const deletedDocument = await databases.deleteDocument(
      databaseID,
      filesCollectionID,
      file.$id
    );
    if (!deletedDocument) throw new Error("File not found.");
    revalidatePath(pathname);
    return { message: "File deleted successfully", payload: "success" };
  } catch (error) {
    return getError(error);
  }
}
