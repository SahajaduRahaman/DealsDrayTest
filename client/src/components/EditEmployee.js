import React, { useEffect, useState } from 'react'
import { GetEmployeeByID, UpdateEmployee } from '../fetchApi/FetchAPI'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
  const path = useParams()
  const navigate = useNavigate()

  const Courses = ['MCA', 'BCA', 'BSC'];

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course : "",
    file : ""
  })

  useEffect(() => {
    GetEmployeeByID(path.id).then((data) => {
      if (data.status === 200) {
        setEmployee(data.data.employee)
      }
      else {
        console.log(data);
      }
    });
  },[path])

  const handleFormChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobile", employee.mobile);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("course", employee.course);
    formData.append("file", employee.file);

    UpdateEmployee(path.id, formData).then((data) => {
      if (data.status === 200) {
          alert("Employee updated successfully.")
          navigate("/employee_list")
      } 
      else {
          alert("failed to update employee.");
      }
  });

  }

  return (
    <div className='flex flex-col h-screen text-white'>
      <div className='flex justify-between p-5'>
        <h1 className='text-base font-medium from-neutral-900 bg-slate-600 py-2 px-2 rounded-lg text-white text-center'>Edit Employee</h1>
      </div>
      <div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className='flex flex-col m-5'>
            <div className='flex justify-between gap-5'>
              <div className='flex flex-col w-full'>
                <label htmlFor="name">Name :</label>
                <input className='bg-slate-400 text-amber-900 placeholder-amber-800 inline-block rounded-md p-2 text-base font-normal' type="text" id='name' value={employee.name} onChange={(e) => handleFormChange(e)} name="name" placeholder="Enter employee name..."/>

                <label htmlFor="email">Email :</label>
                <input className='bg-slate-400 text-amber-900 placeholder-amber-800 inline-block rounded-md p-2 text-base font-normal' type="email" id='email' value={employee.email} onChange={(e) => handleFormChange(e)} name="email" placeholder="Enter employee email..."/>

                <label htmlFor="mobile">Mobile :</label>
                <input className='bg-slate-400 text-amber-900 placeholder-amber-800 inline-block rounded-md p-2 text-base font-normal' type="tel" id='mobile' value={employee.mobile} onChange={(e) => handleFormChange(e)} name="mobile" placeholder="Enter employee mobile..."/>

              </div>
              <div className='flex flex-col gap-5'>
                {employee.file ?
                  <img className='w-40 rounded-md' src={employee.file.secure_url ? employee.file.secure_url : URL.createObjectURL(employee.file)} style={{width : "150px"}} alt="FilePic" />
                :
                  <img className='w-40 rounded-md' src="https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png" style={{width : "150px"}} alt="" />
                }
                <label className='text-base font-medium rounded-md px-4 py-2 text-center bg-sky-700 text-white outline-none shadow-md' htmlFor="file">Choose File</label>
                <input className='hidden' type="file" name='file' id="file" onChange={(e) => setEmployee({...employee, [e.target.name] : e.target.files[0]})}/>
              </div>
            </div>
            <div className='flex flex-col gap-5 mt-5'>
              <div className='flex gap-5'>
                <label htmlFor="designation">Designation :</label>
                <select className='block w-24 rounded-md p-1 bg-slate-400' name="designation" id="designation" value={employee.designation} onChange={(e) => handleFormChange(e)}>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div className='flex gap-5'>
                <h3>Gender :</h3>
                <div>
                  <input type="radio" id="male" name="gender" checked={employee.gender === "Male"} value="Male" onChange={(e) => handleFormChange(e)}/>
                  <label htmlFor="male">Male</label><br/>
                  <input type="radio" id="female" name="gender" checked={employee.gender === "Female"} value="Female" onChange={(e) => handleFormChange(e)}/>
                  <label htmlFor="female">Female</label><br/>
                </div>
              </div>
              <div className='flex gap-5 items-center'>
                <h3>Course :</h3>
                <div className='flex gap-5'>
                  {Courses.map((course) => (
                    <label key={course}>
                      <input
                        type="checkbox"
                        value={course}
                        name='course'
                        checked={employee.course === course}
                        onChange={(e) => handleFormChange(e)}
                      />
                      {course}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <input className='m-5 text-center font-medium text-base bg-green-800 p-2 rounded-md px-5' type="submit" value="Update" />
        </form>
      </div>
    </div>
  )
}

export default EditEmployee