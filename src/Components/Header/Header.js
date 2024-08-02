import React, { useContext, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/FirebaseContext';
import { useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TiTick } from "react-icons/ti";

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [showLan,setShowLan]=useState(false)

  const handleLanguage=()=>{
    setShowLan(!showLan)
  }
  const { i18n,t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
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
        <div onClick={()=>navigate('/')} className="brandName">
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
              placeholder={t("FIND_CAR_MOBILE_PHONE_AND_MORE")}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div onClick={handleLanguage} className="language">
          <span > {t('LANGUAGE')} </span>
          <div className={showLan&&'rotArrow'}><Arrow></Arrow></div>
          
          <div className={`languages ${showLan&&'showLanguage'} `}>
          <span  onClick={() => changeLanguage('en')} > ENGLISH {t('LANGUAGE')==="ENGLISH"&&<TiTick className='tickIcon' />}</span>
          <span onClick={() => changeLanguage('hi')} >
            हिंदी {t('LANGUAGE')==="हिंदी"&&<TiTick className='tickIcon' />}</span>
          </div>
        </div>
    <div className='loginAndsell'>
        <div className="loginPage">
          {user ? (
            <span >
              {user.displayName}
            </span>
          ) : (
            <span onClick={() => {

              navigate('/login')}}>{t('LOGIN')}</span>
          )}

          {/* <span>{user ? onclick = () => { navigate }; user.displayName:'Login'}</span> */}
          <hr />
        </div>
        <div>{user && <span onClick={() => { handleSignout() }}>{t('LOGOUT')}</span>}</div>


        <div onClick={()=>{navigate('/sell')}} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >{t('SELL')}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
