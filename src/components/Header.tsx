import { useIcons } from "../icons/useIcons";
import { Nav } from "./Nav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { NotificationDropdown } from "./NotificationDropdown";
import { useTheme } from "../stores/useTheme";

export function Header() {
  const { GitHubIcon } = useIcons();
  const { theme } = useTheme();

  return (
    <header
      className={`border-grid fixed top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:backdrop-blur ${
        theme === "light"
          ? "bg-white/60 text-gray-800 border-gray-200 supports-[backdrop-filter]:bg-white/60"
          : "bg-gray-800/60 text-gray-200 border-gray-600 supports-[backdrop-filter]:bg-gray-800/60"
      }`}
    >
      <div>
        <div className="container flex h-14 items-center">
          <Nav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <a href={""} target="_blank" rel="noreferrer">
                  <GitHubIcon className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <NotificationDropdown />
              <ThemeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
