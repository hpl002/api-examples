using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace SampleApplication
{
    public class Program
    {
        private static async Task Main()
        {
            await RunAsync();
        }

        static async Task RunAsync()
        {
            /* 
            Client credentials and customerId

            Here Oauth2 is being used with "client credentials": The "client" is the application, and we require a secret 
            known only to the application.
             */

            var clientId = "***************";
            var secret = "****************";

            // Setup constants
            var discoveryEndpoint = "https://auth.sbanken.no/identityserver";
            var apiBaseAddress = "https://publicapi.sbanken.no/apibeta/";

            var myCreator = new TextWriterTraceListener(System.Console.Out);
            Trace.Listeners.Add(myCreator);

            /*
             * Connect to Sbanken
             *
             * Here the application connect to the identity server endpoint to retrieve a access token.
             */



            // First: get the OpenId configuration from Sbanken.
            var discoHttpClient = new HttpClient();
            var discoveryDocumentResponse = await discoHttpClient.GetDiscoveryDocumentAsync(discoveryEndpoint);


            if (discoveryDocumentResponse.Error != null)
            {
                throw new Exception(discoveryDocumentResponse.Error);
            }

            // The application now knows how to talk to the token endpoint.

            var tokenClient = new HttpClient();

            // Second: the application authenticates against the token endpoint

            var tokenRequest = new ClientCredentialsTokenRequest()
            {
                Address = discoveryDocumentResponse.TokenEndpoint,
                ClientId = clientId,
                ClientSecret = secret
            };

            var tokenResponse = await tokenClient.RequestClientCredentialsTokenAsync(tokenRequest);

            if (tokenResponse.IsError)
            {
                throw new Exception(tokenResponse.ErrorDescription);
            }

            // The application now has an access token.

            var httpClient = new HttpClient()
            {
                BaseAddress = new Uri(apiBaseAddress)
            };

            // Finally: Set the access token on the connecting client. 
            // It will be used with all requests against the API endpoints.
            httpClient.SetBearerToken(tokenResponse.AccessToken);

            // The application retrieves the customer's information.
            var customerResponse = await httpClient.GetAsync("api/v1/Customers");
            var customerResult = await customerResponse.Content.ReadAsStringAsync();

            Trace.WriteLine($"CustomerResult:{customerResult}");

            // The application retrieves the customer's accounts.
            var accountResponse = await httpClient.GetAsync("api/v1/Accounts");

            var accountResult = await accountResponse.Content.ReadAsStringAsync();

            var serializeOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var accountsList = JsonSerializer.Deserialize<AccountsList>(accountResult, serializeOptions);

            Trace.WriteLine($"AccountResult:{accountResult}");

            if (accountsList != null)
            {
                var spesificAccountResponse = await httpClient.GetAsync($"api/v1/Accounts/{accountsList.Items[0].AccountId}");
                var spesificAccountResult = await spesificAccountResponse.Content.ReadAsStringAsync();

                Trace.WriteLine($"SpesificAccountResult:{spesificAccountResult}");
            }
        }
    }
}


