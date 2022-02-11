import React,{ useState,createContext } from 'react';


export const SearchResultContext = createContext();


function SearchResultProvider (props) {

    const [result ,setResult] = useState(0);
    const [id ,setId] = useState(0);

    function updateResult(data){
        setResult(data)
    }

    function updateId(data){
        setId(data)
    }

    const value = {result , updateResult,id,updateId}

    return(
        <SearchResultContext.Provider value={value}>
            {props.children}
        </SearchResultContext.Provider>
    ) 
}


export default SearchResultProvider;