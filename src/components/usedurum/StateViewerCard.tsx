import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  docco,
  tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getLogs } from "../../library/src";
import { useTheme } from "../../stores/useTheme";

const StateViewerCard: React.FC = () => {
  const logs = getLogs();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card
      className={`shadow border ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Store Durumu</span>
        </CardTitle>
        <CardDescription
          className={`text-sm mt-2 ${isDark ? "text-white/95" : "text-black"}`}
        >
          Global state verilerini JSON formatında inceleyin ve yönetin.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 shadow-inner max-h-96 overflow-y-auto">
        {Object.keys(logs).length > 0 ? (
          <SyntaxHighlighter
            language="json"
            style={isDark ? tomorrowNight : docco}
            className="rounded bg-gray-100 p-4  text-white overflow-x-auto"
          >
            {JSON.stringify(logs, null, 2)}
          </SyntaxHighlighter>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg font-medium italic text-gray-500 dark:text-gray-400">
              Henüz bir store durumu mevcut değil.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <p
          className={`text-center text-sm ${
            !isDark ? "text-gray-500" : "text-white"
          } italic`}
        >
          Toplam Store: {Object.keys(logs).length}
        </p>
      </CardFooter>
    </Card>
  );
};

export default StateViewerCard;
