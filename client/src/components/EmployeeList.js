import React, { useCallback, useEffect, useState } from "react";
import {
  DeleteEmployee,
  GetAllEmployee,
  UpdateEmployee,
} from "../fetchApi/FetchAPI";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import DateAndTime from "./DateAndTime";
import Switch from "react-switch";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [dlt, setdlt] = useState(false);
  const [searchTerm, setSerchTerm] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);

  const viewPerPage = 10;

  const lastIndex = currentPage * viewPerPage;
  const firstIndex = lastIndex - viewPerPage;
  const employeePerPage = searchTerm.slice(firstIndex, lastIndex);

  const getQueryString = useCallback(() => {
    let deepFilter = ``;
    if (sortBy) {
      deepFilter = `${deepFilter}&deepFilter=${encodeURIComponent(
        JSON.stringify(sortBy)
      )}`;
    }
    return deepFilter;
  }, [sortBy]);

  const fetchAllEmployees = useCallback(() => {
    GetAllEmployee(getQueryString()).then((data) => {
      if (data.status === 200) {
        setEmployees(data.data.employee);
        setSerchTerm(data.data.employee);
      } else {
        console.log(data);
      }
    });
  }, [getQueryString]);

  useEffect(() => {
    fetchAllEmployees();
  }, [dlt, fetchAllEmployees, getQueryString]);

  const HandleDltBtn = (id) => {
    DeleteEmployee(id).then((data) => {
      if (data.status === 200) {
        alert(data.data.message);
        setdlt("true");
      } else {
        console.log(data);
      }
    });
  };

  const FilterSearch = (event) => {
    setSerchTerm(
      employees.filter((item) =>
        item.name.toLowerCase().includes(event.target.value)
      )
    );
  };

  const handleActiveDeactive = async (id, active) => {
    if (!id) return;
    const newData = [...employees].map((e) => {
      let emp = { ...e };
      if (e._id === id) {
        emp.active = active;
      }
      return emp;
    });
    setEmployees(newData);
    setSerchTerm(newData);
    const updatedUser = employees.filter((e) => e._id === id)?.[0];
    if (updatedUser) {
      updatedUser.active = active;
    }
    try {
      await UpdateEmployee(id, updatedUser);
      await fetchAllEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSort = (column) => {
    if (!sortBy) {
      setSortBy({ column, sortBy: "asc" });
      return;
    }
    if (sortBy.column !== column) {
      setSortBy({ column, sortBy: "asc" });
      return;
    }
    if (sortBy.column === column && sortBy.sortBy === "des") {
      setSortBy(null);
      return;
    }
    if (sortBy.sortBy === "asc" && sortBy.column === column) {
      setSortBy({ column, sortBy: "des" });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center m-5">
        <h4 className="text-base font-medium from-neutral-900 py-2 pr-2 rounded-lg">
          Employees Count : {employees.length}
        </h4>
        <Link
          className="text-base text-white font-medium bg-blue-800 p-2 rounded-lg"
          to="/create_employee"
        >
          Create Employee
        </Link>
      </div>
      <div className="m-5 flex flex-col gap-5">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-base font-medium">Filter</div>
          <div>
            <input
              className="rounded-md px-4 py-2 text-center bg-slate-700 text-white outline-none shadow-md"
              type="text"
              onChange={FilterSearch}
              placeholder="Search using name"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-[1500px]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" px-3 py-2 text-center">
                  Index
                </th>
                <th scope="col" className=" text-center">
                  <button
                    onClick={() => handleSort("_id")}
                    className="bg-gray-200 flex gap-2 px-3 py-2 items-center w-full"
                  >
                    Unique Id
                    <RenderSortBy {...{ column: "_id", sortBy }} />
                  </button>
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Image
                </th>
                <th scope="col" className=" text-center">
                  <button
                    onClick={() => handleSort("name")}
                    className="bg-gray-200 flex gap-2 px-3 py-2 items-center w-full"
                  >
                    Name
                    <RenderSortBy {...{ column: "name", sortBy }} />
                  </button>
                </th>
                <th scope="col" className=" text-center">
                  <button
                    onClick={() => handleSort("email")}
                    className="bg-gray-200 flex gap-2 px-3 py-2 items-center w-full"
                  >
                    Email
                    <RenderSortBy {...{ column: "email", sortBy }} />
                  </button>
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Mobile No
                </th>
                <th scope="col" className=" text-center ">
                  Designation
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Gender
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Course
                </th>
                <th scope="col" className=" text-center">
                  <button
                    onClick={() => handleSort("date")}
                    className="bg-gray-200 flex gap-2 px-3 py-2 items-center w-full"
                  >
                    Create date
                    <RenderSortBy {...{ column: "date", sortBy }} />
                  </button>
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Active
                </th>
                <th scope="col" className=" px-3 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employeePerPage.map((employee, idx) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={idx}
                  >
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {idx + 1}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee._id}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        src={employee.file.secure_url}
                        alt=""
                        className="w-14 h-12 rounded-md"
                      />
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.name}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.email}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.mobile}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.designation}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.gender}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      {employee.course}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      <DateAndTime
                        dot={
                          employee.date
                            ? employee.date
                            : `${new Date().toISOString()}`
                        }
                      />
                    </td>
                    <td>
                      <label>
                        <p>{employee.active ? "Active" : "Deactivated"}</p>
                        <Switch
                          onChange={() =>
                            handleActiveDeactive(employee._id, !employee.active)
                          }
                          checked={employee.active}
                        />
                      </label>
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                      <div className="flex gap-4">
                        <Link
                          className="text-green-400"
                          to={`/edit_employee/${employee._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-400"
                          onClick={() => HandleDltBtn(employee._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          employeeCount={employees.length}
          viewPerPage={viewPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EmployeeList;

const RenderSortBy = ({ column, sortBy }) => {
  if (!sortBy) return null;
  if (sortBy.column !== column) {
    return null;
  }

  if (sortBy.sortBy === "asc") {
    return <MdKeyboardDoubleArrowUp />;
  }
  return <MdKeyboardDoubleArrowDown />;
};
