import Image from "next/image";

function ThumbnailIcon({
  url,
  size = "default",
  backgroundColor = "bg-neutral-500/10",
}: {
  url: string;
  size?: "sm" | "default" | "lg";
  backgroundColor: string;
}) {
  return (
    <div
      className={`${backgroundColor} shadow ${
        size === "lg"
          ? "h-20 w-20 rounded-xl p-5"
          : size === "sm"
          ? "h-10 w-10 rounded-full p-2"
          : "h-14 w-14 rounded-full p-3"
      }`}
    >
      <Image src={url} alt="thumb-image" width={96} height={96} />
    </div>
  );
}
export default ThumbnailIcon;
