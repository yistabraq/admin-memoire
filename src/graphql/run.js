import gql from 'graphql-tag'
export const ALL_SPECS_QUERY = gql`
  query AllSpecsQuery {
    specs {
        name
        pinField
    }
  }
`
export const ALL_CARDS_QUERY = gql`
  query AllCardsQuery {
    cards {
      track2
      pin
    }
  }
`
export const ALL_TERMINALS_QUERY = gql`
  query AllTerminalsQuery {
    terminals {
      terminalId
      merchantId
      country
    }
  }
`
export const ALL_TRANSACTIONTYPES_QUERY = gql`
  query AllTransactionTypesQuery($category: String,$spec: String ) {
    transactionTypes(
      category: $category
      spec:$spec
    ) {
        id
        name
        mti
        type
        code
        fields{
            field
            value
            description
            action
            category
        }
    }
  }
`
export const ADD_TRASACTION_MUTATION = gql`
  mutation createTransaction($input: TransactionInput) {
    createTransaction(
      input: $input
    ) {
        message
    }
  }
`