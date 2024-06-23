import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import PropTypes from 'prop-types'

function RepoItem({repo}) {
    const { name, description, html_url, forks, open_issues, watchers_count, stargazers_count } = repo
  
    return (
        <div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900'>
            <div className="card-body py-6">
                <h3 className="mb-0 text-xl font-semibold">
                    <a href={html_url} target='_blank' rel='noreferrer'>
                        <FaLink className='inline mr-2 text-base' />
                        {name}
                    </a>
                </h3>
                <p className="mb-4">{description}</p>
                <div>
                    <div className="mr-2 badge badge-info badge-lg text-sm text-white py-2">
                        <FaEye className='mr-2' />
                        {watchers_count}
                    </div>
                    <div className="mr-2 badge badge-success badge-lg text-sm text-white py-2">
                        <FaStar className='mr-2' />
                        {stargazers_count}
                    </div>
                    <div className="mr-2 badge badge-error badge-lg text-sm text-white py-2">
                        <FaInfo className='mr-2' />
                        {open_issues}
                    </div>
                    <div className="mr-2 badge badge-warning badge-lg text-sm text-white py-2">
                        <FaUtensils className='mr-2' />
                        {forks}
                    </div>
                </div>
            </div>
        </div>
    )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired
}

export default RepoItem
