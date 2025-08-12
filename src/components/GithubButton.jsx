import { Github } from "lucide-react";

export default function GithubButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-edge 
                 hover:bg-edge/40 dark:hover:bg-slate-700 dark:border-slate-700 
                 transition-colors cursor-pointer"
      title="View on GitHub"
    >
      <Github className="w-5 h-5 text-ink dark:text-slate-100" />
    </a>
  );
}
