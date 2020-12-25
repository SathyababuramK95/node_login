import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter
    , MDBModal, MDBModalHeader, MDBModalBody
} from 'mdbreact';



const AlertComponent = (props) => {

    const closeModel = () => {
        props.onChange(false)
    }

    return (
        <MDBContainer>
            <MDBModal isOpen={props.model} centered>
                <MDBModalHeader>Alert</MDBModalHeader>
                <MDBModalBody>
                    {props.errorText}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => closeModel()}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default AlertComponent;