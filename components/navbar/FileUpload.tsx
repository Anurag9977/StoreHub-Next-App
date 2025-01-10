"use client";

import { LuArrowUpToLine } from "react-icons/lu";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import UploadingContainer from "../file-upload/UploadingContainer";
import { toast } from "@/hooks/use-toast";
import { uploadFile } from "@/utils/actions";
import { LucideCheckCircle } from "lucide-react";
import { usePathname } from "next/navigation";

function FileUpload({
  ownerID,
  accountID,
  handleSidebarOpen,
}: {
  ownerID: string;
  accountID: string;
  handleSidebarOpen?: () => void;
}) {
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (
          file.size >
          parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB as string) *
            1024 *
            1000
        ) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          toast({
            title: "File size limit exceeded.",
            description: `The file ${file.name} is greater than 50MB.`,
            variant: "destructive",
          });
        }
        return await uploadFile({ file, accountID, ownerID, pathname });
      });
      try {
        await Promise.all(uploadPromises);
        toast({
          description: (
            <div className="flex items-center gap-x-2">
              <p>All files successfully uploaded</p>
              <LucideCheckCircle size={22} className="text-green-500" />
            </div>
          ),
        });
      } catch (error) {
        toast({
          description:
            error instanceof Error ? error.message : "Something went wrong.",
          variant: "destructive",
        });
      } finally {
        setFiles([]);
        handleSidebarOpen && handleSidebarOpen();
      }
    },
    [ownerID, accountID]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
  });

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Button className="h-10 w-full lg:w-max tracking-wide rounded-3xl font-medium">
          <LuArrowUpToLine size={26} strokeWidth={2.5} />
          Upload
        </Button>
      </div>
      {/* Uploading Container */}
      {files.length > 0 && <UploadingContainer files={files} />}
    </section>
  );
}
export default FileUpload;
