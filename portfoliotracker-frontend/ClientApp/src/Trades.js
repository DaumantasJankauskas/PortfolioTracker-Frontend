import React, { useEffect, useState, useMemo } from 'react'
import Header from './components/header'
import { Table, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Footer from './components/footer';

export default function Trades() {

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");

    const [data, setData] = useState([]);

    useEffect(() => {
     });

     useMemo(()=>{
        fetchTrades();
    }, [])



    async function fetchPortfolios() {
        let result = await axios.get('/api/portfolios/')
        return JSON.parse(JSON.stringify(result.data));
    }

    async function fetchTrades() {
        const portfoliosData = await fetchPortfolios();
        const trades = await Promise.all(portfoliosData.map(portfolio => {
          return axios.get('/api/portfolios/' + portfolio.id + '/trades/')
        }))
   
        setData(trades.map(({data}) => data[0]));
      };
    async function deleteTrade(portfolioId, tradeId) {
        let url = '/api/portfolios/' + portfolioId + '/trades/' + tradeId;
        console.log(url)
        await axios.delete(url)
            .catch(error => {
                console.error('There was an error!', error);
            });
        setData([]);
        fetchTrades();
    }


    if(data === undefined)
    {
        return <></>
    }


     function fetchTrade(portfolioId, tradeId) {
        let result = axios.get('/api/portfolios/' + portfolioId + '/trades/' + tradeId).then(r=>JSON.parse(JSON.stringify(r.data)))
        return result
    }

    return (
        <div className="App">
            <Header />
            <Container>
            <br />
                <h2>Trades management</h2>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <div className='float-end'>
                        <Link to={"/AddTrade"} ><Button variant='success' size='sm' className='my-1'>Add trade</Button></Link>
                        <br />
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Trade</th>
                                <th>Quantity</th>
                                <th>Asset</th>
                                <th>AveragePrice</th>
                                <th>ExecutionDate</th>
                                <th>Portfolio</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data[0].map((item) =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.assetId}</td>
                                        <td>{item.averagePrice}</td>
                                        <td>{item.executionDate}</td>
                                        <td>{item.portfolioId}</td>
                                        <td>
                                            <Link to={"/UpdateTrade/" + item.portfolioId + '/' + item.id}><Button variant="info" size="sm">Edit</Button></Link>
                                            {' '}{' '}{' '}
                                            <Button variant="danger" size="sm" onClick={() => deleteTrade(item.portfolioId, item.id)}>Delete</Button>
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
