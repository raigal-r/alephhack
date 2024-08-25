import './global.css';
import '../styles/animations.scss'
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { GameStageProvider } from '@/components/providers/GameStageProvider';

export const metadata = {
  title: 'Meme Wars',
  description: 'Degen vs Regen',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
  { label: 'Game', path: '/game' },
  { label: 'Start Game', path: '/gamestart' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-white" lang="en">
      <body >
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <GameStageProvider>
                <UiLayout links={links}>{children}</UiLayout>
              </GameStageProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
