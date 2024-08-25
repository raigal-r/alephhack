// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { GameBattle } from "../target/types/game_battle";
// import { Connection } from "@solana/web3.js";
// import {createMint, TOKEN_PROGRAM_ID} from "@solana/spl-token";
// import { Keypair } from "@solana/web3.js";
// import { PublicKey } from "@solana/web3.js";
// import { SystemProgram } from "@solana/web3.js"; // Add this import



// describe("game-battle", () => {
//   // Configure the client to use the local cluster.
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);
//   const payer = provider.wallet as anchor.Wallet;

//   const connection = new Connection("http://127.0.0.1:8899", "confirmed");

//   const program = anchor.workspace.GameBattle as Program<GameBattle>;

//   const mintKeypair = Keypair.fromSecretKey(new Uint8Array([
//     114, 129, 162, 171, 175,   4,  71, 133,  44, 175,   0,
//      24, 214,  96,   4,  12, 114, 184,  92,  63, 156,  30,
//     197, 251, 146, 206, 158,  55,  75, 112,  64, 105, 157,
//     240,  42,  97, 140, 185, 211,  90, 189, 157, 172, 204,
//      35, 219,   8, 158,  10, 125,  97,  91, 103, 102,  36,
//     127,  91,  76, 114,   6, 127, 179, 202, 227
//   ]));

//   async function createMintToken(){
    
//     const mint = await createMint(
//       connection,
//       payer.payer,
//       payer.publicKey,
//       payer.publicKey,
//       9, 
//       mintKeypair
//     )
//     console.log("createMint: ", mint);
//   }

//   // PDA for the marketplace data account
//   let [marketplace] = PublicKey.findProgramAddressSync(
//         [Buffer.from("vault")], // Include payer's public key as a seed if needed
//         program.programId
//   )
//   const admin = payer; // Your admin keypair


//   // PDA for the synthetic token mint
//   let [rewardsMint] = PublicKey.findProgramAddressSync(
//     [Buffer.from("synthetic_token")], // Include payer's public key as a seed if needed
//     program.programId
//   )

//    // PDA for the game data account
//    let [treasury] = PublicKey.findProgramAddressSync(
//     [Buffer.from("treasury")], // Include payer's public key as a seed if needed
//     program.programId
//   )


//   it("Is initialized!", async () => {
//     // Add your test here.

//     //const tx = await program.methods.initialize("yourName", 100).rpc();

//     const tx = await program.methods
//     .initialize(new anchor.BN(30000000), 0,"Battle Royale",5)
//     .accountsPartial({
//       marketplace: marketplace,
//       admin: admin.publicKey,
//       rewardsMint: rewardsMint,
//       treasury:treasury,
//       tokenProgram: TOKEN_PROGRAM_ID,
//       systemProgram: SystemProgram.programId,
    
//     })
//     .rpc();
//       console.log("tx", tx);


//     console.log("Your transaction signature", tx);
//   });

//   // //const mintKeypair = Keypair.generate();
//   // const mintKeypair = Keypair.fromSecretKey(new Uint8Array([
//   //   114, 129, 162, 171, 175,   4,  71, 133,  44, 175,   0,
//   //    24, 214,  96,   4,  12, 114, 184,  92,  63, 156,  30,
//   //   197, 251, 146, 206, 158,  55,  75, 112,  64, 105, 157,
//   //   240,  42,  97, 140, 185, 211,  90, 189, 157, 172, 204,
//   //    35, 219,   8, 158,  10, 125,  97,  91, 103, 102,  36,
//   //   127,  91,  76, 114,   6, 127, 179, 202, 227
//   // ]));
//   // console.log("mintKeypair", mintKeypair)

//   // async function createMintToken(){
    
//   //   const mint = await createMint(
//   //     connection,
//   //     payer.payer,
//   //     payer.publicKey,
//   //     payer.publicKey,
//   //     9, 
//   //     mintKeypair
//   //   )
//   //   console.log("mint", mint);
//   // }

//   // it("Is initialized!", async () => {
//   //   // Add your test here.
//   //   //await createMintToken;


//   //   let [vaultAccount] = PublicKey.findProgramAddressSync(
//   //     [Buffer.from("vault")], // Include payer's public key as a seed if needed
//   //     program.programId
//   //   )
    
//   //   console.log("vaultAccount", vaultAccount.toString());
//   //   console.log("signer", payer.publicKey.toString())
//   //   console.log("minter", mintKeypair.publicKey.toString())


//   //   const tx = await program.methods.initialize()
//   //     .accountsPartial({
//   //       signer: payer.publicKey,
//   //       tokenVaultAccount: vaultAccount, // Updated to match the expected property name
//   //       mint: mintKeypair.publicKey
//   //     })
//   //     .rpc();
//   //   console.log("tx", tx);

//   //   console.log("Your transaction signature", tx);
//   // });
// });

