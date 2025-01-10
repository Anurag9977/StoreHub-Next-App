import { getSizeInMB } from "@/lib/utils";
import { formatDateTime } from "@/utils/format";
import { FileStatsType } from "@/utils/types";
import ThumbnailIcon from "../file-upload/thumbnail/ThumbnailIcon";

//Stats icons png
import documentsIcon from "@/assets/type-icons/documents.png";
import imagesIcon from "@/assets/type-icons/images.png";
import mediaIcon from "@/assets/type-icons/media.png";
import othersIcon from "@/assets/type-icons/others.png";

function StatsCard({ stats }: { stats: FileStatsType }) {
  const { type, size, total, lastUpdated } = stats;

  return (
    <div className="relative h-full bg-background rounded-3xl py-4 px-6">
      <h3 className="text-right font-medium tracking-wide">
        {getSizeInMB(size)} MB
      </h3>
      <h2 className="mt-2 font-semibold capitalize">
        {total} {type}
      </h2>
      {lastUpdated && (
        <p className="mt-2 text-xs text-muted-foreground italic tracking-wide">
          Modified : {formatDateTime(new Date(lastUpdated))}
        </p>
      )}
      <div className="absolute -top-7 -left-7 bg-muted p-2 rounded-3xl">
        {type === "documents" ? (
          <ThumbnailIcon
            url={documentsIcon.src}
            backgroundColor="bg-blue-500/60"
          />
        ) : type === "images" ? (
          <ThumbnailIcon
            url={imagesIcon.src}
            backgroundColor="bg-green-500/60"
          />
        ) : type === "media" ? (
          <ThumbnailIcon url={mediaIcon.src} backgroundColor="bg-rose-500/60" />
        ) : (
          <ThumbnailIcon
            url={othersIcon.src}
            backgroundColor="bg-neutral-500/60"
          />
        )}
      </div>
      {/* Border Radius Elements */}
      <div className="absolute top-11 -left-0 bg-background h-5 w-5 rounded-3xl z-10"></div>
      <div className="absolute top-10 -left-1 bg-muted h-5 w-5 rounded-3xl"></div>
      <div className="absolute top-0 left-11 bg-background h-5 w-5 rounded-3xl z-10"></div>
      <div className="absolute -top-1 left-10 bg-muted h-5 w-5 rounded-3xl"></div>
    </div>
  );
}
export default StatsCard;
