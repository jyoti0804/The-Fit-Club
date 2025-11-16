import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  type: "Credit" | "Debit";
  status: "Completed" | "Pending" | "Failed";
  method: string;
};

const statusColors: Record<string, string> = {
  Completed: "text-green-500 bg-green-900/30",
  Pending: "text-yellow-400 bg-yellow-900/30",
  Failed: "text-red-500 bg-red-900/30",
};

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const dummyData: Transaction[] = [
      { id: 1, date: new Date().toISOString(), amount: 49.99, type: "Debit", status: "Completed", method: "Credit Card" },
      { id: 2, date: new Date().toISOString(), amount: 19.99, type: "Debit", status: "Pending", method: "PayPal" },
      { id: 3, date: new Date().toISOString(), amount: 99.99, type: "Credit", status: "Failed", method: "Bank Transfer" },
      { id: 4, date: new Date().toISOString(), amount: 29.99, type: "Debit", status: "Completed", method: "Credit Card" },
      { id: 5, date: new Date().toISOString(), amount: 59.99, type: "Credit", status: "Completed", method: "PayPal" },
      { id: 6, date: new Date().toISOString(), amount: 15.49, type: "Debit", status: "Pending", method: "Bank Transfer" },
      { id: 7, date: new Date().toISOString(), amount: 89.99, type: "Credit", status: "Failed", method: "Credit Card" },
      { id: 8, date: new Date().toISOString(), amount: 39.99, type: "Debit", status: "Completed", method: "PayPal" },
    ];

    setTimeout(() => {
      setTransactions(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const logoutHandler = () => navigate("/");

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (filter !== "All") {
      filtered = filtered.filter((t) => t.status === filter);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (t) =>
          t.method.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toString() === search ||
          t.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [transactions, filter, search]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-gray-300">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="FitClub" className="w-36 md:w-40 object-contain" />
          <h1 className="text-2xl font-extrabold text-white">Transactions</h1>
        </div>
        <button
          onClick={logoutHandler}
          className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-md text-white font-semibold hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Filter by status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#2b2b2b] text-orange-400 border border-gray-700 px-3 py-2 rounded-md font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option className="bg-[#2b2b2b]">All</option>
              <option className="bg-[#2b2b2b]">Completed</option>
              <option className="bg-[#2b2b2b]">Pending</option>
              <option className="bg-[#2b2b2b]">Failed</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search by ID, method or type"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#2b2b2b] px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-200 w-full md:w-64"
          />
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-[#2b2b2b]/60">
                {["ID", "Date", "Amount", "Type", "Status", "Method"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                [...Array(itemsPerPage)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((__, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-[#3a3a3a] rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedTransactions.length > 0 ? (
                <AnimatePresence>
                  {paginatedTransactions.map((t) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-[#3a3a3a]/40 cursor-pointer"
                    >
                      <td className="px-6 py-4">{t.id}</td>
                      <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">${t.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">{t.type}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            statusColors[t.status]
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{t.method}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md font-semibold ${
                currentPage === i + 1
                  ? "bg-orange-500 text-black"
                  : "bg-[#2b2b2b] text-orange-400 hover:bg-orange-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Transactions;
