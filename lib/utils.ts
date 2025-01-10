import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import path from "path";
import { FileType } from "@/utils/types";
import { appwriteConfig } from "@/utils/appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function getExtension(fileName: string): string {
  const extension = path.extname(fileName).slice(1).toLowerCase();
  return extension;
}

export function getFileType(fileName: string): FileType {
  const extension = getExtension(fileName);
  if (!extension) return "others";

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "ppt",
    "pptx",
  ];
  const imageExtensions = ["jpeg", "jpg", "png", "gif", "bmp"];
  const mediaExtensions = ["mp3", "wav", "mp4", "avi", "mkv", "mov"];

  if (documentExtensions.includes(extension)) return "documents";
  if (imageExtensions.includes(extension)) return "images";
  if (mediaExtensions.includes(extension)) return "media";

  return "others";
}

export function constructBucketImageURL(fileID: string): string {
  const { endpoint, bucketID, projectID } = appwriteConfig;
  return `${endpoint}/storage/buckets/${bucketID}/files/${fileID}/view?project=${projectID}&project=${projectID}&mode=admin`;
}

export function getSizeInMB(size: number): string {
  const sizeInMB = size / 1000 / 1024;
  return sizeInMB.toFixed(2);
}

export function getSizeInGB(size: number): string {
  const sizeInGB = size / 1000 / 1024 / 1024;
  return sizeInGB.toFixed(2);
}

export function getPercentageSpaceUsed(size: number) {
  const fractionSpaceUsed = size / (2 * 1024 * 1024 * 1000);
  const percentageSpaceUsed = fractionSpaceUsed * 100;
  return Math.round(percentageSpaceUsed);
}

export function getSpaceAvailable(size: number) {
  const spaceAvailable = 2 * 1024 * 1024 * 1000 - size;
  return getSizeInGB(spaceAvailable);
}
