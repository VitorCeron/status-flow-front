import { Activity } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 text-text-primary hover:opacity-80 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand shadow-md">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">StatusFlow</span>
        </Link>

        {children}
      </div>
    </div>
  );
}
