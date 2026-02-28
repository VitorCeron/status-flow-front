import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-8 text-text-primary'>
          <div className="flex h-9 w-9 items-center justify-center">
             <Image
              src="/images/logo.png"
              className='rounded'
              alt="Logo"
              width={40}
              height={40}
              />
          </div>
          <span className="text-xl font-bold">StatusFlow</span>
        </div>

        {children}
      </div>
    </div>
  );
}
