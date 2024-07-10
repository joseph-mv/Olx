import React, { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/FirebaseContext';
import { useNavigate, redirect } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)


  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('signout')
      //  return redirect('/login')
      navigate('/login')

    })
  }


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span onClick={()=>{console.log('english')}}> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span >
              {user.displayName}
            </span>
          ) : (
            <span onClick={() => {
              
              navigate('/login')}}>Login</span>
          )}

          {/* <span>{user ? onclick = () => { navigate }; user.displayName:'Login'}</span> */}
          <hr />
        </div>
        <div>{user && <span onClick={() => { handleSignout() }}>Logout</span>}</div>


        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{navigate('/sell')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
