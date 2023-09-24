import gql from 'graphql-tag'
export const ALL_TRANSACTIONTYPES_QUERY = gql`
  query AllTransactionTypesQuery($category: String) {
    transactionTypes(
      category: $category
    ) {
        id
        name
        mti
        type
        code
        spec
        fields{
            field
            value
            description
            contentType
            lenType
            maxLen
            action
            category
        }
    }
  }
`

export const ADD_TRASACTIONTYPE_MUTATION = gql`
  mutation createTransactionType($input: TransactionTypeInput) {
    createTransactionType(
      input: $input
    ) {
        id
        name
        mti
        type
        code
        spec
        fields{
            field
            value
            description
            contentType
            lenType
            maxLen
            action
            category
        }
    }
  }
`

export const DELETE_TRANSACTIONTYPE_MUTATION = gql`
  mutation DeleteTransactionTypeMutation($id: ID!) {
    deleteTransactionType(
      id: $id
    ) {
        id
        name
        mti
        type
        spec
        code
        fields{
            field
            value
            description
            contentType
            lenType
            maxLen
            action
            category
        }
    }
  }
`
export const ALL_SPECS_QUERY = gql`
  query AllspecsQuery {
    specs {
        id
        name
        processingCode{
          code
          description
        }
        fields{
            field
            description
            contentType
            lenType
            maxLen
            category
            value
            action
        }
        messageType{
            value
            description
        }
    }
  }
`
