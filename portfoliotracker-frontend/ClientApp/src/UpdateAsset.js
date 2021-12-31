import React, { useState, useEffect } from 'react'
import Header from './components/header'
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer'

export default function UpdateAsset() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const navigate = useNavigate()

    const { id } = useParams();
    let assetId = JSON.parse(JSON.stringify(id))
    
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [quantity, setQuantity] = useState()
    const [currentPrice, setCurrentPrice] = useState()
    const [askPrice, setAskPrice] = useState()
    const [bidPrice, setBidPrice] = useState()
    
    useEffect(() => {
        fetchAsset(assetId);
    }, [assetId])

    async function fetchAsset(assetId) {
        let result = await axios.get('api/Assets/' + assetId)
        setName(JSON.parse(JSON.stringify(result.data.name)));
        setDescription(JSON.parse(JSON.stringify(result.data.description)));
        setQuantity(JSON.parse(JSON.stringify(result.data.quantity)));
        setCurrentPrice(JSON.parse(JSON.stringify(result.data.currentPrice)));
        setAskPrice(JSON.parse(JSON.stringify(result.data.askPrice)));
        setBidPrice(JSON.parse(JSON.stringify(result.data.bidPrice)));
    }

    async function updateAsset(e) {
        e.preventDefault()

        let update = { name, description, quantity, currentPrice, askPrice, bidPrice}
        let json = JSON.stringify(update);

        await axios.put('/api/assets/' + assetId, json, { headers: { 'Content-Type': 'application/json' } })
            .then(
                navigate("/Assets/")
            )
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Container>
                <h2>Edit Assets</h2>
                <br />
                <div className="col-sm-4 offset-sm-4">
                    <Form onSubmit={updateAsset}>
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
                            <button id="submit" value="submit" className="btn btn-success">Edit</button>
                            <br />
                        </fieldset>
                    </Form>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
