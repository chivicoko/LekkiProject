import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddProperty from './AddProperty';




const UpdateProperty = () => {
    const location = useLocation();
    let id;
    if (location.state) {
      id = location.state.id;
    }else {
      return (
        <div><h2>Access Denied: You are requesting a page wrongly. Go to <Link to="/properties">All properties page</Link> and choose the property to update.</h2></div>
      )
    }

    
  return (
    <AddProperty 
        update = {true}
        propId = {id}
        />
  )
}

export default UpdateProperty
