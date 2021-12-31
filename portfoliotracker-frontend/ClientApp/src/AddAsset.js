import React, { useState } from 'react'
import Header from './components/header'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer';

export default function AddAsset() {

    const navigate = useNavigate()

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [quantity, setQuantity] = useState()
    const [currentPrice, setCurrentPrice] = useState()
    const [askPrice, setAskPrice] = useState()
    const [bidPrice, setBidPrice] = useState()
    

    async function addAsset(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Description", description);
        formData.append("Quantity", quantity);
        formData.append("CurrentPrice", currentPrice);
        formData.append("AskPrice", parseFloat(askPrice))
        formData.append("BidPrice", bidPrice);

        var json = JSON.stringify(Object.fromEntries(formData));

        await axios.post('/api/assets/', json, {headers: {'Content-Type': 'application/json, text/plain'}})
            .then(response => {
                let result = JSON.parse(JSON.stringify(response.data))
                console.log(result);
                navigate("/Assets/")
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
                <h2>Add Asset</h2>
                <br />
                <Container>
                    <Form onSubmit={addAsset}>
                        <fieldset>
                            <label htmlFor='name'>Name:</label>
                            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required />
                            <br />
                            <label htmlFor='description'>Description:</label>
                            <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" required />
                            <br />
                            <label htmlFor='quantity'>Quantity:</label>
                            <input type="number" name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Quantity" required />
                            <br />
                            <label htmlFor='currentPrice'>CurrentPrice:</label>
                            <input type="number" min='0' name='currentPrice' value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} className="form-control" placeholder="CurrentPrice" required />
                            <br />
                            <label htmlFor='askPrice'>AskPrice:</label>
                            <input type="number" min='0' name='askPrice' value={askPrice} onChange={(e) => setAskPrice(e.target.value)} className="form-control" placeholder="AskPrice" required />
                            <br />
                            <label htmlFor='bidPrice'>BidPrice</label>
                            <input type="number" min='0' name='bidPrice' value={bidPrice} onChange={(e) => setBidPrice(e.target.value)} className="form-control" placeholder="BidPrice" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Add</button>
                            <Link to={"/Assets/"} ><Button variant='danger' className='my-1 m-1'>Back to list</Button></Link>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div >
    )
}
