import { useState } from "react";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
import "./App.css";

function App() {
    const [mnemonic, setMnemonic] = useState("");

    const generateMnemonic = async () => {
        const bip39 = await import("bip39");
        const mn = await bip39.generateMnemonic();
        setMnemonic(mn);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-center mb-6">Web-Based Crypto Wallet</h1>

            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={generateMnemonic}
            >
                Create Seed Phrase
            </button>

            <input
                type="text"
                value={mnemonic}
                readOnly
                className="block w-full p-2 mb-4 border rounded"
                placeholder="Seed Phrase will appear here..."
            />

            {mnemonic && (
                <>
                    <SolanaWallet mnemonic={mnemonic} />
                    <EthWallet mnemonic={mnemonic} />
                </>
            )}
        </div>
    );
}

export default App;
