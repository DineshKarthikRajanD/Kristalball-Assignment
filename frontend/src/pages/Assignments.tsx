import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Assignments() {
  const [personnel, setPersonnel] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");

  const [expendedEquipment, setExpendedEquipment] = useState("");
  const [expendedQty, setExpendedQty] = useState<number | "">("");

  const [assignments, setAssignments] = useState<
    { personnel: string; equipment: string; quantity: number; date: string }[]
  >([]);
  const [expenditures, setExpenditures] = useState<
    { equipment: string; quantity: number; date: string }[]
  >([]);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (personnel && equipmentType && quantity) {
      setAssignments([
        ...assignments,
        {
          personnel,
          equipment: equipmentType,
          quantity: Number(quantity),
          date: new Date().toLocaleDateString(),
        },
      ]);
      setPersonnel("");
      setEquipmentType("");
      setQuantity("");
    }
  };

  const handleExpenditure = (e: React.FormEvent) => {
    e.preventDefault();
    if (expendedEquipment && expendedQty) {
      setExpenditures([
        ...expenditures,
        {
          equipment: expendedEquipment,
          quantity: Number(expendedQty),
          date: new Date().toLocaleDateString(),
        },
      ]);
      setExpendedEquipment("");
      setExpendedQty("");
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Asset Assignments</h2>
        <form
          onSubmit={handleAssign}
          className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Personnel Name"
              value={personnel}
              onChange={(e) => setPersonnel(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Equipment</option>
              <option value="Rifles">Rifles</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Ammo">Ammo</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value ? Number(e.target.value) : "")
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <Button type="submit" variant="default">
            Assign Asset
          </Button>
        </form>

        <h3 className="text-lg font-semibold mb-2">Assignment History</h3>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Personnel</th>
              <th className="border px-4 py-2">Equipment</th>
              <th className="border px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{a.date}</td>
                <td className="border px-4 py-2">{a.personnel}</td>
                <td className="border px-4 py-2">{a.equipment}</td>
                <td className="border px-4 py-2">{a.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Asset Expenditures</h2>
        <form
          onSubmit={handleExpenditure}
          className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={expendedEquipment}
              onChange={(e) => setExpendedEquipment(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Equipment</option>
              <option value="Ammo">Ammo</option>
              <option value="Fuel">Fuel</option>
              <option value="Supplies">Supplies</option>
            </select>
            <input
              type="number"
              placeholder="Quantity Expended"
              value={expendedQty}
              onChange={(e) =>
                setExpendedQty(e.target.value ? Number(e.target.value) : "")
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <Button type="submit" variant="destructive">
            Record Expenditure
          </Button>
        </form>

        <h3 className="text-lg font-semibold mb-2">Expenditure History</h3>
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Equipment</th>
              <th className="border px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((e, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{e.date}</td>
                <td className="border px-4 py-2">{e.equipment}</td>
                <td className="border px-4 py-2">{e.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
