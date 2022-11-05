import React, {useState} from 'react';
import { Search } from '@material-ui/icons';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const handleSubmit = (e)=> {
    e.preventDefault();
    props.history.push(`/plants/name/${name}`);
  }
  return (
    <div className="searchBox">
      <form className="searchForm" onSubmit={handleSubmit}>
        <input autoFocus={true} name="q" id="q" onChange={e=> setName(e.target.value)} className="searchInput" type="text" placeholder="Search"/>
        <button type="submit" className="searchButton"><Search fontSize="large" htmlColor="gray" /></button>
      </form>
    </div>
  )
}
