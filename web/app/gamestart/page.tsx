import Button from '@/components/ui/Button';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <section className="px-2 py-8 max-w-[425px] mx-auto h-full">
      <div className="flex flex-col gap-4 h-full">
        {/* <button className="inline-flex no-underline uppercase items-center justify-center font-medium whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:translate-y-[-0.1rem] hover:shadow-sm duration-400 ease-out rounded h-10 group w-fit px-8 py-2 text-xl transition sm:px-16 sm:py-8 sm:text-2xl">
          <span className="animate-super-pulse flex flex-row items-center transition duration-300 ease-in-out group-hover:text-green-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="mr-3 inline size-8 transition duration-300 ease-in-out iconify iconify--pixelarticons"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2z"
              ></path>
            </svg>
            Test Button
          </span>
        </button> */}
        <div className="flex flex-col justify-end h-full flex-grow">
          <div className="w-full flex items-center">
            <Link href={'/game'} className="mx-auto w-full">
              <Button>
                <IconPlayerPlayFilled /> Start Game
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
