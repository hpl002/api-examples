import React, { Component } from 'react'
import Account from './Account'

class AccountList extends Component {


  constructor(props) {
    super(props);
    this.state = {
        access_token : props.access_token,
        accounts :
          [
          ],
    }
  }

  componentDidMount() {

    let _this = this;
    var accountServiceUrl = this.props.config.accountServiceUrl
    var accountRequest = new Request(accountServiceUrl);
    var reqHeaders = new Headers();
    reqHeaders.append('Accept', 'application/json');
    reqHeaders.append('Authorization', 'Bearer '+ this.state.access_token);
    reqHeaders.append('customerId', this.props.config.customerId)

    var initConfig = {
        method : 'GET',
        headers : reqHeaders,
      };

    fetch(accountRequest, initConfig).then(function(response) {
        response.json().then(function(result) {
        _this.setState({ accounts : result.items });
      })
      });
  }

  render() {
      var i = 0;
      if(this.state.accounts.size < 0) {
        return <div>Loading...</div>
      }
      return(
        <div>
        {
          this.state.accounts.map((account) =>
            <Account key={i++} accountData={account} />

        )
        }
        </div>
      )
    }
}

export default AccountList;
