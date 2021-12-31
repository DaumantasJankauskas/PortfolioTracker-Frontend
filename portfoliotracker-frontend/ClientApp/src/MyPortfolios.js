import React, { useEffect, useState, useMemo } from 'react'
import Header from './components/header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './components/footer';

export default function MyPortfolios() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [data, setData] = useState([]);

    useEffect(() => {
    })

    useMemo(()=>{
        fetchPortfolios();
    }, [])

    async function fetchPortfolios() {
        let result = await axios.get('/api/portfolios')
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function deletePortfolio(id) {
        let url = '/api/portfolios/' + id;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetchPortfolios();
    }


    if(data === undefined)
    {
        return <></>
    }


     function fetchPortfolio(id) {
        let result = axios.get('/api/portfolios/' + id).then(r=>JSON.parse(JSON.stringify(r.data)))
        return result
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <h2>Portfolios menu</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        <Link to={"/AddPortfolio"} ><Button variant='success' size='sm' className='my-1'>Add portfolio</Button></Link>
                        <br />
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Portfolio</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.value}</td>
                                        <td>
                                            <Link to={"/updatePortfolio/" + item.id}><Button variant="info" size="sm">Edit</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deletePortfolio(item.id)}>Delete</Button>
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
