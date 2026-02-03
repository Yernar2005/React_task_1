import LoginButton from './LoginButton'
import Logo from './Logo'
import UserName from './UserName'
import './index.css'

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <div className="user-info">
      <UserName />
      <LoginButton />
      </div>
    </header>
  )
}

export default Header