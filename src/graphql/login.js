import gql from 'graphql-tag'

export const LOGIN = gql`
mutation LoginMutation($input: InputLogin) {
  login(
    input: $input
  ) {
      token
  }
}
`

