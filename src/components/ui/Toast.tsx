'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#1A1A1A] group-[.toaster]:border-[#E5E7EB] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-500',
          actionButton:
            'group-[.toast]:bg-[#2D6A4F] group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
