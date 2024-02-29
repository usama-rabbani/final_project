'use client'

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Payment = () => {
//   const [clientToken, setClientToken] = useState('');
//   const [instance, setInstance] = useState(null);
//   const [purchaseComplete, setPurchaseComplete] = useState(false);

//   useEffect(() => {
//     // Fetch the client token from your server (backend) using an API endpoint
//     axios.get('http://localhost:8080/api/vi/product/checkout')
//       .then((response) => setClientToken(response.data.clientToken))
//       .catch((error) => console.error(error));
//   }, []);

//   const handlePayment = async () => {

//     try {
//       if (instance) {
//         const { nonce } = await instance.requestPaymentMethod();

//         const response = await axios.post('http://localhost:8080/api/vi/product/paymentpost', {
//           paymentMethodNonce: nonce,
//           user_id: "1234"
//         });

//         if (response.data.result === "success") {
//           setPurchaseComplete(true);
//         }
//         else{response.data}
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
// console.log(handlePayment,'abc');
//   return (
//     <div>
//       <h1>Payment Page</h1>
//       <div id="dropin-container"></div>
//       <button onClick={handlePayment} disabled={purchaseComplete}>
//         {purchaseComplete ? 'Payment Complete' : 'Pay Now'}
//       </button>
//     </div>
//   );
// };
//https://codesandbox.io/p/sandbox/github/mannycolon/braintree-nextjs-example/tree/master
// export default Payment;




import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { BraintreeHostedFields } from 'braintree-web-drop-in-react'



class Index extends Component {
  state = {
    clientToken: null
  }

  instance

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get('http://localhost:8080/api/braintree/v1/getToken')
      const clientToken = response.data.clientToken

      this.setState({ clientToken })
    } catch (err) {
      console.error(err)
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.tokenize()

      const response = await axios.post(
        'http://localhost:8000/api/braintree/v1/sandbox',
        { paymentMethodNonce: nonce }
      )

      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div className="container">
          <BraintreeHostedFields
            className="drop-in-container"
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          >
            <form id="cardForm">
              <label className="hosted-fields--label">Card Number</label>
              <div id="card-number" className="hosted-field"></div>

              <label className="hosted-fields--label">Expiration Date</label>
              <div id="expiration-date" className="hosted-field"></div>

              <label className="hosted-fields--label">CVV</label>
              <div id="cvv" className="hosted-field"></div>

              <label className="hosted-fields--label">Postal Code</label>
              <div id="postal-code" className="hosted-field"></div>
            </form>
          </BraintreeHostedFields>
          <button className="submit" onClick={this.buy.bind(this)}>Submit</button>
        </div>
      )
    }
  }
}

Index.propTypes = {
  title: PropTypes.string
}

export default Index