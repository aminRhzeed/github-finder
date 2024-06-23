

function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
      <div>
        <p className='text-white'>Copyright &copy; {footerYear} All Right Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
