import React from 'react';
import { Search } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';
import './InputField.css';
import { useCallback } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
const InputField = (props) => {
  console.log(props.isLoading);
  console.log(props.address);
  const handleRetrieve = useCallback(
    (res) => {
    const feature = res.features[0];
    console.log(feature)
    
    },
  
    );
  return (
   

    
    <div  className='inputParent'>
     
     <input
     className='inputField'
     
     value={props.isLoading ? "is Loading" : props.address}
     type= {props.type}
     placeholder= {props.placeholder}
     onChange={props.onChange}

     >
     
     
     </input>
    
     <LocationOn
     onClick = {props.onIconClick}
     
     style={{ color: "grey" , fontSize: "40px" } }
     /> 
   
    </div>
  );
}

export default InputField;
