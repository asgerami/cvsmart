import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden py-2 px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-md space-y-2 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-fuchsia-400 text-transparent bg-clip-text">
            {title}
          </h1>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1.5" />
            <span>Secure Authentication</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-xl">
          {children}
        </div>

        <div className="text-center text-white/50 text-xs">
          <p>ResumeFlow AI © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
