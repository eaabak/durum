import { cn } from "../lib/utils";
import { useTheme } from "../stores/useTheme";
import { Button } from "./ui/button";

export function IntroCard() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
      <Heading className={theme === "light" ? "text-black" : "text-white"}>
        useDurum
      </Heading>
      <Description
        className={`font-sans ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        React uygulamaları için hafif, esnek ve genişletilebilir bir state
        yönetim kütüphanesidir. Modern React uygulamalarında global ve lokal
        durumları yönetmek için tasarlanmıştır. Minimalist yapısı sayesinde
        performans kaygısı olmadan güçlü bir state yönetim deneyimi sunar.
      </Description>
      <Actions>
        <Button asChild size="sm">
          <a href="/docs">Get Started</a>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <a href="/blocks">Browse Blocks</a>
        </Button>
      </Actions>
    </div>
  );
}
function Heading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  );
}
function Description({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-3xl text-balance text-lg font-light text-foreground",
        className
      )}
      {...props}
    />
  );
}
function Actions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 pt-2",
        className
      )}
      {...props}
    />
  );
}
