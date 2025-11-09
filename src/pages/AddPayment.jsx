import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDetails } from "../features/details/detailSlice";
import { Loader } from "../index.js"

const AddPayment = () => {
  const dispatch = useDispatch();
  const { loading, error, data, success } = useSelector((state) => state.details);


  const [formData, setFormData] = useState({
    date: "",
    rentAmount: "",
    paymentMethod: "",
    uploadProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("date", formData.date);
      data.append("rentAmount", formData.rentAmount);
      data.append("paymentMethod", formData.paymentMethod);
      data.append("uploadProof", formData.uploadProof);

      await dispatch(sendDetails(data)).unwrap();


      setFormData({
        date: "",
        rentAmount: "",
        paymentMethod: "",
        uploadProof: null,
      });

    } catch (err) {
      console.error("Error submitting payment:", err);
    }
  };

  return (
    <>
      <div className="payment-form-wrapper min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 shadow-2xl rounded-2xl bg-white"
          >
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                required
              />
            </div>

            {/* Rent Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent Amount
              </label>
              <input
                type="number"
                name="rentAmount"
                placeholder="Enter amount"
                value={formData.rentAmount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              >
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="bankTransfer">Bank Transfer</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>

            {/* Proof Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Proof (Photo)
              </label>
              <input
                type="file"
                name="uploadProof"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-primary)] text-white py-2 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              Submit Payment
            </button>

            {/* Error / Loading */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {loading && <Loader />}
            {success && <p className="text-green-500 text-sm text-center">Payment submitted successfully!</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPayment;

