import { useState } from "react";

interface Purchase {
  id: number;
  base: string;
  equipment: string;
  qty: number;
  date: string;
}

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: 1, base: "Base Alpha", equipment: "Rifles", qty: 100, date: "2025-08-01" },
    { id: 2, base: "Base Bravo", equipment: "Tanks", qty: 5, date: "2025-08-05" },
  ]);

  const [filters, setFilters] = useState({ date: "", equipment: "All" });

  const [form, setForm] = useState({
    base: "",
    equipment: "",
    qty: "",
    date: "",
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new purchase
  const handleAddPurchase = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.base || !form.equipment || !form.qty || !form.date) {
      alert("Please fill in all fields");
      return;
    }

    const newPurchase: Purchase = {
      id: purchases.length + 1,
      base: form.base,
      equipment: form.equipment,
      qty: Number(form.qty),
      date: form.date,
    };

    setPurchases([...purchases, newPurchase]);
    setForm({ base: "", equipment: "", qty: "", date: "" });
  };

  // Filter logic
  const filteredPurchases = purchases.filter((p) => {
    const matchDate = filters.date ? p.date === filters.date : true;
    const matchEquipment =
      filters.equipment === "All" ? true : p.equipment === filters.equipment;
    return matchDate && matchEquipment;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchases</h1>

      {/* --- Add Purchase Form --- */}
      <form
        onSubmit={handleAddPurchase}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <h2 className="text-lg font-semibold mb-2">Record New Purchase</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="base"
            placeholder="Base Name"
            value={form.base}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <select
            name="equipment"
            value={form.equipment}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Equipment</option>
            <option value="Rifles">Rifles</option>
            <option value="Tanks">Tanks</option>
            <option value="Ammunition">Ammunition</option>
            <option value="Vehicles">Vehicles</option>
          </select>

          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={form.qty}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Purchase
        </button>
      </form>

      {/* --- Filters --- */}
      <div className="flex space-x-4 mb-6">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />

        <select
          value={filters.equipment}
          onChange={(e) => setFilters({ ...filters, equipment: e.target.value })}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All Equipment</option>
          <option value="Rifles">Rifles</option>
          <option value="Tanks">Tanks</option>
          <option value="Ammunition">Ammunition</option>
          <option value="Vehicles">Vehicles</option>
        </select>
      </div>

      {/* --- Purchases Table --- */}
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Base</th>
            <th className="p-3">Equipment</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.length > 0 ? (
            filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="border-t">
                <td className="p-3">{purchase.base}</td>
                <td className="p-3">{purchase.equipment}</td>
                <td className="p-3">{purchase.qty}</td>
                <td className="p-3">{purchase.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No purchases found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
