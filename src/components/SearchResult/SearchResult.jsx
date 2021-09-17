import { useDispatch, useSelector } from "react-redux";

import CreateParty from '../CreateParty/CreateParty';




export default function SearchResult() {
    const dispatch = useDispatch();
    const info = useSelector(store => store.partyInfo);
    const players = useSelector(store => store.currentPlayersReducer);
    const findGame = useSelector(store => store.searchBoardGameReducer);


    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
    }
    function formatTime(time) {
        let d = new Date(time);
        return d.toLocaleTimeString()
    }

    // Handles the info button
    // Sends data to reducer to be used in the body section of the app
    // Dispatches to upcoming.saga
    const displayInfo = (party) => {
        console.log('Game Info', party);
        dispatch({
            type: "SET_PARTY_INFO",
            payload: party
        })
        dispatch({
            type: "SHOW_CURRENT_PLAYERS",
            payload: party.id
        })
    }

    // Handles the join party button
    // Send email to the user who created the party that the user tht clicked wants to join TO DO
    // Add user to the party info
    const joinParty = (party) => {
        console.log('Joining', party);
        console.log('party id', party.id);
        console.log('party owner id', party.owner_id);
        console.log('number of players', party.number_of_players);
        let joinInfo = {
            partyId: party.id,
            partyOwnerId: party.owner_id,
            players: party.number_of_players
        }

        // Double checks that the user asking to join isn't the owner
        if (user.id === party.owner_id) {
            alert(`This is your party, you're already apart of it.`);
            return;
        } else if (user.id === party) {
            alert(`You can't join a party twice!`)
        }
        else {
            dispatch({
                type: "JOINING_A_PARTY",
                payload: joinInfo
            })
        }
        dispatch({
            type: "SHOW_CURRENT_PLAYERS",
            payload: party.id
        })
    }


    return(
        <>
            <div>
                {findGame.length == 0 ?
                    <div>
                        <h3>Oops! No games found! How about you make one?</h3>
                        <div>
                            <CreateParty />
                            <button
                                id="clearBtn"
                                onClick={() => { dispatch({ type: "SET_SEARCH_AS_INACTIVE", payload: '' }) }}
                            >
                                Clear</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            {findGame.map((game, index) => (
                                <div key={index} className="searchCards">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">{game.board_game}</h5>
                                                    <p class="card-text" className="searchCardsPTag">{formatDate(game.date_time)}</p>
                                                    <p class="card-text" className="searchCardsPTag">{formatTime(game.date_time)}</p>
                                                    <div className="btnContainer">
                                                        <button name="info" data-bs-toggle="modal" data-bs-target="#gameInfo" className="searchCardBtns" onClick={() => { displayInfo(game) }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /> Info</svg></button>
                                                        <button name="join" className="searchCardBtns" onClick={() => { joinParty(game) }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16"> <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" /></svg></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>

                        <button
                            id="clearBtn"
                            onClick={() => { dispatch({ type: "SET_SEARCH_AS_INACTIVE", payload: '' }) }}
                        >
                            Clear</button>

                        <div class="modal fade" id="gameInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{info.board_game}</h5>
                                    </div>
                                    <div class="modal-body">
                                        <h6 class="card-subtitle mb-2 text-muted">{info.location}</h6>
                                        <p class="card-text">Created by: {info.username}</p>
                                        <p class="card-text">Number of Players: {info.number_of_players}</p>
                                        <p class="card-text">Experience: {info.experience}</p>

                                        <div>
                                            Current Players:
                                            {players.map((player, index) => (
                                                <div key={index}>
                                                    <li>{player.username}</li>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}