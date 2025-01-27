import { MDXProvider } from "@mdx-js/react";
import { useEffect, useState } from "react";

const Docs: React.FC = () => {
  const [Content, setContent] = useState<React.FC | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const mdxModule = await import("../../docs/create-store/create-store.md");
      setContent(() => mdxModule.default);
    };
    loadContent();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <nav className="fixed top-[64px] left-0 w-1/5 border-r border-gray-200 p-4 h-[calc(100vh-56px)] bg-white">
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="#section1" className="text-blue-500 hover:underline">
                Section 1
              </a>
            </li>
            <li>
              <a href="#section2" className="text-blue-500 hover:underline">
                Section 2
              </a>
            </li>
            <li>
              <a href="#section3" className="text-blue-500 hover:underline">
                Section 3
              </a>
            </li>
          </ul>
        </nav>

        <main className="ml-[20%] mr-[20%] w-3/5 p-4 overflow-y-auto pt-[3.5rem] mt-4">
          {Content ? (
            <MDXProvider>
              <Content />
            </MDXProvider>
          ) : (
            <p>Loading...</p>
          )}
        </main>

        <aside className="fixed top-[64px] right-0 w-1/5 border-l border-gray-200 p-4 h-[calc(100vh-56px)] bg-white">
          <h3 className="text-lg font-semibold mb-4">On This Page</h3>
          <ul className="space-y-2">
            <li>
              <a href="#section1" className="text-blue-500 hover:underline">
                Section 1
              </a>
            </li>
            <li>
              <a href="#section2" className="text-blue-500 hover:underline">
                Section 2
              </a>
            </li>
            <li>
              <a href="#section3" className="text-blue-500 hover:underline">
                Section 3
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Docs;
