import gql from 'graphql-tag'
export const ALL_NETWORKS_QUERY = gql`
  query AllNetworksQuery {
    networks {
        id
        ip
        port
        spec
        zpk
        zmk
    }
  }
`
export const ADD_NETWORK_MUTATION = gql`
  mutation createNetwork($input: NetworkInput) {
    createNetwork(
      input: $input
    ) {
        id
        ip
        port
        spec
        zpk
        zmk
    }
  }
`

export const DELETE_NETWORK_MUTATION = gql`
  mutation DeleteNetworkMutation($id: ID!) {
    deleteNetwork(
      id: $id
    ) {
        id
        ip
        port
        spec
        zpk
        zmk

    }
  }
`
export const ALL_SPECS_QUERY = gql`
  query AllspecsQuery {
    specs {
        name
    }
  }
`