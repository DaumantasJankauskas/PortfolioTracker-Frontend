import React, { useEffect, useState } from 'react'
import Header from './components/header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './components/footer';

export default function Assets() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAssets();
    }, [])

    async function deleteAsset(id) {
        let url = '/api/assets/' + id;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchAssets();
    }

    async function fetchAssets() {
        let result = await axios.get('/api/assets')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <h2>Assets management</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        <Link to={"/AddAsset"} ><Button variant='success' size='sm' className='my-1'>Add asset</Button></Link>
                        <br />
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Asset</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>CurrentPrice</th>
                                <th>AskPrice</th>
                                <th>BidPrice</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.currentPrice}</td>
                                        <td>{item.askPrice}</td>
                                        <td>{item.bidPrice}</td>
                                        <td>
                                            <Link to={"/UpdateAsset/" + item.id}><Button variant="info" size="sm">Edit</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteAsset(item.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
