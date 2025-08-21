// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard: React.FC = () => {
  // Filters
  const [filters, setFilters] = useState({
    date: "",
    base: "",
    equipmentType: "",
  });

  // Sample Data
  const data = [
    { name: "Purchases", value: 120 },
    { name: "Transfers In", value: 80 },
    { name: "Transfers Out", value: 50 },
  ];

  const metrics = {
    openingBalance: 500,
    closingBalance: 650,
    netMovement: 150, // purchases + transfers in - transfers out
    assigned: 200,
    expended: 100,
  };

  // Extra Data for Charts
  const assetTypeData = [
    { name: "Weapon", value: 10 },
    { name: "Vehicle", value: 2 },
    { name: "Ammunition", value: 3 },
  ];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]; // Tailwind colors: blue, green, yellow

  const assetAvailabilityData = [
    { name: "Weapon", Available: 1200, Assigned: 0 },
    { name: "Vehicle", Available: 0, Assigned: 0 },
    { name: "Ammunition", Available: 17000, Assigned: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={filters.base}
          onChange={(e) => setFilters({ ...filters, base: e.target.value })}
        >
          <option value="">Select Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>
        <select
          className="border rounded px-3 py-2"
          value={filters.equipmentType}
          onChange={(e) =>
            setFilters({ ...filters, equipmentType: e.target.value })
          }
        >
          <option value="">Select Equipment</option>
          <option value="Weapons">Weapons</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Ammunition">Ammunition</option>
        </select>
        <Button>Apply Filters</Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Opening Balance</h3>
            <p className="text-2xl font-bold">{metrics.openingBalance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Closing Balance</h3>
            <p className="text-2xl font-bold">{metrics.closingBalance}</p>
          </CardContent>
        </Card>
        {/* Net Movement with Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg">
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-semibold">Net Movement</h3>
                <p className="text-2xl font-bold">{metrics.netMovement}</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Net Movement Breakdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>Purchases: {data[0].value}</p>
              <p>Transfers In: {data[1].value}</p>
              <p>Transfers Out: {data[2].value}</p>
            </div>
          </DialogContent>
        </Dialog>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Assigned</h3>
            <p className="text-2xl font-bold">{metrics.assigned}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Expended</h3>
            <p className="text-2xl font-bold">{metrics.expended}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Movements (Bar Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Asset Movements</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assets by Type (Pie Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Assets by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {assetTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Availability (Bar Chart) */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Asset Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetAvailabilityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Available" fill="#10b981" />
              <Bar dataKey="Assigned" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
