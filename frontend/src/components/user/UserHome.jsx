import React, { useEffect, useState } from 'react';
import { Badge, Row } from 'antd';
import axiosInstance from '../../api/axiosConfig';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container } from 'react-bootstrap';

import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [userdata, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axiosInstance.post(
        '/api/user/getuserdata',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        // handle success if needed
      }
    } catch (error) {
      console.error('getUserData error:', error);
    }
  };

  const getDoctorData = async () => {
    try {
      const res = await axiosInstance.get('/api/user/getalldoctorsu', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error('getDoctorData error:', error);
    }
  };

  useEffect(() => {
    getUser();
    getUserData();
    getDoctorData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h2>YaseenCareBook</h2>
            </div>
            <div className="menu">
              <div className="menu-items">
                <CalendarMonthIcon className="icon" />
                <Link to="userappointments">Appointments</Link>
              </div>
              {userdata.isdoctor === true ? null : (
                <div className="menu-items">
                  <MedicationIcon className="icon" />
                  <Link to="applydoctor">Apply doctor</Link>
                </div>
              )}
              <div className="menu-items" onClick={logout}>
                <LogoutIcon className="icon" />
                <span style={{ cursor: 'pointer' }}>Logout</span>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  className="notify"
                  count={userdata?.notification ? userdata.notification.length : 0}
                >
                  <NotificationsIcon className="icon" />
                </Badge>

                {userdata.isdoctor === true && <h3>Dr. </h3>}
                <h3>{userdata.fullName}</h3>
              </div>
            </div>
            <div className="body">
              <Routes>
                <Route path="applydoctor" element={<ApplyDoctor userId={userdata._id} />} />
                <Route path="userappointments" element={<UserAppointments />} />
                <Route
                  path="/"
                  element={
                    <Container>
                      <h2 className="text-center p-2">Home</h2>
                      {userdata.isdoctor === true ? null : (
                        <Row>
                          {doctors &&
                            doctors.map((doctor, i) => {
                              let notifyDoc = doctor.userId;
                              return (
                                <DoctorList
                                  userDoctorId={notifyDoc}
                                  doctor={doctor}
                                  userdata={userdata}
                                  key={i}
                                />
                              );
                            })}
                        </Row>
                      )}
                    </Container>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
