import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../features/getHistory/getHistorySlice.js";
import { Loader } from "../index.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.history);
  const [searchDate, setSearchDate] = useState("");

  const safeData = Array.isArray(data)
    ? data
    : data
      ? [data]
      : [];


  // Fetch history when a date is selected
  useEffect(() => {
    if (searchDate) {
      // console.log("Fetching history for date:", searchDate);
      dispatch(getHistory(searchDate));
    }
  }, [dispatch, searchDate]);

  // Filter data by date
  const filteredData = searchDate
    ? safeData.filter(
      (payment) => payment.date?.slice(0, 10) === searchDate
    )
    : safeData;


  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 p-6 md:p-10 w-full">
        {/* Header */}
        <h1 className="hidden md:block text-3xl font-bold text-gray-800 mb-8">
          Dashboard
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-4 shadow rounded-xl mb-8">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => setSearchDate("") && filteredData.length <= 0}
            className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-white p-4 md:p-6 shadow rounded-2xl overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>

          {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && filteredData.length > 0 ? (
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Method</th>
                  <th className="p-3 border">Proof</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((payment, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="p-3 border">{payment.date}</td>
                    <td className="p-3 border">₹{payment.rentAmount}</td>
                    <td className="p-3 border">{payment.paymentMethod}</td>
                    <td className="p-3 border">
                      {payment.proof ? (
                        <img
                          src={
                            typeof payment.proof === "string"
                              ? payment.proof
                              : URL.createObjectURL(payment.proof)
                          }
                          alt="Proof"
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded cursor-pointer hover:scale-110 transition"
                          onClick={() =>
                            window.open(
                              typeof payment.proof === "string"
                                ? payment.proof
                                : URL.createObjectURL(payment.proof),
                              "_blank"
                            )
                          }
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && (
              <p className="text-gray-500 text-center py-4">
                No payments found
              </p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;