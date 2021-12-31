import React, { useState, useEffect } from 'react'
import Header from './components/header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer';

export default function UpdatePortfolio() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()
    
    const { id } = useParams();
    let jid = JSON.parse(JSON.stringify(id))

    const [data, setData] = useState([])
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    

    useEffect(() => {
        fetchPortfolio(jid);
    }, [jid])

    async function fetchPortfolio(jid) {
        let result = await axios.get('/api/portfolio/' + jid)
        setData(JSON.parse(JSON.stringify(result.data)));
        setTitle(JSON.parse(JSON.stringify(result.data.title)));
        setDescription(JSON.parse(JSON.stringify(result.data.description)));
    }

    async function updatePortfolio(e) {
        e.preventDefault()

        let details = {title, description}
        let json = JSON.stringify(details);

        await axios.put('/api/portfolio/' + jid, json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate("/Portfolios/")
            })
            .catch(error => {
                console.log(error.response.data);
            });

    }

    return (
        <div className="App">
            <Header />
            <Container>
                <Form onSubmit={updatePortfolio}>
                    <h2>Edit portfolio</h2>
                    <br />
                    <div className="col-sm-6 offset-sm-3">
                        <fieldset>
                            <label htmlFor='title'>Title:</label>
                            <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" required />
                            <br />
                            <label htmlFor='description'>Description:</label>
                            <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" required />
                            <br />
                            <br />
                            <Button variant="success" type="submit" id="submit" value="Submit">Change</Button>
                        </fieldset>
                    </div>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}
