import "./App.css";
import { useState } from "react";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const generateMnemonic = async () => {
    const bip39 = await import("bip39");
    const mn = await bip39.generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div className="p-10 text-white ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center  mb-6">
          Web-Based Wallet
        </h1>

        <button
          className="text-white mb-4 rounded p-2 bg-yellow-500"
          onClick={generateMnemonic}
        >
          Create Seed Phrase
        </button>

        <input
          type="text"
          value={mnemonic}
          readOnly
          className="block text-black text-2xl text-semibold  w-full p-2 mb-4 border rounded"
          placeholder="Seed Phrase will appear here..."
        />
      </div>

      {mnemonic && (
        <div className="bg-gray-900 mb-2">
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </div>
      )}
    </div>
  );
}

export default App;
