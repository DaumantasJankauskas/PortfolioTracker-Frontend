import React, { useState } from 'react'
import Header from './components/header'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer';

export default function AddPortfolio() {

    const navigate = useNavigate()
    const initialValue = () => {
        const value = 0;
        return value;
    };

    const creationTime = () => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return time;
    }

    const getUserId = () => {
        return localStorage.getItem("id");
    }
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState(initialValue)
    const [creationTimeUtc, setCreationTimeUtc] = useState(creationTime)
    const [userId, setUserId] = useState(getUserId)

    async function addPortfolio(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("Description", description);
        formData.append("Value", value);
        formData.append("CreationTimeUtc", creationTimeUtc);
        formData.append("userId", userId);
    
        var json = JSON.stringify(Object.fromEntries(formData));

        await axios.post('/api/portfolios/', json, {headers: {'Content-Type': 'application/json, text/plain'}})
            .then(response => {
                let result = JSON.parse(JSON.stringify(response.data))
                console.log(result);
                navigate("/Portfolios/")
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <Header />
            <br />
            <div className="col-sm-6 offset-sm-3">
                <h2>Add Portfolio</h2>
                <br />
                <Container>
                    <Form onSubmit={addPortfolio}>
                        <fieldset>
                            <label htmlFor='title'>Title:</label>
                            <input type="text" name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" required />
                            <br />
                            <label htmlFor='description'>Description:</label>
                            <input type="text" name='description' value={description || ''} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" />
                            <br />
                            <label htmlFor='value'>Value:</label>
                            <input type="number" name='value' value={value || 0}  onChange={(e) => setValue(e.target.value)} className="form-control" placeholder="Value" required />
                            <br />
                            <label htmlFor='creationTimeUtc'>Creation Time:</label>
                            <input type="date" name='creationTimeUtc' value={creationTimeUtc} onChange={(e) => setCreationTimeUtc(e.target.value)} className="form-control" placeholder="CreationTimeUtc" />
                            <br />
                            
                            <button id="submit" value="submit" className="btn btn-success">Add</button>
                            <Link to={"/Portfolios/"} ><Button variant='danger' className='my-1 m-1'>Back to list</Button></Link>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div >
    )
}
