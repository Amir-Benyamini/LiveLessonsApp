import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        joinRoom(id)
	 }
	 
	 function joinRoom(roomId) {
		props.history.push(`/room/${roomId}`);
	 }

    return (
        <div>
			  <button onClick={create}>Create room</button>
			  <br />

			  <div>
				  <button onClick={() => joinRoom('room1')}>room 1</button>
			  </div>
		  </div>
    );
};

export default CreateRoom;
