import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Modal, Button, Form, Alert } from 'react-bootstrap'
import portfolioLogo from '../../assets/portfolio.svg'
import { Link, useNavigate } from 'react-router-dom'
import './header.css';
import axios from 'axios'

export default function Header() {

    const navigate = useNavigate()
    let username = localStorage.getItem('username')
    let userRoles = localStorage.getItem("roles");

    const [errorMessage, setErrorMessage] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    function checkEmail() {
        let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        if (re.test(email)) {
            setValidEmail(true);
        }
        else {
            setErrorMessage("Invalid email")
            setValidEmail(false)
        }
    }

  // Modal login
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("SimpleUser")

  async function signIn() {
      let details = { userName, password }
      let json = JSON.stringify(details)

      await axios.post('/api/login/', json, { headers: { 'Content-Type': 'application/json' } })
          .then(response => {
              let user = JSON.parse(JSON.stringify(response.data))
              localStorage.setItem("access-token", user.accesToken)
              localStorage.setItem("refresh-token", user.refreshToken)
              localStorage.setItem("username", user.username)
              localStorage.setItem("roles", user.roles)
              localStorage.setItem("id", user.userid)
              handleCloseLogin()
              navigate("/")
          })
          .catch(function (error) {
              if (error.response) {
                  console.warn(error.response.data);
                  setErrorMessage(error.response.data);
              }
          })
  }

    const [userName, setUsername] = useState("");

    async function signUp() {

        checkEmail();
        if (validEmail === false) {
            return false
        }

        let details = { userName, email, password, type }
        let json = JSON.stringify(details)

        await axios.post('/api/register/', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                handleCloseRegister()
                signIn();
                navigate("/")
            })
            .catch(error => {
                setErrorMessage(error.response.data);
            })
    }

    function Logout() {
        localStorage.clear()
        navigate("/")
    }

  return (

    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand><Link to='/' className='portfolioLogo'><img style={{ width: 80 }} className='filter-lightgray' src={portfolioLogo} alt="Logo" /></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {
                    localStorage.getItem('access-token') ?
                        <></>
                        :
                        <>
                            <Nav className="mr-auto">
                                <Nav.Link className='link' onClick={handleShowLogin}>Login</Nav.Link>
                                <Nav.Link className='link' onClick={handleShowRegister}>Register</Nav.Link>
                            </Nav>
                        </>
                }
                {
                    localStorage.getItem('access-token') ?
                        <>
                            <Nav>
                                <NavDropdown
                                    className="usernamecolor"
                                    title={<span className="usernamecolor">{username && username}</span>}
                                    menuVariant="dark"
                                >
                                    {
                                        userRoles.includes("SimpleUser") ?
                                        <>
                                            <NavDropdown.Item><Link to="/Portfolios" className='link'>Portfolios</Link></NavDropdown.Item>
                                            <NavDropdown.Item><Link to="/Trades" className='link'>Trades</Link></NavDropdown.Item>
                                            <NavDropdown.Item><Link to="/Assets" className='link'>Assets</Link></NavDropdown.Item>
                                        </>
                                        :
                                        <></>
                                    }
                                    {
                                        (userRoles.includes("Admin") || userRoles.includes("Admin")) ?
                                        <>
                                            <NavDropdown.Item><Link to="/AssetsList" className='link'>AssetsList</Link></NavDropdown.Item>
                                        </>
                                        :
                                        <></>
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                        :
                        null
                        }
            </Navbar.Collapse>
        </Container>
    </Navbar>

    <>
        <Modal show={showLogin} onHide={handleCloseLogin} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                <Form>
                    <label htmlFor='userName'>UserName:</label>
                    <input type="userName" name='userName' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="UserName" required />
                    <br />
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                    <br />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={signIn}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    </>

    <>
        <Modal show={showRegister} onHide={handleCloseRegister} centered>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger" style={{ textAlign: "center" }}> {errorMessage} </Alert>}
                <Form>
                    <fieldset>
                        <label htmlFor='username'>Username:</label>
                        <input type="text" id='username' value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" required />
                        <br />
                        <label htmlFor='email'>Email:</label>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                        <br />
                        <label htmlFor='password'>Password:</label>
                        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                        <br />
                        <div key={'inline-radio'} className="mb-3 text-center">
                            <Form.Check
                                inline
                                type="radio"
                                label="User"
                                name="SimpleUser"
                                id="SimpleUser"
                                value="eUser"
                                defaultChecked
                                onChange={(e) => setType(e.target.value)}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Admin"
                                name="admin"
                                id="Admin"
                                value="Admin"
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                    </fieldset>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={signUp}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    </>
</div >
  )
}