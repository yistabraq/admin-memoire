import gql from 'graphql-tag'

export const ALL_PROJECTS_QUERY = gql`
  query AllProjectsQuery {
    projects {
        id
        name
        category
        spec
        membres
        transactions{
          id
          name
          status
        }
        status
    }
  }
`
export const ADD_PROJECT_MUTATION = gql`
  mutation createProjectMutation($input: ProjectInput) {
    createProject(
      input: $input
    ) {
        id
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProjectMutation($id: ID!) {
    deleteProject(
      id: $id
    ) {
        id
    }
  }
`
export const ALL_SPECS_QUERY = gql`
  query AllspecsQuery {
    specs {
        id
        name
    }
  }
`
export const ALL_TRANSACTIONTYPES_QUERY = gql`
  query AllTransactionTypesQuery($category: String, $spec:String) {
    transactionTypes(
      category: $category
      spec:$spec
    ) {
        id
        name
        mti
        type
        spec
        category
    }
  }
`