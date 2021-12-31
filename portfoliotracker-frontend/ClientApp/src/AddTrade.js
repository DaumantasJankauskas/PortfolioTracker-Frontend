import React, { useState } from 'react'
import Header from './components/header'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer';

export default function AddTrade() {

    const navigate = useNavigate()

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [name, setName] = useState()
    const [quantity, setQuantity] = useState()
    const [asset, setAsset] = useState()
    const [averagePrice, setAveragePrice] = useState()
    const [executionDate, setExecutionDate] = useState()
    const [portfolio, setPortfolio] = useState()

    async function addPortfolio(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Quantity", quantity);
        formData.append("Asset", asset);
        formData.append("AveragePrice", averagePrice);
        formData.append("ExecutionDate", executionDate);
        formData.append("Portfolio", portfolio);
    
        var json = JSON.stringify(Object.fromEntries(formData));

        await axios.post('/api/portfolios/' + portfolio + '/trades/', json, {headers: {'Content-Type': 'application/json, text/plain'}})
            .then(response => {
                let result = JSON.parse(JSON.stringify(response.data))
                console.log(result);
                navigate("/Trades/")
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
                <h2>Add Trade</h2>
                <br />
                <Container>
                    <Form onSubmit={addPortfolio}>
                        <fieldset>
                            <label htmlFor='name'>Name:</label>
                            <input type="text" name='name' value={name || ''} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required />
                            <br />
                            <label htmlFor='quantity'>Quantity:</label>
                            <input type="number" name='quantity' value={quantity || ''} onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Quantity" />
                            <br />
                            <label htmlFor='asset'>Asset:</label>
                            <input type="number" name='asset' value={asset || 0}  onChange={(e) => setAsset(e.target.value)} className="form-control" placeholder="Asset" required />
                            <br />
                            <label htmlFor='averagePrice'>Average Price:</label>
                            <input type="number" name='averagePrice' value={averagePrice || 0}  onChange={(e) => setAveragePrice(e.target.value)} className="form-control" placeholder="AveragePrice" required />
                            <br />
                            <label htmlFor='executionDate'>Execution Date:</label>
                            <input type="date" name='executionDate' value={executionDate} onChange={(e) => setExecutionDate(e.target.value)} className="form-control" placeholder="ExecutionDate" />
                            <br />
                            <label htmlFor='portfolio'>Portfolio:</label>
                            <input type="number" name='portfolio' value={portfolio || 0}  onChange={(e) => setPortfolio(e.target.value)} className="form-control" placeholder="Portfolio" required />
                            <br />
                            
                            <button id="submit" value="submit" className="btn btn-success">Add</button>
                            <Link to={"/Trades/"} ><Button variant='danger' className='my-1 m-1'>Back to list</Button></Link>
                        </fieldset>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div >
    )
}
