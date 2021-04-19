


export default function setup()  {
   
  const customerId = "************";
  
  const config = {
    identityServerUrl : "https://auth.sbanken.no/identityserver/connect/token",
    accountServiceUrl : "https://publicapi.sbanken.no/apibeta/api/v1/accounts/",
    clientId : "************************",
    secret : "************************"
  };

  return config;
}
