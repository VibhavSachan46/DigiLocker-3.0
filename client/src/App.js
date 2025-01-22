import './App.css';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(providerInstance);

        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const signer = providerInstance.getSigner();
        const address = await signer.getAddress();

        setAccount(address);

        const contractAddress = "0xfBAe3BFf3Bd887e45CE1F9Aa4bABC65b73D0f65A";
        const contractInstance = new ethers.Contract(contractAddress, Upload.abi, signer);

        setContract(contractInstance);

        // Log connected account
        console.log("Connected account:", address);

        // Handle account or chain changes
        window.ethereum.on("accountsChanged", () => window.location.reload());
        window.ethereum.on("chainChanged", () => window.location.reload());
      } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask not installed. Please install it to connect your wallet.");
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setAccount('');
    setContract(null);
    setProvider(null);
    console.log("Wallet disconnected.");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between px-4 mt-10">
        {/* Button to Connect/Disconnect Wallet */}
        {account ? (
          <button
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        ) : (
          <button
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}

        {/* Heading in the Center */}
        <p
          className="text-5xl font-mono font-semibold text-gray-200 text-center absolute left-1/2 transform -translate-x-1/2"
          style={{ fontFamily: "cursive" }}
        >
          DigiLocker 3.0
        </p>
      </div>

      {/* Account Information */}
      {account && (
        <p className="flex justify-center text-2xl mt-8 text-gray-200">
          Account : <span className="text-2xl text-blue-500 ml-2">{account}</span>
        </p>
      )}

      {/* Main Content */}
      {account && (
        <div className="w-full px-4 mt-8">
          <FileUpload account={account} contract={contract} />
          <Display account={account} contract={contract} />
        </div>
      )}
    </div>

  );
}

export default App;
