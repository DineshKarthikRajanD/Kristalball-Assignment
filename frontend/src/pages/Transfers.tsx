import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 

interface Transfer {
  id: number;
  fromBase: string;
  toBase: string;
  equipmentType: string;
  quantity: number;
  timestamp: string;
}

const Transfers: React.FC = () => {
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromBase || !toBase || !equipmentType || quantity <= 0) return;

    const newTransfer: Transfer = {
      id: Date.now(),
      fromBase,
      toBase,
      equipmentType,
      quantity,
      timestamp: new Date().toLocaleString(),
    };

    setTransfers([newTransfer, ...transfers]);

    setFromBase("");
    setToBase("");
    setEquipmentType("");
    setQuantity(0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Asset Transfers</h1>

      <form
        onSubmit={handleTransfer}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block font-semibold text-gray-700">From Base</label>
          <input
            type="text"
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter source base"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">To Base</label>
          <input
            type="text"
            value={toBase}
            onChange={(e) => setToBase(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter destination base"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Equipment Type
          </label>
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            required
          >
            <option value="">Select equipment</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Weapons">Weapons</option>
            <option value="Ammunition">Ammunition</option>
            <option value="Supplies">Supplies</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter quantity"
            min={1}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" variant="default">
            Transfer Asset
          </Button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Transfer History</h2>
        {transfers.length === 0 ? (
          <p className="text-gray-500">No transfers recorded yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Timestamp</th>
                <th className="border p-2">From Base</th>
                <th className="border p-2">To Base</th>
                <th className="border p-2">Equipment Type</th>
                <th className="border p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id} className="text-center">
                  <td className="border p-2">{t.timestamp}</td>
                  <td className="border p-2">{t.fromBase}</td>
                  <td className="border p-2">{t.toBase}</td>
                  <td className="border p-2">{t.equipmentType}</td>
                  <td className="border p-2">{t.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transfers;
