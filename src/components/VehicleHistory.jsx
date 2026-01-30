// src/components/VehicleHistory.jsx
import { useState } from "react";
import { History, ShieldAlert, CheckCircle } from 'lucide-react';


function VehicleHistory({ contract }) {
  const [vin, setVin] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const loadHistory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setHistory([]);

    try {
      // Check if vehicle exists
      const owner = await contract.getOwner(vin);
      if (owner === "0x0000000000000000000000000000000000000000") {
        setMessage("❌ Vehicle not registered");
        setLoading(false);
        return;
      }

      // Get service history
      const services = await contract.getVehicleHistory(vin);

      if (services.length === 0) {
        setMessage("No service history found");
      } else {
        setHistory(services);

        // Get total cost
        const total = await contract.getTotalCost(vin);
        setTotalCost(Number(total));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="card-title">
        <History size={24} color="#2db8b8" style={{ marginRight: '8px', marginBottom: '20px' }}/>
        <h2> View Service History</h2>
      </div>
      
      <form onSubmit={loadHistory}>
        <input
          type="text"
          placeholder="Enter VIN to view history"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          disabled={loading}
          className="input"
        />
        <button type="submit" disabled={loading} className="btn-secondary">
          {loading ? "Loading..." : "Load History"}
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      {history.length > 0 && (
        <>
          <div className="stats">
            <div className="stat">
              <strong style={{ fontWeight: 100, fontSize: 16}}>Total Services:</strong> {history.length}
            </div>
            <div className="stat">
              <strong>Total Cost:</strong> ${totalCost}
            </div>
          </div>

          <div className="history-list">
            {history.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-header">
                  <h3>{service.serviceType}</h3>
                  <span className="service-id">#{Number(service.id)}</span>
                </div>
                <div className="service-details">
                  <p><strong>Date:</strong> {formatDate(service.date)}</p>
                  <p><strong>Mileage:</strong> {Number(service.mileage).toLocaleString()} km</p>
                  <p><strong>Cost:</strong> ${Number(service.cost)}</p>
                  <p><strong>Location:</strong> {service.location}</p>
                  <p><strong>Description:</strong> {service.description}</p>
                  <p className="service-footer">
                    Added by: {service.addedBy.slice(0, 6)}...{service.addedBy.slice(-4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VehicleHistory;