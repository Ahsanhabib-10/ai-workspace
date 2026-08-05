interface SectionHeadingProps {
  title: string;
  description: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mt-6 text-lg text-muted-foreground">
        {description}
      </p>
    </div>
  );
}