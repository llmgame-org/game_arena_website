import React, { useState, useEffect} from 'react'
import Profiles from './profiles';
import { Leaderboard as DefaultLeaderboard} from './database';
import UserInfoModal from './userInfoModal';

export default function Board({
    title = "Model LeaderBoard",
    columnnames = ["User Name", "Rank Score"],
    clickEnabled = true,
    Leaderboard = DefaultLeaderboard, // Use default if no data provided
    apiEndpoint = null // Placeholder, won't fetch data until modified
}) {
    const [sortOrder, setSortOrder] = useState("descending"); // State to track sort order
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user data for modal
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    // Fetch data from api
    const [leaderboardData, setLeaderboardData] = useState(Leaderboard);
    const [error, setError] = useState(null); // 3. Added error state for fetch errors

    // Toggle sorting order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "ascending" ? "descending" : "ascending"));
    };

    // Handle changes to the search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Conditionally handle row click based on clickEnabled status
    const handleRowClick = (user) => {
        if (clickEnabled) {
            setSelectedUser(user);
            setIsModalOpen(true);
        }
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };


    // 4. Fetch data when apiEndpoint is provided
    useEffect(() => {
        if (!apiEndpoint) return; // Skip fetch if apiEndpoint is null or empty

        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboard data");
                }
                const data = await response.json();
                setLeaderboardData(data); // Set fetched data to state
            } catch (err) {
                setError(err.message); // 5. Set error message if fetch fails
            }
        };
        fetchData();
    }, [apiEndpoint]); // Re-run fetch if API endpoint changes

    // change the leaderboard with api input
    const rankedData = rankLeaderboard(Leaderboard)
    const filteredLeaderboard = filterAndSortLeaderboard(rankedData, sortOrder, searchQuery)

  return (
    <div className="board">
        <h1 className='leaderboard'>{title}</h1>

          {/* Search Input */}
          <input
              type="text"
              placeholder={`Filter ${columnnames[0]}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
          />

          {/* Column Headers */}
          <div className="columnnames">
              <div className="column-item objectname">{columnnames[0]}</div>

              {/* Second column with sorting functionality */}
              <div className="column-item skill-strength">
                  {columnnames[1]}
                  <button onClick={toggleSortOrder} className="sort-button">
                      {sortOrder === "ascending" ? "↑" : "↓"}
                  </button>
              </div>
          </div>

          {/* Scrollable Profile Rows */}
          <div className="profiles-container">
              <Profiles Leaderboard={filteredLeaderboard} onRowClick={handleRowClick} />
          </div>

          {/* Row Count Display */}
          <div className="row-count">
              {`${filteredLeaderboard.length} of ${Leaderboard.length} row(s) selected`}
          </div>

          {/* Modal Component */}
          {isModalOpen && (
              <UserInfoModal user={selectedUser} onClose={closeModal} />
          )}

    </div>
  )
}


function rankLeaderboard(data) {
    // Sort data in descending order and assign ranks based on this order
    return data
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 })); // Assign ranks
}

function filterAndSortLeaderboard(rankedData, sortOrder, searchQuery) {
    // Filter data based on search query
    let filteredData = rankedData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort data for display based on the specified order
    if (sortOrder === 'ascending') {
        filteredData = filteredData.slice().sort((a, b) => {
            if (a.score === b.score) {
                // Secondary sort by name in ascending order
                return a.name.localeCompare(b.name);
            }
            return a.score - b.score;
        });
    }

    return filteredData; // Return filtered and sorted data for display
}
