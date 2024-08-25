import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

// Mint addresses for BONK, WIF, and MAGAIBA
const BONK_MINT = new PublicKey('CCX7pj7HFEa2qAqVY7NDt2897Wmu2Z6kEcqD6VyhbPe2');
const WIF_MINT = new PublicKey('928Q4APBC146necHHtyHfDMwJSLwsJcQmhUdXSugZBAP');
const MAGAIBA_MINT = new PublicKey('C2vLAiWBNywkCttpfx58a6YmGjv39rvfN3F2YMfQjEc4'); 
export function useGetTokenBalances({ address }: { address: PublicKey }) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ['get-token-balances', { endpoint: connection.rpcEndpoint, address }],
    queryFn: async () => {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(address, {
        programId: TOKEN_PROGRAM_ID,
      });

      const balances = tokenAccounts.value.map((accountInfo) => {
        const accountData = accountInfo.account.data.parsed.info;
        const mintAddress = accountData.mint;
        const balance = accountData.tokenAmount.uiAmount;

        return {
          mintAddress,
          balance,
        };
      });

      // Filtrar solo BONK, WIF y MAGAIBA
      const filteredBalances = balances.filter((token) =>
        [BONK_MINT.toBase58(), WIF_MINT.toBase58(), MAGAIBA_MINT.toBase58()].includes(token.mintAddress)
      );

      return filteredBalances;
    },
  });
}
