import gql from 'graphql-tag'
export const ALL_CARDS_QUERY = gql`
  query AllCardsQuery {
    cards {
      id
      track2
      cardholder
      type
      emv
      status
      pin
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
export const ADD_CARD_MUTATION = gql`
  mutation createCard($input: CardInput) {
    createCard(
      input: $input
    ) {
      id
      track2
      cardholder
      type
      emv
      status
      pin
      accounts{
        account
        balance
        type
      }
    }
  }
`

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCardMutation($id: ID!) {
    deleteCard(
      id: $id
    ) {
      id
      track2
      cardholder
      type
      emv
      status
      pin
      accounts{
        account
        balance
        type
      }
    }
  }
`