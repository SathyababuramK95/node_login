import React, { useState, useEffect } from 'react';
import './signup.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { ROUTEPATH } from '../../common/appConstants';
import { API_URL } from '../../common/appConstants';
import { httpPost } from '../../httpClient/httpClient';
import AlertComponent from '../alertcomponent';


const Signup = (props) => {

    let [emailid, setEmail] = useState('');
    let [mobilenumber, setMobileNumber] = useState('');
    let [age, setAge] = useState('');
    let [username, setUsername] = useState('');
    let [address, setAddress] = useState('');
    let [password, setPassword] = useState('');
    let [model, setModel] = useState(false)
    let [errorValue, setErrorValue] = useState('');

    function inputChange(value, type) {
        if (type == 'username') {
            setUsername(value)
        } else if (type == 'email') {
            setEmail(value)
        } else if (type == 'age') {
            setAge(value)
        } else if (type == 'address') {
            setAddress(value)
        } else if (type == 'mobilenumber') {
            setMobileNumber(value)
        }else if (type == 'password') {
            setPassword(value)
        }
    }

    function showAlertComponent(errorValue) {
        setErrorValue(errorValue);
        setModel(!model)
    }


    async function doSignin() {
        if (!username || !password || !emailid || !mobilenumber || !age || !address) {
            showAlertComponent("please fill all the details");
        }
        else if (emailid && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid))) {
            showAlertComponent("Entered email was invalid");
        } 
        else if(mobilenumber && mobilenumber.length < 10){
            showAlertComponent("Entered mobilenumber was invalid");
        }
        else {
            let savedData = await httpPost(API_URL.SAVEUSER, getSaveParams() );
            if (savedData.userData) {
                props.history.push(ROUTEPATH.INDEX);
            }
            else if (!savedData && savedData.error) {
                showAlertComponent("Error while sign in");
            }
        }
    }

    const getSaveParams = () => {
        let saveParams = {};
        saveParams.username = username;
        saveParams.emailid = emailid;
        saveParams.mobilenumber = mobilenumber;
        saveParams.age = age;
        saveParams.address = address;
        saveParams.password = password;

        return saveParams;
    }



    function goToLogin() {
        props.history.push(ROUTEPATH.INDEX);
    }

    return (
        <MDBContainer>
            <AlertComponent model={model} errorText={errorValue} onChange={() => showAlertComponent()}>
            </AlertComponent>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol md="6">
                    <MDBCard className="Carddiv">
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign Up</strong>
                                </h3>
                            </div>
                            <MDBInput
                                label="Your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                value={emailid}
                                onChange={(e) => inputChange(e.target.value, 'email')}
                            />
                            <MDBInput
                                label="Your Username"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={username}
                                onChange={(e) => inputChange(e.target.value, 'username')}
                            />
                            <MDBInput
                                label="Mobile number"
                                group
                                type="number"
                                validate
                                error="wrong"
                                success="right"
                                value={mobilenumber}
                                onChange={(e) => inputChange(e.target.value, 'mobilenumber')}
                            />
                            <MDBInput
                                label="Your age"
                                group
                                type="number"
                                validate
                                error="wrong"
                                success="right"
                                value={age}
                                onChange={(e) => inputChange(e.target.value, 'age')}
                            />
                            <MDBInput type="textarea" label="Address" rows="5" value={address}
                                    onChange={(e) => inputChange(e.target.value, 'address')} />
                            <MDBInput
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                                value={password}
                                onChange={(e) => inputChange(e.target.value, 'password')}
                            />
                            <div className="text-center mb-3">
                                <MDBBtn
                                    type="button"
                                    gradient="blue"
                                    rounded
                                    className="btn-block z-depth-1a"
                                    onClick={() => { doSignin() }}
                                >
                                    Sign Up
                            </MDBBtn>
                            </div>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end" onClick={() => { goToLogin() }}>
                                Already an member?
                            <a href="#!" className="blue-text ml-1">

                                    Sign In
                            </a>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )

}
export default Signup;