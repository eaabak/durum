export function Footer() {
  return (
    <footer className="border-t py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600">
          Built by{" "}
          <a
            href="/#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            useDurum
          </a>
          . The source code is available on{" "}
          <a
            href="/#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
