import gql from 'graphql-tag'
export const ALL_SPECS_QUERY = gql`
  query AllSpecsQuery {
    specs {
        id
        name
        pinField
        numberOfField
        version
        fields{
            field
            description
            contentType
            lenType
            maxLen
            category
        }
        codeResponse{
            code
            message
        }
        messageType{
            value
            description
        }
        processingCode {
            code
            description
        }
    }
  }
`
export const ADD_SPEC_MUTATION = gql`
  mutation createSpec($input: SpecInput) {
    createSpec(
      input: $input
    ) {
        id
        name
        pinField
        numberOfField
        version
        fields{
            field
            description
            contentType
            lenType
            maxLen
            category
        }
        codeResponse{
            code
            message
        }
        messageType{
            value
            description
        }
        processingCode {
            code
            description
        }
    }
  }
`

export const DELETE_SPEC_MUTATION = gql`
  mutation DeleteSpecMutation($id: ID!) {
    deleteSpec(
      id: $id
    ) {
        id
        name
        pinField
        numberOfField
        version
        fields{
            field
            description
            contentType
            lenType
            maxLen
            category
        }
        codeResponse{
            code
            message
        }
        messageType{
            value
            description
        }
        processingCode {
            code
            description
        }
    }
  }
`
export const GET_SPEC_QUERY = gql`
  query AllSpecsQuery($input : spec) {
    specs(name:$input) {
        id
        name
        pinField
        numberOfField
        version
        fields{
            field
            description
            contentType
            lenType
            maxLen
            category
        }
        codeResponse{
            code
            message
        }
        messageType{
            value
            description
        }
        processingCode {
            code
            description
        }
    }
  }
`