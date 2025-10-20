import React, { useState } from 'react'
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

function PasswordsCards({ passwordArray, onDelete }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePassword = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyField = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast.info(`Copied: ${value}`))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-3 text-center text-green-800">Your Passwords</h2>

      {passwordArray.length === 0 && (
        <div className="text-center text-gray-500">No Passwords to show</div>
      )}

      <div className="grid justify-center sm:grid-cols-2 md:grid-cols-3 gap-4">
        {passwordArray.map((item, index) => (
          <div
            key={index}
            className="bg-green-100 rounded-lg p-4 shadow hover:shadow-md transition duration-300 flex flex-col gap-2"
          >
            {/* Site */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-green-800">Site</p>
                <input
                  type="url"
                  defaultValue={item.site}
                  readOnly
                  className="bg-transparent text-gray-800 outline-none"
                />
              </div>
              <FaCopy
                onClick={() => copyField(item.site)}
                className="cursor-pointer text-green-700 hover:text-green-900"
              />
            </div>

            {/* Username */}
            <div className="flex justify-between  items-center">
              <div>
                <p className="font-semibold text-green-800">Username</p>
                <input
                  type="text"
                  defaultValue={item.username}
                  readOnly
                  className="bg-transparent text-gray-800 outline-none"
                />
              </div>
              <FaCopy
                onClick={() => copyField(item.username)}
                className="cursor-pointer text-green-700 hover:text-green-900"
              />
            </div>

            {/* Password */}
            <div className="flex justify-between  items-center">
              <div>
                <p className="font-semibold text-green-800">Password</p>
                <input
                  type={visiblePasswords[index] ? "text" : "password"}
                  defaultValue={item.password}
                  readOnly
                  className="bg-transparent text-gray-800 outline-none"
                />
              </div>
              <div className="flex gap-2  items-center">
                {visiblePasswords[index] ? (
                  <FaEyeSlash
                    onClick={() => togglePassword(index)}
                    className="w-5 h-5 cursor-pointer text-green-700 hover:text-green-900"
                  />
                ) : (
                  <FaEye
                    onClick={() => togglePassword(index)}
                    className="w-5 h-5 cursor-pointer text-green-700 hover:text-green-900"
                  />
                )}
                <FaCopy
                  onClick={() => copyField(item.password)}
                  className="cursor-pointer text-green-700 hover:text-green-900"
                />
                <MdDelete
                  onClick={() => onDelete(item._id)}
                  className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PasswordsCards;
