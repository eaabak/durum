import { Language, PrismTheme, themes, Highlight } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: Language;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
}) => (
  <Highlight
    code={code.trim()}
    language={language}
    theme={themes.vsDark as PrismTheme}
  >
    {({ tokens, getLineProps, getTokenProps }) => (
      <pre
        style={{
          backgroundColor: "#2d2d2d",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default CodeBlock;
