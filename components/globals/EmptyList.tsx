function EmptyList({
  heading = "items",
  message = "please try again",
}: {
  heading?: string;
  message?: string;
}) {
  return (
    <section>
      <h1 className="text-lg font-semibold tracking-wide">{heading}</h1>
      <p className="mt-1 text-base font-medium tracking-wide">{message}</p>
    </section>
  );
}
export default EmptyList;
