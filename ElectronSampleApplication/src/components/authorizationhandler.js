
import React, { Component } from 'react';

export default function AuthorizationHandler(config, callback) {


    var basicAuth = btoa(encodeURIComponent(config.clientId) + ":" + encodeURIComponent(config.secret));
    var authRequest = new Request(config.identityServerUrl);
    var reqHeaders = new Headers();
    reqHeaders.append('Accept', 'application/json');
    reqHeaders.append('Authorization', 'Basic '+ basicAuth);
    reqHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    var payload = {
      grant_type: "client_credentials"
    }

    var initConfig = {
            method : 'POST',
            headers : reqHeaders,
            body: 'grant_type=client_credentials'
          };

      var response = fetch(authRequest, initConfig).then(function(response) {
              response.json().then(function(result) {
                  callback(result.access_token)
              });
            });

      return response;

}
