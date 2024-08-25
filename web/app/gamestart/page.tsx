import Button from '@/components/ui/Button';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <section className="px-2 py-8 max-w-[425px] mx-auto h-full">
      <div className="flex flex-col gap-4 h-full">
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
