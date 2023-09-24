import gql from 'graphql-tag'
export const ALL_TERMINALS_QUERY = gql`
  query AllTerminalsQuery {
    terminals {
      id
      terminalId
      merchantId
      type
      formatPinBlock
      emv
      country
      tmk
      tpk
      accounts{
        account
        balance
        type
      }
    }
  }
`
export const ALL_ACCOUNTS_QUERY = gql`
  query AllAccountsQuery {
    accounts {
        account
    }
  }
`
export const ADD_TERMINAL_MUTATION = gql`
  mutation createTerminal($input: TerminalInput) {
    createTerminal(
      input: $input
    ) {
      terminalId
      merchantId
      type
      emv
      formatPinBlock
      country
      tmk
      tpk
      accounts{
        account
        balance
        type
      }
    }
  }
`

export const DELETE_TERMINAL_MUTATION = gql`
  mutation DeleteTerminalMutation($id: ID!) {
    deleteTerminal(
      id: $id
    ) {
      terminalId
      merchantId
      type
      emv
      formatPinBlock
      country
      tmk
      tpk
      accounts{
        account
        balance
        type
      }
    }
  }
`