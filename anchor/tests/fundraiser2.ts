import * as anchor from '@coral-xyz/anchor';
import type { Program } from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createMint,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';
import type { GameBattle } from '../target/types/game_battle';
import { Keypair } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js"; // Add this import





describe('game-battle', () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    //const payer = provider.wallet as anchor.Wallet;
    const connection = new Connection("http://127.0.0.1:8899", "confirmed");

    const program = anchor.workspace.GameBattle as Program<GameBattle>;
    const mintKeypair = Keypair.fromSecretKey(new Uint8Array([
        114, 129, 162, 171, 175,   4,  71, 133,  44, 175,   0,
        24, 214,  96,   4,  12, 114, 184,  92,  63, 156,  30,
        197, 251, 146, 206, 158,  55,  75, 112,  64, 105, 157,
        240,  42,  97, 140, 185, 211,  90, 189, 157, 172, 204,
        35, 219,   8, 158,  10, 125,  97,  91, 103, 102,  36,
        127,  91,  76, 114,   6, 127, 179, 202, 227
    ]));
    const payer = mintKeypair;


    async function createMintToken(){
    
        const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        9, 
        mintKeypair
        )
        console.log("createMint: ", mint);
    }

    // PDA for the marketplace data account
    let [marketplace] = PublicKey.findProgramAddressSync(
            [Buffer.from("vault")], // Include payer's public key as a seed if needed
            program.programId
    )
    const admin = payer; // Your admin keypair


    // PDA for the synthetic token mint
    let [rewardsMint] = PublicKey.findProgramAddressSync(
        [Buffer.from("synthetic_token")], // Include payer's public key as a seed if needed
        program.programId
    )

    // PDA for the game data account
    let [treasury] = PublicKey.findProgramAddressSync(
        [Buffer.from("treasury")], // Include payer's public key as a seed if needed
        program.programId
    )

    const maker = anchor.web3.Keypair.generate();

    let mint: anchor.web3.PublicKey;

    let contributorATA: anchor.web3.PublicKey;

    let makerATA: anchor.web3.PublicKey;

    const fundraiser = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('fundraiser'), maker.publicKey.toBuffer()], 
        program.programId)[0];


    // const fundraiser = PublicKey.findProgramAddressSync(
    //     [Buffer.from("fundraiser")], // Include payer's public key as a seed if needed
    //     program.programId
    // )
    // const contributor = anchor.web3.PublicKey.findProgramAddressSync(
    //     [Buffer.from('contributor')],
    //     program.programId,
    // )[0];

    const contributor = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('contributor'), fundraiser.toBuffer(), provider.publicKey.toBuffer()],
        program.programId,
      )[0];

    const confirm = async (signature: string): Promise<string> => {
        const block = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
        signature,
        ...block,
    });
    return signature;
    };



  it('Test Preparation', async () => {
    const airdrop = await connection.requestAirdrop(fundraiser, 1 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log('\nAirdropped 1 SOL to maker', airdrop);

    const airdrop3 = await connection.requestAirdrop(mintKeypair.publicKey, 1 * anchor.web3.LAMPORTS_PER_SOL).then(confirm);
    console.log('\nAirdropped 10 SOL to maker', airdrop3);

    mint = await createMint(connection, mintKeypair, mintKeypair.publicKey, mintKeypair.publicKey, 6);
    console.log('Mint created', mint.toBase58());

    contributorATA = (await getOrCreateAssociatedTokenAccount(connection, mintKeypair, mint, mintKeypair.publicKey)).address;
    console.log("contributorATA:", contributorATA);

    makerATA = (await getOrCreateAssociatedTokenAccount(connection, mintKeypair, mint, mintKeypair.publicKey)).address;
    console.log("makerATA:", makerATA)
    
    const mintTx = await mintTo(connection, mintKeypair, mint, contributorATA, mintKeypair.publicKey, 1_000_000_0);
    console.log('Minted 10 tokens to contributor', mintTx);
  });

  it('Initialize GameBattle', async () => {
    const vault = getAssociatedTokenAddressSync(mint, mintKeypair.publicKey, true);

    const tx = await program.methods
      .initialize(new anchor.BN(30000000), 0,"Battle Royale",5)
      .accountsPartial({
        marketplace: marketplace,
        admin: admin.publicKey,
        rewardsMint: rewardsMint,
        treasury:treasury,
        tokenProgram: TOKEN_PROGRAM_ID,
        fundraiser: mintKeypair.publicKey,
        mintToRaise: mint,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([mintKeypair])
      .rpc()
      .then(confirm);

    console.log('\nInitialized fundraiser Account');
    console.log('Your transaction signature', tx);
  });

//   it('Contribute to Fundraiser', async () => {
//     const vault = getAssociatedTokenAddressSync(mint, mintKeypair.publicKey, true);

//     const tx = await program.methods
//       .contribute(new anchor.BN(1000000))
//       .accountsPartial({
//         contributor: mintKeypair.publicKey,
//         fundraiser: mintKeypair.publicKey,
//         contributorAccount: mintKeypair.publicKey,
//         contributorAta: contributorATA,
//         vault,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       })
//       .rpc()
//       .then(confirm);

//     console.log('\nContributed to fundraiser', tx);
//     console.log('Your transaction signature', tx);
//     console.log('Vault balance', (await connection.getTokenAccountBalance(vault)).value.amount);

//     const contributorAccount = await program.account.contributor.fetch(mintKeypair.publicKey);
//     console.log('Contributor balance', contributorAccount.amount.toString());
//   });

//   it('Contribute to Fundraiser', async () => {
//     const vault = getAssociatedTokenAddressSync(mint, mintKeypair.publicKey, true);

//     const tx = await program.methods
//       .contribute(new anchor.BN(1000000))
//       .accountsPartial({
//         contributor: mintKeypair.publicKey,
//         fundraiser: mintKeypair.publicKey,
//         contributorAccount: mintKeypair.publicKey,
//         contributorAta: contributorATA,
//         vault,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       })
//       .rpc()
//       .then(confirm);

//     console.log('\nContributed to fundraiser', tx);
//     console.log('Your transaction signature', tx);
//     console.log('Vault balance', (await connection.getTokenAccountBalance(vault)).value.amount);

//     const contributorAccount = await program.account.contributor.fetch(mintKeypair.publicKey);
//     console.log('Contributor balance', contributorAccount.amount.toString());
//   });

//   it('Contribute to Fundraiser - Robustness Test', async () => {
//     try {
//       const vault = getAssociatedTokenAddressSync(mint, fundraiser, true);

//       const tx = await program.methods
//         .contribute(new anchor.BN(2000000))
//         .accountsPartial({
//           contributor: mintKeypair.publicKey,
//           fundraiser,
//           contributorAccount: contributor,
//           contributorAta: contributorATA,
//           vault,
//           tokenProgram: TOKEN_PROGRAM_ID,

//         })
//         .rpc()
//         .then(confirm);

//       console.log('\nContributed to fundraiser', tx);
//       console.log('Your transaction signature', tx);
//       console.log('Vault balance', (await connection.getTokenAccountBalance(vault)).value.amount);
//     } catch (error) {
//       console.log('\nError contributing to fundraiser');
//       console.log(error.msg);
//     }
//   });

//   it('Check contributions - Robustness Test', async () => {
//     try {
//       const vault = getAssociatedTokenAddressSync(mint, fundraiser, true);

//       const tx = await program.methods
//         .checkContributions()
//         .accountsPartial({
//           maker: mintKeypair.publicKey,
//           mintToRaise: mint,
//           fundraiser,
//           makerAta: makerATA,
//           vault,
//           tokenProgram: TOKEN_PROGRAM_ID,
//         })
//         .signers([mintKeypair])
//         .rpc()
//         .then(confirm);

//       console.log('\nChecked contributions');
//       console.log('Your transaction signature', tx);
//       console.log('Vault balance', (await connection.getTokenAccountBalance(vault)).value.amount);
//     } catch (error) {
//       console.log('\nError checking contributions');
//       console.log(error.msg);
//     }
//   });

//   it('Refund Contributions', async () => {
//     const vault = getAssociatedTokenAddressSync(mint, fundraiser, true);

//     const contributorAccount = await program.account.contributor.fetch(contributor);
//     console.log('\nContributor balance', contributorAccount.amount.toString());

//     const tx = await program.methods
//       .refund()
//       .accountsPartial({
//         contributor: mintKeypair.publicKey,
//         maker: mintKeypair.publicKey,
//         mintToRaise: mint,
//         fundraiser,
//         contributorAccount: contributor,
//         contributorAta: contributorATA,
//         vault,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .rpc()
//       .then(confirm);

//     console.log('\nRefunded contributions', tx);
//     console.log('Your transaction signature', tx);
//     console.log('Vault balance', (await connection.getTokenAccountBalance(vault)).value.amount);
//   });
 });