'use client';
import * as React from 'react';
import Image from 'next/image';

export function Avatar({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  // wrapper harus relative untuk <Image fill />
  return (
    <div className={`relative h-28 w-28 overflow-hidden rounded-full bg-slate-100 text-slate-500 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
  // ✅ fill boolean (tanpa string)
  return <Image src={src} alt={alt} fill className="object-cover" sizes="112px" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="grid h-full w-full place-items-center">{children}</div>;
}
