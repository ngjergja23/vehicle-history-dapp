// src/components/RegisterVehicle.jsx
import { useState } from "react";
import { Car, ShieldAlert, CheckCircle } from 'lucide-react';


function RegisterVehicle({ contract }) {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!vin.trim()) {
      setMessage("❌ Please enter a VIN");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Check if vehicle already exists
      const owner = await contract.getOwner(vin);
      if (owner !== "0x0000000000000000000000000000000000000000") {
        setMessage(`❌ Failed! \n Vehicle already registered by ${owner.slice(0, 6)}...${owner.slice(-4)}`);
        setLoading(false);
        return;
      }

      // Register vehicle
      const tx = await contract.registerVehicle(vin);
      setMessage("⏳ Transaction pending...");

      await tx.wait();
      setMessage("✅ Vehicle registered successfully!");
      setVin("");

      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        <Car size={24} color="#2db8b8" style={{ marginRight: '8px', marginBottom: '20px' }}/>
        <h2> Register Vehicle</h2>
      </div>
      
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter VIN (e.g., 1HGBH41JXMN109186)"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          disabled={loading}
          className="input"
        />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Registering..." : "Register Vehicle"}
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default RegisterVehicle;