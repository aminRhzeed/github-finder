import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className='hero'>
      <div className="text-center hero-content">
        <div className="msx-w-lg">
          <h1 className="text-8xl font-bold mb-8">Oooops!</h1>
          <p className="text-5xl mb-8">404 - Page not Found!</p>
          <Link to='/' className='btn btn-primary btn-md text-white'>
            <FaHome className='' />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
