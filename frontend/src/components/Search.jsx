import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { user } = useSelector((store) => store.auth); // suggestedUsers removed as not used
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allUsers1 = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/user/getalluser/${user?._id}`);
        const usernameAll = response.data.allUser;
        
        // Fixing the map to return objects correctly
        const usernames = usernameAll.map((user1) => ({ username: user1.username, _id: user1._id }));
        setSuggestions(usernames);
        console.log(usernames); // Check fetched usernames
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user?._id) {
      allUsers1();
    }
  }, [user?._id]); // Trigger effect when user._id changes

  const handleToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion?.username && suggestion.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full p-4 pr-10 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 z-10">
          {query && filteredSuggestions.length > 0 && (
            <ul className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setQuery(suggestion.username);
                    setSuggestions([]);
                    handleToProfile(suggestion._id);
                  }}
                >
                  {suggestion.username}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
