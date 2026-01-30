// src/components/AddService.jsx
import { useState } from "react";
import { Wrench, ShieldAlert, CheckCircle2, Loader2} from 'lucide-react';


function AddService({ contract }) {
  const [formData, setFormData] = useState({
    vin: "",
    serviceType: "",
    date: "",
    mileage: "",
    cost: "",
    location: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", ili "pending"  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // Convert date to Unix timestamp
      const dateTimestamp = Math.floor(new Date(formData.date).getTime() / 1000);

      // Check mileage validation
      const isValid = await contract.verifyMileage(formData.vin, formData.mileage);
      if (!isValid) {
        setMessageType("error");
        setMessage("Mileage cannot be less than previous service");
        setLoading(false);
        return;
      }

      // Add service
      const tx = await contract.addService(
        formData.vin,
        formData.serviceType,
        dateTimestamp,
        formData.mileage,
        formData.cost,
        formData.location,
        formData.description
      );
      setMessageType("pending");
      setMessage("Transaction pending...");

      await tx.wait();
      setMessageType("success");
      setMessage("Service added successfully!");

      // Reset form
      setFormData({
        vin: "",
        serviceType: "",
        date: "",
        mileage: "",
        cost: "",
        location: "",
        description: ""
      });

      setTimeout(() => setMessage(""), 5000);

    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setMessage("Error: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        <Wrench size={24} color="#2db8b8" style={{ marginRight: '8px', marginBottom: '20px' }}/>
        <h2>Add Service Record</h2>
      </div>
      <form onSubmit={handleSubmit} className="service-form">
        <input
          type="text"
          name="vin"
          placeholder="VIN"
          value={formData.vin}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="text"
          name="serviceType"
          placeholder="Service Type (e.g., Oil Change)"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input"
          rows="3"
        />

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>

      {message && (
        <div className={`message ${messageType}`}>
          {messageType === "pending" && <Loader2 size={20} className="animate-spin" />}
          {messageType === "error" && <ShieldAlert size={20} />}
          {messageType === "success" && <CheckCircle2 size={20} />}    
          <span>{message}</span>
        </div>
      )}
      
    </div>
  );
}

export default AddService;