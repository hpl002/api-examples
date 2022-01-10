/*  !!! READ THIS !!!
 *
 *  Never store the CLIENT_ID or the CLIENT_SECRET
 *  in a client application like we do here.
 *  This sample application is for demonstrational
 *  purposes, ONLY, and does not adhere to this advice!
 *
 *  USER_ID is your social security number (also used
 *  with BankID).
 *
 *  CLIENT_ID (Applikasjonsnøkkel) and CLIENT_SECRET
 *  (Passord) can be obtained from here:
 *  https://secure.sbanken.no/Personal/ApiBeta/Info
 */
export const USER_ID                 = ''
export const CLIENT_ID               = ''
export const CLIENT_SECRET           = ''

/* You don't need to touch this */
export const ENDPOINT_IDENTITYSERVER = 'https://auth.sbanken.no/identityserver/connect/token'
export const ENDPOINT_API            = 'https://publicapi.sbanken.no/apibeta'
export const ENDPOINT_CUSTOMERS      = '/api/v1/customers'
export const ENDPOINT_ACCOUNTS       = '/api/v1/accounts/{accountId}'
export const ENDPOINT_TRANSACTIONS   = '/api/v1/transactions/{accountId}'
export const ENDPOINT_TRANSFERS      = '/api/v1/transfers'
