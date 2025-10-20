import React, { useState } from 'react'
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

function PasswordsTable({ passwordArray,onDelete }) {
  // store visibility per index
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // toggle specific password visibility
  const togglePassword = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyField = (value) => {``
    navigator.clipboard.writeText(value)
      .then(() => toast.info(`Copied: ${value}`))
      .catch(err => toast.error("Failed to copy:", err));
  };

  return (
    <section>
      <h2>Your Passwords</h2>

      {passwordArray.length === 0 && <div>No Passwords to show</div>}

      {passwordArray.length !== 0 && (
        <table className="table-auto md:table-fixed  rounded-lg overflow-x-auto">
          <thead className='bg-green-800 text-white py-2'>
            <tr>
              <th className='py-2'>Site</th>
              <th className='py-2'>Username</th>
              <th className='py-2'>Password</th>
            </tr>
          </thead>

          <tbody className='bg-green-100'>
            {passwordArray.map((item, index) => (
              <tr key={index}>
                {/* Site */}
                <td className='py-2 text-center border'>
                  <div className='flex justify-around items-center'>
                    <input
                      className='lg:pl-48'
                      type="url"
                      defaultValue={item.site}
                      readOnly
                    />
                    <FaCopy
                      onClick={() => copyField(item.site)}
                      className='cursor-pointer'
                    />
                  </div>
                </td>

                {/* Username */}
                <td className='py-2 text-center border'>
                  <div className='flex justify-around items-center'>
                    <input
                      className='lg:pl-48'
                      type="text"
                      defaultValue={item.username}
                      readOnly
                    />
                    <FaCopy
                      onClick={() => copyField(item.username)}
                      className='cursor-pointer'
                    />
                  </div>
                </td>

                {/* Password */}
                <td className='py-2 text-center border'>
                  <div className='flex  justify-around items-center'>
                    <input
                      className='lg:pl-48'
                      type={visiblePasswords[index] ? "text" : "password"}
                      defaultValue={item.password}
                      readOnly
                    />
                    <span className='flex gap-2 items-center'>
                      {visiblePasswords[index] ? (
                        <FaEyeSlash
                          onClick={() => togglePassword(index)}
                          className='w-5 h-5 cursor-pointer'
                        />
                      ) : (
                        <FaEye
                          onClick={() => togglePassword(index)}
                          className='w-5 h-5 cursor-pointer'
                        />
                      )}
                      <FaCopy
                        onClick={() => copyField(item.password)}
                        className='cursor-pointer'
                      />
                      <MdDelete  onClick={() => onDelete(index)} className='w-5 h-5 cursor-pointer' />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default PasswordsTable;
