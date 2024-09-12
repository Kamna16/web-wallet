import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const addWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = Buffer.from(keypair.secretKey).toString("hex");

        setWallets([...wallets, { publicKey, privateKey }]);
        setCurrentIndex(currentIndex + 1);
    };

    const deleteWallet = (index) => {
        setWallets(wallets.filter((_, i) => i !== index));
    };

    return (
        <div className="p-5 bg-gray-100">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={addWallet}
            >
                Add Solana Wallet
            </button>

            {wallets.length > 0 && (
                <div>
                    {wallets.map((wallet, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 bg-white shadow-md rounded-lg"
                        >
                            <p className="font-bold text-gray-700">Wallet {index + 1}</p>
                            <p className="text-green-600">
                                <strong>Public Key:</strong> {wallet.publicKey}
                            </p>
                            <p className="text-red-600">
                                <strong>Private Key:</strong> {wallet.privateKey}
                            </p>
                            <button
                                className="bg-red-500 text-white py-1 px-3 mt-2 rounded"
                                onClick={() => deleteWallet(index)}
                            >
                                Delete Wallet
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
