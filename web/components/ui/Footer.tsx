import { IconHeartFilled } from '@tabler/icons-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-background text-base-content">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <IconHeartFilled className="inline-block h-4 w-4" />{' '}
                at Aleph Hackathon 2024
              </p>
            </div>
          </div>
        </ul>
      </div>
    </footer>
  );
}
