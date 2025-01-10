import ThumbnailImage from "./ThumbnailImage";
import ThumbnailIcon from "./ThumbnailIcon";
import docsIcon from "@/assets/file-icons/docs.png";
import sheetsIcon from "@/assets/file-icons/sheets.png";
import pptIcon from "@/assets/file-icons/powerpoint.png";
import pdfIcon from "@/assets/file-icons/pdf.png";
import audioIcon from "@/assets/file-icons/audio.png";
import videoIcon from "@/assets/file-icons/video-file.png";
import unknownIcon from "@/assets/file-icons/unknown.png";

function ThumbnailContainer({
  fileType,
  url,
  extension,
  thumbnailSize = "default",
}: {
  fileType: string;
  url: string;
  extension: string;
  thumbnailSize?: "sm" | "default" | "lg";
}) {
  switch (fileType) {
    case "images": {
      return <ThumbnailImage url={url} size={thumbnailSize} />;
    }
    case "documents": {
      if (["doc", "docx", "txt", "xls"].includes(extension)) {
        return (
          <ThumbnailIcon
            url={docsIcon.src}
            size={thumbnailSize}
            backgroundColor="bg-blue-500/10"
          />
        );
      } else if (["xlsx", "xls", "csv"].includes(extension)) {
        return (
          <ThumbnailIcon
            url={sheetsIcon.src}
            size={thumbnailSize}
            backgroundColor="bg-green-500/10"
          />
        );
      } else if (["ppt", "pptx"].includes(extension)) {
        return (
          <ThumbnailIcon
            url={pptIcon.src}
            size={thumbnailSize}
            backgroundColor="bg-orange-500/10"
          />
        );
      } else {
        return (
          <ThumbnailIcon
            url={pdfIcon.src}
            size={thumbnailSize}
            backgroundColor="bg-red-500/10"
          />
        );
      }
    }
    case "media": {
      if (["mp3", "wav"].includes(extension)) {
        <ThumbnailIcon
          url={audioIcon.src}
          size={thumbnailSize}
          backgroundColor="bg-yellow-500/10"
        />;
      } else {
        return (
          <ThumbnailIcon
            url={videoIcon.src}
            size={thumbnailSize}
            backgroundColor="bg-teal-500/10"
          />
        );
      }
    }
    default: {
      return (
        <ThumbnailIcon
          url={unknownIcon.src}
          size={thumbnailSize}
          backgroundColor="bg-neutral-500/10"
        />
      );
    }
  }
}
export default ThumbnailContainer;
