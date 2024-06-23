import { FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import { useEffect, useContext } from "react"
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import RepoList from '../components/repos/RepoList'
import GithubContext from "../context/github/GithubContext"

function User() {
  const { user, loading, repos, getUserAndRepos, dispatch } = useContext(GithubContext)
  const params = useParams()

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login)
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData})
    }

    getUserData()

  }, [dispatch, params.login])

  const { name, type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers, following, public_repos, public_gists, hireable,} = user

  if(loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className="mb-4">
          <Link to='/' className='btn btn-ghost'>Back to Search</Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-9 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="col-span-1 xl:col-span-2 lg:col-span-1 md:col-span-1">
            <div className="card w-full bg-base-100 image-full shadow-xl">
              <figure className='overflow-hidden'>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end p-6">
                <h2 className="card-title mb-0 text-white">{name}</h2>
                <p className="text-white flex-grow-0">{login}</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 xl:col-span-7 lg:col-span-2 md:col-span-2">
            <div className="mb-6">
              <div className="card-title items-center gap-4 mb-4">
                <h1 className='text-3xl uppercase'>{name}</h1>
                <div className="badge badge-success mt-1">{type}</div>
                {hireable && (
                  <div className="badge badge-info mt-1">Hireable</div>
                )}
              </div>
              <p className='text-lg'>{bio}</p>
              <div className="mt-6 card-actions">
                <a href={html_url} target='_blank' rel='noreferrer' className='btn btn-outline'>Visit Github Profile</a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-sm bg-base-200 stats">
              {location && (
                <div className='stat'>
                  <div className="stat-title text-md">Location</div>
                  <div className="text-base stat-value">{location}</div>
                </div>
              )}
              {blog && (
                <div className='stat'>
                  <div className="stat-title text-md">Website</div>
                  <a href={`https://${blog}`} target='_blank' rel='noreferrer' className="text-base stat-value">{blog}</a>
                </div>
              )}
              {twitter_username && (
                <div className='stat'>
                  <div className="stat-title text-md">Website</div>
                  <a href={`https://twitter.com/${twitter_username}`} target='_blank' rel='noreferrer' className="text-base stat-value">{twitter_username}</a>
                </div>
              )}
            </div>
          </div>
        </div> 
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 w-full py-4 mb-6 rounded-lg shadow-md bg-base-100 gap-x-4 border border-gray-50 border-opacity-25">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className='text-3xl md:text-5xl'/>
            </div>
            <div className="stet-title pr-5 mb-1">Followers</div>
            <div className="stat-value pr-5 text-2xl md:text-3xl">{followers}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className='text-3xl md:text-5xl'/>
            </div>
            <div className="stet-title pr-5 mb-1">Following</div>
            <div className="stat-value pr-5 text-2xl md:text-3xl">{following}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className='text-3xl md:text-5xl'/>
            </div>
            <div className="stet-title pr-5 mb-1">Public Repos</div>
            <div className="stat-value pr-5 text-2xl md:text-3xl">{public_repos}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className='text-3xl md:text-5xl'/>
            </div>
            <div className="stet-title pr-5 mb-1">Public Gists</div>
            <div className="stat-value pr-5 text-2xl md:text-3xl">{public_gists}</div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>
    </>
  )
}

export default User
