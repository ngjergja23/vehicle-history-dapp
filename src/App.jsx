import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contracts/VehicleHistory";
import RegisterVehicle from "./components/RegisterVehicle";
import AddService from "./components/AddService";
import VehicleHistory from "./components/VehicleHistory";
import { Car, Wallet, Loader2, CheckCircle, ShieldAlert } from 'lucide-react';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const connectWallet = async () => {
    setLoading(true);
    setMessageType("pending");
    setMessage("Initializing connection...");

    try {
      if (!window.ethereum) {
        // alert("Please install MetaMask!");
        setMessageType("error");
        setMessage("Please install MetaMask!");
        setLoading(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Update state
      setAccount(accounts[0]);
      setContract(contractInstance);

      setMessageType("success");
      setMessage("Wallet connected successfully!");
      setTimeout(() => setMessage(""), 5000);

      console.log("✅ Wallet connected:", accounts[0]);
      console.log("✅ Contract loaded:", CONTRACT_ADDRESS);
      console.log("Provider:", provider);

    } catch (error) {
      console.error("Connection error:", error);
      
      if (error.code === 4001) {
        setMessageType("error");
        setMessage("Connection rejected");
      } else {
        setMessageType("error");
        setMessage("Failed to connect wallet. Check MetaMask.");
      }
     } finally {
      setLoading(false);
    }

  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>
          <Car size={48} color="#2db8b8" className="header-icon" /> 
          VehicleChain
        </h1>
        <p>Blockchain-based vehicle service tracking</p>
      </header>

      {!account ? (
        <div className="connect-section">
          <button onClick={connectWallet} className="connect-btn" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Wallet size={20} className="wallet-icon"/>
            )}
            <span>{loading ? "Connecting..." : "Connect Wallet"}</span>
          </button>

          <p className="instruction">Connect your MetaMask wallet to get started</p>

          {message && (
            <div className={`message ${messageType}`}>
              {messageType === "pending" && <Loader2 size={20} className="animate-spin" />}
              {messageType === "error" && <ShieldAlert size={20} />}
              {messageType === "success" && <CheckCircle size={20} />}
              <span>{message}</span>
            </div>
          )}

        </div>
      ) : (
        <>
          <div className="wallet-info">
            <p>
              <CheckCircle size={18} color="#2db8b8" style={{ verticalAlign: 'middle', marginRight: '10px', marginBottom: '5px' }} />
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <button onClick={() => { setAccount(null); setMessage(""); setMessageType(""); }} className="disconnect-btn">
              Disconnect
            </button>
          </div>

          <div className="main-content">
            <RegisterVehicle contract={contract} />
            <AddService contract={contract} />
            <VehicleHistory contract={contract} />
          </div>
        </>
      )}

      <footer className="app-footer">
        <p>Contract: {CONTRACT_ADDRESS}</p>
        <p>Network: Sepolia Testnet - ChainId = 11155111</p>
        <p>Network: {window.ethereum ? window.ethereum.networkVersion : "unknown"}</p>
      </footer>
    </div>
  );
}

export default App;