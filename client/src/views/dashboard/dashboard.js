import React, { useState, useEffect } from 'react';
import './dashboard.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn, MDBContainer, MDBCardTitle, MDBInput,
} from 'mdbreact';
import { ROUTEPATH } from '../../common/appConstants';
import { API_URL } from '../../common/appConstants';
import { httpPost } from '../../httpClient/httpClient';
import { connect } from 'react-redux';
import Store from '../../state/store';
import AlertComponent from '../alertcomponent';
import { storeUserDetail } from '../../state/actions';


const Dashboard = (props) => {

    let [username, setUsername] = useState('');
    let [emailid, setEmailId] = useState('');
    let [mobilenumber, setMobileNumber] = useState('');
    let [age, setAge] = useState('');
    let [address, setAddress] = useState('');
    let [model, setModel] = useState(false)
    let [errorValue, setErrorValue] = useState('');
    let [userid,setUserId] = useState('')

    const getUserDetail = async (userid) => {
        let userData = await httpPost(API_URL.GETUSERDETAIL , { userid : userid });
        setUserId(userid);
        
        if(userData && userData.error || !userData) { 
            showAlertComponent("Error while getting user detail");
        }else if(userData && userData.userid){
            if(userData.username){
                setUsername(userData.username)
            }
            if(userData.emailid){
                setEmailId(userData.emailid)
            }
            if(userData.mobilenumber){
                setMobileNumber(userData.mobilenumber)
            }
            if(userData.age){
                setAge(userData.age)
            }
            if(userData.address){
                setAddress(userData.address)
            }
        }
    }

    useEffect(() => {
        if(props.location && props.location.state){
            getUserDetail(props.location.state);
        }
    },[])

    function inputChange(value, type) {
        if (type == 'usernmae') {
            setUsername(value)
        }
        else if (type == 'emailid') {
            setEmailId(value)
        }
        else if (type == 'mobilenumber') {
            setEmailId(value)
        }
        else if (type == 'age') {
            setAge(value)
        }
        else if (type == 'mobilenumber') {
            setMobileNumber(value)
        }
        else if (type == 'address') {
            setAddress(value)
        }
    }

    // const logOut = ()=> {
    //      props.history.push(ROUTEPATH.INDEX);
    // }

    const updateUserDetail = async ()=>{
        if(!emailid || !age || !address){
            showAlertComponent("Please fill all the details");
        }
        else if (emailid && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid))) {
            showAlertComponent("Entered email was invalid");
        } 
        let userData = await httpPost(API_URL.MODIFYUSER , { userid : userid ,emailid : emailid,age : age,address : address });
        if (!userData && userData.error) {
            showAlertComponent("Error while updating user details");
        }
        else if (userData) {
            getUserDetail(userid);
        }
    }

    function showAlertComponent(errorValue) {
        setErrorValue(errorValue);
        setModel(!model)
    }


    return (
        <div>
            <AlertComponent model={model} errorText={errorValue} onChange={() => showAlertComponent()}>
            </AlertComponent>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Welcome</strong>
                </MDBNavbarBrand>
                <MDBCollapse id="navbarCollapse3" navbar>
                    <strong className="white-text">{username}</strong>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light">
                                <MDBIcon icon="sign-out-alt" />
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>

            <MDBContainer>
                <MDBCard className="registerForm">
                    <MDBCardTitle className="titleText">
                        <strong>Your Details</strong>
                    </MDBCardTitle>
                    <MDBCardBody>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <MDBInput type="text" label="username" value={username}
                                    onChange={(e) => inputChange(e.target.value, 'username')} disabled="true"/>
                            </div>
                            <div className="form-group col-md-6">
                                <MDBInput type="text" label="Email ID" value={emailid}
                                    onChange={(e) => inputChange(e.target.value, 'emailid')} />
                            </div>
                            <div className="form-group col-md-6">
                                <MDBInput type="number" label="Mobile Number" value={mobilenumber}
                                    onChange={(e) => inputChange(e.target.value, 'mobilenumber')} disabled="true"/>
                            </div>
                            <div className="form-group col-md-6">
                                <MDBInput type="number" className="form-control" value={age}
                                    onChange={(e) => inputChange(e.target.value, 'age')} />
                            </div>
                            
                        </div>
                        <div className="form-group col-md-12">
                                <MDBInput type="textarea" label="Address" rows="2" value={address}
                                    onChange={(e) => inputChange(e.target.value, 'address')} />
                            </div>
                        <MDBBtn color="primary"  onClick={() => { updateUserDetail() }}>
                            Save
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        storeUserDetail: (s) => { dispatch(storeUserDetail(s)) }
    };
};
export default connect(null, mapDispatchToProps)(Dashboard);