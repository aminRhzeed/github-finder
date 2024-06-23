import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`
  }
})

export const GithubProvider = ({children}) => {
    const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get Initial Users (testing)
    const searchUsers = async (text) => {
      setLoading()

      const params = new URLSearchParams({
        q: text
      })

      // Fetch Method
      // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      //   headers: {
      //     Authorization: `token ${GITHUB_TOKEN}`
      //   }
      // })
      // const {items} = await response.json()

      // Axios Method
      const response = await github.get(`/search/users?${params}`)
      const {items} = await response.data
      // return response.data.items

      dispatch({
        type: 'GET_USERS',
        payload: items,
      })
    }

    // Get Single User
    // const getUser = async (login) => {
    //   setLoading()

    //   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    //     headers: {
    //       Authorization: `token ${GITHUB_TOKEN}`
    //     }
    //   })

    //   if(response.status === 404) {
    //     window.location= '/notfound'
    //   } else {
    //   const data = await response.json()
    //   dispatch({
    //     type: 'GET_USER',
    //     payload: data,
    //   })
    //   }
    // }

    
    // // Get User REPOS
    // const getUserRepos = async (login) => {
    //   setLoading()
      
    //   const params = new URLSearchParams({
    //     sort: 'created',
    //     per_page: 10,
    //   })

    //   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    //     headers: {
    //       Authorization: `token ${GITHUB_TOKEN}`
    //     }
    //   })
    //   const data = await response.json()

    //   dispatch({
    //     type: 'GET_REPOS',
    //     payload: data,
    //   })
    // }

    // Get User And Repos
    const getUserAndRepos = async(login) => {
      
      setLoading()

      const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`, {
          params: { sort: 'created', per_page: 10 },
        })
      ])

      if (user.status === 404) {
        window.location = '/notfound';
      } else {
        return {
          user: user.data, repos: repos.data
        }
      }

    }
  
    // Clear Users
    // const clearUsers = () => dispatch({
    //   type: 'CLEAR_USERS',
    // })

    // Set Loading
    const setLoading = () => dispatch({
      type: 'SET_LOADING',
    })

    return <GithubContext.Provider value={{
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        ...state,
        dispatch,
        searchUsers,
        // clearUsers,
        // getUser,
        // getUserRepos,
        getUserAndRepos
    }}>
        {children}
    </GithubContext.Provider>
} 

export default GithubContext;