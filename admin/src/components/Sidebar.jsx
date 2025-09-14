 import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>

          {/* Admin Dashboard */}
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          {/* Doctors List */}
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>

          {/* 🆕 Add Lab */}
          <NavLink
            to={'/admin/add-lab'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Lab</p>
          </NavLink>

          {/* 🆕 Labs List */}
          <NavLink
            to={'/admin/labs-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Labs List</p>
          </NavLink>

        </ul>
      )}

      {dToken && (
        <ul className='text-[#515151] mt-5'>
          {/* Doctor Dashboard */}
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          {/* Doctor Appointments */}
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          {/* Doctor Profile */}
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
