import { useState } from "react";
import { useDispatch } from "react-redux";
import EditParty from "../EditParty/EditParty";
import moment from "moment";

export default function PartiesCard({party, index}) {
    // Set variable for hooks
    const dispatch = useDispatch();

    // Variable used for conditional rendering
    const [editParty, setEditParty] = useState(true);

    // Handles dispatching event on page load to retrieve database
    const fetchParties = () => {
        dispatch({
            type: "FETCH_MY_PARTIES"
        });
    } // end fetchParties

    // Called when delete button is clicked on individual cards
    // Sends DELETE request to myParties.router
    const deleteParty = (party) => {
        console.log('Deleting Party', party.id);
        let confirmation = confirm(`Are you sure you want to delete ${party.board_game}?`);
        if (confirmation === true) {
            dispatch({
                type: "DELETE_THIS_PARTY",
                payload: party.id
            });
            fetchParties();
        } else {
            return;
        }
    }; // end deleteParty

    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString();
    }
    function formatTime(time) {
        let d = new Date(time);
        return d.toLocaleTimeString();
    }

    // Conditional rendering to let user edit the party on the card
    const toggleEditParty = (party) => {
        setEditParty(!editParty);
        switch (editParty) {
            case true:
                return;
            case false:
                return;
            default:
                return state
        } // end switch statement
    } // end toggleEditParty

    // Handle date input
    const handleDateChange = (e) => {
        setDate(e.target.value)
    } // end handleDateChange
    // Handle time input
    const handleTimeChange = (e) => {
        setTime(e.target.value)
    } // end handleDateChange
    // Handles inputs from the user
    const handleInputChange = (e) => {
        // Grab user information
        setEditedParty({
            // Spread-operator. Handles all user inputs
            ...editedParty, [e.target.name]: e.target.value,
        });
    } // end handleInputChange

    // Store user inputs into one local state variable
    const [editedParty, setEditedParty] = useState({
        boardGame: '',
        location: '',
        numberOfPlayers: '',
        experience: ''
    })

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    let newEdits = {};

    // Called when the edit button is clicked on individual cards
    // Will send user to Edit Party Page
    const editThisParty = (party, e) => {
        e.preventDefault(e);
        let momentObj = moment(date + time, 'YYYY-MM-DD HH:mm').format();
        console.log(momentObj);

        newEdits = {
            id: party.id,
            boardGame: editedParty.boardGame,
            numberOfPlayers: editedParty.numberOfPlayers,
            experience: editedParty.experience,
            location: editedParty.location,
            dateTime: momentObj
        }
        dispatch({
            type: "EDIT_THIS_PARTY",
            payload: newEdits
        })
        toggleEditParty(party);
        fetchParties();
    } // end editParty

    return (
        <div>
            {editParty ?

                <div key={index} className="renderedCards">
                    <div>
                        <h5 class="card-title">{party.board_game}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{party.location}</h6>
                        <p class="card-text">{party.number_of_players} players</p>
                        <p class="card-text">Experience: {party.experience}</p>
                        <p class="card-text">{formatDate(party.date_time)}</p>
                        <p class="card-text">{formatTime(party.date_time)}</p>
                        <button
                            name="edit"
                            onClick={() => { toggleEditParty(party) }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg>
                        </button>
                        <button
                            name="delete"
                            onClick={() => deleteParty(party)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>
                        </button>
                    </div>
                </div>

            :

                <div>
                    <form onSubmit={editThisParty} className="renderedCards">
                        <input
                            type="text"
                            placeholder={party.board_game}
                            name="boardGame"
                            value={editedParty.boardGame}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder={party.number_of_players}
                            name="numberOfPlayers"
                            value={editedParty.numberOfPlayers}
                            onChange={handleInputChange}
                            required
                        />
                        <select name="experience" onChange={handleInputChange} required >
                            <option selected disabled value="">Experience</option>
                            <option value="Novice">Novice</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <input
                            type="text"
                            placeholder={party.location}
                            name="location"
                            value={editedParty.location}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleDateChange}
                            required
                        />
                        <br />
                        <input
                            type="time"
                            name="time"
                            value={time}
                            onChange={handleTimeChange}
                            required
                        />
                        <button type="submit">Save</button>
                        <button onClick={()=> { toggleEditParty(party)}}>Back</button>
                    </form>
                </div>

            }
        </div>
    )
}