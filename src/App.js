import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faImage, faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

//     {
//         'id':100,
//         'Vendor':'venu',
//         'Amount':'$18,000',
//         'Invoice':1123,
//         'Date':'02/07/2021'
//     },
//     {
//        'id':200,
//        'Vendor':'venu',
//        'Amount':'$18,000',
//        'Invoice':1123,
//        'Date':'02/07/2021'
//    },
//    {
//        'id':300,
//        'Vendor':'venu',
//        'Amount':'$18,000',
//        'Invoice':1123,
//        'Date':'02/07/2021'
//    }
    state = { 
        isLoading:false,
        invoices:[]
     }

     remove(id){
            let updatedInvoices = [...this.state.invoices].filter(i => i.id !== id);
            this.setState({invoices : updatedInvoices});
            
     }


     async componentDidMount(){
              const response = await fetch('https://putzdfkyn9.execute-api.us-east-2.amazonaws.com/Dev');
              const body = await response.json();
              this.setState({invoices:body, isLoading:false});

     }

    render() { 

        const isLoading = this.state.isLoading;
        const allInvoices = this.state.invoices;
        

        if(isLoading){
            return (
                <div>Loading....</div>
            );
        }

        let invoices = allInvoices.map(invoice => 
            <tr key = {invoice.id}>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Amount}</td>
                <td>{invoice.Invoice}</td>
                <td>{invoice.Date}</td>
                <td><Button className='btn btn-lg btn-success' onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faThumbsUp} /> Ok </Button></td>
                <td><Button className='btn btn-lg btn-danger' onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faThumbsDown} /> NOTOK </Button></td>
                <td><Button className='btn btn-lg btn-info' onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50% </Button></td>
                <td><Button className='btn btn-lg btn-warning' onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faSearchDollar} /> ?? </Button></td>
                <td><Button className='btn btn-lg btn-info' onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faImage} /> Image </Button></td>
            </tr>
        )
        return ( 
             <div className='container border border-secondary rouded center'>

                <div className='row'>

                    <div className='col-12'>
                           <h4>Pending Invoices</h4>

                    </div>


                </div>

                <div className='row'>
                    <div className='.col-xs-12 center text-center'>
                         <Table dark responsive stripped bordered hover>
                           <thead>
                             <tr>
                            <th>Vendor</th>
                            <th>Amount</th>
                            <th>Invoice #</th>
                            <th>Date</th>
                            <th colSpan='4'>Actions</th>
                            <th>Image</th>
                            </tr>
                           </thead>

                           <tbody>
                                   {this.state.invoices.length === 0 ? <td colSpan='9'>All caught up!</td> : invoices}
                           </tbody>

                         </Table>
                      


                    </div>


                </div>

             </div>
        

            );
    }
}
 
export default App;