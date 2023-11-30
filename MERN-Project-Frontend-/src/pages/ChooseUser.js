import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import Video from '../assets/designlogin2.png'
const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const [hoveredUser, setHoveredUser] = useState(null);
  
  const handleUserHover = (user) => {
    setHoveredUser(user);
  };

  const handleUserClick = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Parent") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Parentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } 
      else if (currentRole === 'Parent') {
        navigate('/Parent/dashboard');
      } 
      else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);
  return(
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
      <br></br>
      <br></br>
        <HeroH1><b>CHOOSE A USER</b></HeroH1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={5} justifyContent="center">
          {userTypes.map((userType) => (
            <Grid key={userType.name} item xs={12} sm={6} md={4}>
              <HoverPanel
                onMouseEnter={() => handleUserHover(userType.name)}
                onMouseLeave={() => handleUserHover(null)}
                onClick={() => handleUserClick(userType.name)}
                isHovered={hoveredUser === userType.name}
              >
                <Box mb={0}>{userType.icon}</Box>
                <StyledTypography>{userType.label}</StyledTypography>
                {userType.description}
              </HoverPanel>
            </Grid>
          ))}
        </Grid>
      </HeroContent>
      <Backdrop
        sx={{ color: '', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </HeroContainer>
  );
};

export default ChooseUser;
const userTypes = [
  {
    name: 'Admin',
    icon: <AccountCircle fontSize="large" />,
    label: 'Admin',
    description: 'Login as an Admin to create classes and courses.   ',
  },
  {
    name: 'Student',
    icon: <School fontSize="large" />,
    label: 'Student',
    description: 'Login as a student to explore course materials and assignments. ',
  },
  {
    name: 'Parent',
    icon: <AccountCircle fontSize="large" />,
    label: 'Parent',
    description: 'Login as a parent to explore your wards progress. ',
  },
  {
    name: 'Teacher',
    icon: <Group fontSize="large" />,
    label: 'Teacher',
    description: 'Login as a teacher to create courses and assignment',
  },
];
const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: top;
  padding: 0 30px;
  height: 800px;
  position: relative;
  z-index: 1;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0; 
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const VideoBg = styled.img`
  width: 100%;
  height: 100%;
  -o-object-fit: fill;
  object-fit: fill;
  background: white;
`;

const HoverPanel = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${(props) => (props.isHovered ? '#C83200' : '#006CA5')};
  color: ${(props) => (props.isHovered ? '#4682B4' : 'rgba(255, 255, 255, 1)')};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: 'white';
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 1px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroH1 = styled.h1`
  color: #006CA5;
  font-size: 40px;
  font-family: helvetica;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`
