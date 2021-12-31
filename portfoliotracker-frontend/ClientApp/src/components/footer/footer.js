import React from 'react'
import { Container } from 'react-bootstrap'
import './footer.css'                     

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'relative',
  padding: '20px',
  height: '60px',
  width: '100%',
}

export default function Footer() {

    return (
        <div name='footer text-center mt-auto'>
            <div style={phantom} />
            <div style={style}>
            <Container>
                <footer>
                    {new Date().getFullYear()} Daumantas Jankauskas
                </footer>
            </Container>
            </div>
        </div>
    )
}