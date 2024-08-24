import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { ClusterUiSelect } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { usePathname } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { IconMenu2 } from '@tabler/icons-react';

type Props = {
  links: { label: string; path: string }[];
};

export default function NavBar({ links }: Props) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );

  return (
    <header className="navbar bg-background text-neutral-content flex-row">
      <div className="w-auto navbar-start lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`btn btn-ghost ${
              isDrawerOpen
                ? 'hover:bg-background-light'
                : 'hover:bg-transparent'
            }`}
            onClick={() => {
              setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
            }}
          >
            <IconMenu2 className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-background rounded-box w-52 z-10"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={pathname.startsWith(path) ? 'active' : ''}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link
          className="hidden lg:flex btn btn-ghost normal-case text-xl"
          href="/"
        >
          Home
        </Link>
        <ul className="hidden lg:flex menu menu-horizontal px-1 ">
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link
                className={pathname.startsWith(path) ? 'active' : ''}
                href={path}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow navbar-end flex gap-2">
        <WalletButton />
        <ClusterUiSelect />
      </div>
    </header>
  );
}
