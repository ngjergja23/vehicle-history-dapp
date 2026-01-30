// src/App.jsx
import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contracts/VehicleHistory";
import RegisterVehicle from "./components/RegisterVehicle";
import AddService from "./components/AddService";
import VehicleHistory from "./components/VehicleHistory";
import { Car, Wallet, History, ShieldAlert, CheckCircle } from 'lucide-react';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
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

      console.log("✅ Wallet connected:", accounts[0]);
      console.log("✅ Contract loaded:", CONTRACT_ADDRESS);
      console.log("Provider:", provider);

    } catch (error) {
      console.error("Connection error:", error);
      
      if (error.code === 4001) {
        alert("Connection rejected");
      } else {
        alert("Failed to connect wallet");
      }
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
          <button onClick={connectWallet} className="connect-btn ">
            <Wallet size={20} className="wallet-icon"/>
            Connect Wallet
          </button>
          <p className="instruction">Connect your MetaMask wallet to get started</p>
        </div>
      ) : (
        <>
          <div className="wallet-info">
            <p>
              <CheckCircle size={18} color="#2db8b8" style={{ verticalAlign: 'middle', marginRight: '10px', marginBottom: '5px' }} />
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <button onClick={() => setAccount(null)} className="disconnect-btn">
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