import gql from 'graphql-tag'
export const ALL_TRANSACTIONS_QUERY = gql`
  query AlltransactionsQuery {
    transactions {
        id
        transaction
        pan
        terminalId
        date_time
        spec
        resp
        utrnno
        req
        res
    }
  }
`