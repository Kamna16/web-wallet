import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const addEthWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        const publicKey = wallet.address;

        setWallets([...wallets, { publicKey, privateKey }]);
        setCurrentIndex(currentIndex + 1);
    };

    const deleteEthWallet = (index) => {
        setWallets(wallets.filter((_, i) => i !== index));
    };

    return (
        <div className="p-5 ">
            <button
                className="border text-white py-2 px-4 rounded mb-4"
                onClick={addEthWallet}
            >
                Add Ethereum Wallet
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
                                className="bg-yellow-500 text-white py-1 px-3 mt-2 rounded"
                                onClick={() => deleteEthWallet(index)}
                            >
                                Delete Wallet
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
