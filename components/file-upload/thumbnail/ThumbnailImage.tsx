import Image from "next/image";

function ThumbnailImage({
  url,
  size = "default",
}: {
  url: string;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <div
      className={`relative ${
        size === "lg" ? "h-20 w-20" : size === "sm" ? "h-10 w-10" : "h-14 w-14"
      }`}
    >
      <Image
        src={url}
        alt="thumb-image"
        fill
        sizes="33vw"
        className={`h-full object-cover shadow ${
          size === "lg" ? "rounded-xl" : "rounded-full"
        }`}
      />
    </div>
  );
}
export default ThumbnailImage;
