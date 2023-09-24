import gql from 'graphql-tag'
export const ALL_ACCOUNTS_QUERY = gql`
  query AllAccountsQuery {
    accounts {
        id
        account
        balance
        currency
        type
        status
        operation{
            operation
            type
            date
            amount
            old_balance
            new_balance
        }
    }
  }
`
export const ADD_ACCOUNT_MUTATION = gql`
  mutation createAccount($input: AccountInput) {
    createAccount(
      input: $input
    ) {
        id
        account
        balance
        currency
        type
        status
        operation{
            operation
            type
            date
            amount
            old_balance
            new_balance
        }
    }
  }
`

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation($id: ID!) {
    deleteAccount(
      id: $id
    ) {
        id
        account
        balance
        currency
        type
        status
        operation{
            operation
            type
            date
            amount
            old_balance
            new_balance
        }
    }
  }
`