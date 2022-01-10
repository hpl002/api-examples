from oauthlib.oauth2 import BackendApplicationClient
import requests
from requests_oauthlib import OAuth2Session
import urllib.parse

auth_url = "https://auth.sbanken.no"
api_url = "https://publicapi.sbanken.no/apibeta"

def enable_debug_logging():
    import logging

    import http.client
    http.client.HTTPConnection.debuglevel = 1
    logging.basicConfig()
    logging.getLogger().setLevel(logging.DEBUG)
    requests_log = logging.getLogger("requests.packages.urllib3")
    requests_log.setLevel(logging.DEBUG)
    requests_log.propagate = True


def create_authenticated_http_session(client_id, client_secret) -> requests.Session:
    oauth2_client = BackendApplicationClient(client_id=urllib.parse.quote(client_id))
    session = OAuth2Session(client=oauth2_client)
    token = session.fetch_token(
        token_url=f'{auth_url}/identityserver/connect/token',
        client_id=urllib.parse.quote(client_id),
        client_secret=urllib.parse.quote(client_secret)
    )
    return session


def get_customer_information(http_session: requests.Session, customerid):
    response_object = http_session.get(
        f"{api_url}/api/v1/Customers",
        headers={'customerId': customerid}
    )
    response = response_object.json()

    if not response["isError"]:
        return response["item"]
    else:
        raise RuntimeError("{} {}".format(response["errorType"], response["errorMessage"]))


def get_accounts(http_session: requests.Session, customerid):
    response_object = http_session.get(
        f"{api_url}/api/v1/Accounts",
        headers={'customerId': customerid}
    )
    response = response_object.json()

    if not response["isError"]:
        return response["items"]
    else:
        raise RuntimeError("{} {}".format(response["errorType"], response["errorMessage"]))


def main():
    # enable_debug_logging()
    import api_settings
    import pprint

    http_session = create_authenticated_http_session(api_settings.CLIENTID, api_settings.SECRET)

    customer_info = get_customer_information(http_session, api_settings.CUSTOMERID)
    pprint.pprint(customer_info)

    accounts = get_accounts(http_session, api_settings.CUSTOMERID)
    pprint.pprint(accounts)


if __name__ == "__main__":
    main()