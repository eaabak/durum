import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function Nav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block">USEDURUM</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          to="/themes"
          className={cn("transition-colors hover:text-foreground/80")}
        >
          Gelecekler buraya
        </Link>
        <Link
          to="/docs"
          className={cn("transition-colors hover:text-foreground/80")}
        >
          Docs
        </Link>
      </nav>
    </div>
  );
}
