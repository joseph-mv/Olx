import React, { useContext, useEffect, useState } from 'react';
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
import { SearchProductListContext } from '../../store/SearchProductListContext';
import {  collection, getDocs,  query } from "firebase/firestore";
import { db } from "../../firebase/config";

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const {setSearchProductList}=useContext(SearchProductListContext)
  const [products, setProducts] = useState([]);
  const [showLan,setShowLan]=useState(false)
  
  console.log('head')
  useEffect(() => {
    
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'));
      
      const querySnapshot = await getDocs(q);
      console.log((querySnapshot))
      const productsList =querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id };
      });
      setProducts(productsList)
      const filteredProducts = productsList.filter(product=>product.userId!==user?.uid)
      setSearchProductList(filteredProducts)
      console.log('filter',filteredProducts)
    };

    fetchProducts();
  }, [user]);

  const handleSearch=(e)=>{
    // console.log(e.target.value)
    // setSearchTerm(e.target.value)
    let searchTerm=e.target.value
    const filteredProducts=products.filter(product=> product.userId!==user?.uid&&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase())||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())))
    
  //  console.log('search',filteredProducts)
     
   setSearchProductList(filteredProducts)
  }
  // console.log(user?.uid)
 
  


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
            onChange={handleSearch}
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
