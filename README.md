# VehicleChain 

**Blockchain-based Vehicle Service Tracking System**

VehicleChain is a decentralized application (dApp) built on the Ethereum (Sepolia) testnet. It provides a tamper-proof record of vehicle maintenance and mileage, preventing odometer fraud and ensuring transparency for used car buyers.

<img width="603" height="605" alt="image" src="https://github.com/user-attachments/assets/6d12efb9-21dd-4c34-ae1d-af1eacdd7e72" />

## ✨ Key Features (MVP)
- **Decentralized Logging:** Service records are stored on the Sepolia Testnet.
- **Odometer Fraud Prevention:** Smart contract logic rejects any entry where the mileage is lower than the previous record.
- **Public Verification:** Anyone with a VIN can query the blockchain to see the full service history of a vehicle.
- **Role-Based Access:** Only authorized mechanic wallets can add new records (simulated for PoC).

## 🛠️ Tech Stack
- **Smart Contract:** Solidity
- **Blockchain:** Ethereum Sepolia Testnet
- **Library:** ethers.js, Lucide React (UI)
- **Frontend:** React.js (Vite)
- **Wallet:** MetaMask

## 🚀 Getting Started

  ### Prerequisites
  
  - Node.js installed
  - MetaMask browser extension
  - Some Sepolia Test ETH (from a faucet) - e.g. [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)


  1. **Clone the repo:**
   ```bash
   git clone https://github.com/ngjergja23/vehicle-history-dapp
   cd vehicle-history-dapp
   ```
  2. **Install dependencies:**
   ```bash
   npm install
   ```
  3. **Run the app:** (development server)
   ```bash
   npm run dev
   ```

## 🛡️ Future Roadmap
- **IPFS Integration:** Store high-resolution photos of repair receipts.
- **NFT Passports:** Mint an ERC-721 token for every vehicle.
- **IoT Integration:** Connect directly to OBD-II scanners to automate data entry.

