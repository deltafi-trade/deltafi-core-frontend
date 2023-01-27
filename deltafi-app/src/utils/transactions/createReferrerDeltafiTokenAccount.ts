import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { deployConfig } from "constants/deployConfig";
import { createTokenAccountTransaction, signTransaction } from ".";

export async function createReferrerDeltafiTokenAccount({
  connection,
  walletPubkey,
}: {
  connection: Connection;
  walletPubkey: PublicKey;
}) {
  console.info(deployConfig.deltafiTokenMint);
  const transaction: Transaction = (
    await createTokenAccountTransaction({
      walletPubkey,
      mintPublicKey: new PublicKey(deployConfig.deltafiTokenMint),
    })
  ).transaction;

  return signTransaction({
    transaction,
    feePayer: walletPubkey,
    signers: [],
    connection,
  });
}
