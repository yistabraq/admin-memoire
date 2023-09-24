/* eslint-disable no-console */
import Vapi from 'vuex-rest-api'

const Users = new Vapi({
    baseURL: "https://localhost:8080/user",
      state: {
        Users: []
      }
    })
    // Step 3
    .get({
      action: "getUser",
      property: "User",
      path: ({ id }) => `/Users/${id}`,
      // eslint-disable-next-line no-unused-vars
      onSuccess(state, payload, axios, { params, data }) {
        // if you define the onSuccess function you have to set the state by yourself
        state.post = payload.data;
        console.log(`Post with id ${params.id} successfully fetched.`);
      },
      onError(state, error, axios, { params, data }) {
        // if you define the onSuccess function you have to set the state by yourself
        // eslint-disable-next-line no-console
        console.log('error : ', error)
        console.log('axios : ', axios)
        console.log('params : ', params)
        console.log('data : ', data)
        state.post = null;
      }
    })
    .get({
      action: "listUsers",
      property: "Users",
      path: "/Users"
    })
    .post({
      action: "addUser",
      property: "User",
      path: "/Users"
    })
    .post({
      action: "updateUser",
      property: "User",
      path: ({ id }) => `/Users/${id}`
    })
    .delete({
        action:"deleteUser",
        property:'User',
        path: ({ id }) => `/Users/${id}`
    })
    // Step 4
    .getStore()
  export default Users