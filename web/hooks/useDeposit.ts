import { useState, useCallback, FC } from 'react';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { createListTransaction } from '@/components/account/account-data-access';


// Program ID y Token Mint Address
const STAKING_PROGRAM_ID = new PublicKey('C5XKtCrPq3GmZKjUj4uVcHWAQgUZuQC9Pz3jjxd9Mt53');
const TOKEN_MINT = new PublicKey('CCX7pj7HFEa2qAqVY7NDt2897Wmu2Z6kEcqD6VyhbPe2');

// Hook personalizado para manejar el depósito de tokens
export function useDepositTokens() {
    const { publicKey, sendTransaction } = useWallet();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Función para manejar el depósito de tokens
    const depositTokens = useCallback(async (connection: Connection, amount: number) => {
        if (!publicKey) {
            setError("Wallet not connected");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Derivar la cuenta que se usará en 'list'
            const [listingAccount] = await PublicKey.findProgramAddress(
                [Buffer.from('list'), publicKey.toBuffer(), TOKEN_MINT.toBuffer()],
                STAKING_PROGRAM_ID
            );
            console.log({ listingAccount });

            // Crear la instrucción de transacción
            const instruction = new TransactionInstruction({
                keys: [
                    { pubkey: listingAccount, isSigner: false, isWritable: true }, // Cuenta derivada
                    { pubkey: publicKey, isSigner: true, isWritable: false }, // Clave pública del usuario
                    { pubkey: TOKEN_MINT, isSigner: false, isWritable: true }, // Mint del token
                ],
                programId: STAKING_PROGRAM_ID,
                data: Buffer.concat([
                    TOKEN_MINT.toBuffer(), // Dirección del token que se va a listar
                    Buffer.from(new Uint8Array(new BigUint64Array([BigInt(amount)]).buffer)) // Cantidad en buffer (u64)
                ]),
            });

            // Obtener el último blockhash y la altura del bloque válido
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

            // Crear la transacción
            const transaction = new Transaction().add(instruction);
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            // Enviar la transacción
            try {
                const signature = await sendTransaction(transaction, connection);
                const confirmation = await connection.confirmTransaction(
                    { signature, blockhash, lastValidBlockHeight },
                    'confirmed'
                );

                if (confirmation.value.err) {
                    throw new Error(`Transaction failed: ${confirmation.value.err}`);
                }

                setSuccess(true);
                console.log('Transaction successful with signature:', signature);
            } catch (er) {
                const error: Error = er as Error;
                console.log(error.message);
            }
        } catch (err) {
            console.error("Error executing list:", err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [publicKey, sendTransaction]);

    const transferSOL = useCallback(async (connection: Connection, receiver: PublicKey, amount: number) => {
      if (!publicKey) {
          setError("Wallet not connected");
          return;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
          // Crear la instrucción de transferencia
          const transferInstruction = SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: receiver,
              lamports: amount * LAMPORTS_PER_SOL, // Convertir la cantidad a lamports
          });

          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

          const transaction = new Transaction().add(transferInstruction);
          transaction.recentBlockhash = blockhash;
          // Enviar la transacción
          const signature = await sendTransaction(transaction, connection);
          const confirmation = await connection.confirmTransaction(
              { signature, blockhash, lastValidBlockHeight },
              'confirmed'
          );

          setSuccess(true);
          console.log('Transfer successful with signature:', signature);
          return signature;
      } catch (err) {
          console.error("Error transferring SOL:", err);
          setError((err as Error).message);
      } finally {
          setLoading(false);
      }
  }, [publicKey]);


  

    return { depositTokens, transferSOL, loading, error, success };
}



export function useCreateTransaction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<VersionedTransaction | null>(null);
  const [latestBlockhash, setLatestBlockhash] = useState<{ blockhash: string; lastValidBlockHeight: number } | null>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection()
  const createTransaction = async ({
    amount,
  }: {
    amount: number;
  }) => {
    setLoading(true);
    setError(null);
    setTransaction(null);
    setLatestBlockhash(null);


    try {
      // Obtén el último blockhash para usar en nuestra transacción
      const latestBlockhash = await connection.getLatestBlockhash();

      // Crea las instrucciones para enviar, en este caso una transferencia simple
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: STAKING_PROGRAM_ID,
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      ];

      // Crea un nuevo TransactionMessage con versión y compílalo al legado
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey!,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Crea una nueva VersionedTransaction que soporta legacy y v0
      const { transaction, latestBlockhash } = await createTransaction({
        publicKey: address,
        destination: input.destination,
        amount: input.amount,
        connection,
      });
      // Actualiza el estado con la transacción y el último blockhash
      setTransaction(transaction);
      setLatestBlockhash(latestBlockhash);
    } catch (err) {
      setError((err as Error).message || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return { createTransaction, transaction, latestBlockhash, loading, error };
}