import { createContext, useState } from "react";


export const SearchProductListContext=createContext()

export function Search ({children}){
    const [searchProductList, setSearchProductList] = useState()
return(
    <SearchProductListContext.Provider value={{searchProductList,setSearchProductList}}>
    {children}
   </SearchProductListContext.Provider>
)
   

  
}
