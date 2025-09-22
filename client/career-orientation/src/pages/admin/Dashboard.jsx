import React, { useEffect, useState } from "react";
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts";
import { authApis, endpoints } from "../../configs/Apis";

const Dashboard = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [quarterlyStats, setQuarterlyStats] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monthRes, quarterRes, yearRes] = await Promise.all([
          authApis().get(`${endpoints.statistics}/students/by-month`),
          authApis().get(`${endpoints.statistics}/students/by-quarter`),
          authApis().get(`${endpoints.statistics}/students/by-year`),
        ]);

        // API trả về UserStatisticsDTO: { year, month, quarter, count }
        setMonthlyStats(monthRes.data);
        setQuarterlyStats(quarterRes.data);
        setYearlyStats(yearRes.data);

        if (yearRes.data.length > 0) {
          // Chọn năm mới nhất làm mặc định
          setSelectedYear(Math.max(...yearRes.data.map(y => y.year)));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error);
      }
    };

    fetchData();
  }, []);

  // Lọc và map dữ liệu theo năm được chọn
  const filteredMonthly = monthlyStats
    .filter(item => item.year === selectedYear)
    .map(item => ({ month: item.month, count: item.count }));

  const filteredQuarterly = quarterlyStats
    .filter(item => item.year === selectedYear)
    .map(item => ({ quarter: item.quarter, count: item.count }));

  const yearlyData = yearlyStats.map(item => ({ year: item.year, count: item.count }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">📊 Thống kê Users (2 năm gần nhất)</h2>

      {/* Bộ lọc chọn năm */}
      <div className="mb-4 d-flex align-items-center">
        <label className="form-label fw-bold me-2">Chọn năm:</label>
        <select
          className="form-select w-auto"
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearlyData.map(y => (
            <option key={y.year} value={y.year}>
              {y.year}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        {/* Thống kê theo tháng */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">
              User theo tháng ({selectedYear})
            </div>
            <div className="card-body" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredMonthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#0d6efd" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Thống kê theo quý */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-bold">
              User theo quý ({selectedYear})
            </div>
            <div className="card-body" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredQuarterly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Thống kê theo năm */}
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark fw-bold">
              User theo năm
            </div>
            <div className="card-body" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ffc107" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
