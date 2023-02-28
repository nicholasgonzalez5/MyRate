import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../css/collectionModal.css';


const AddCollectionModal = (props) => {

  const userProfile = useSelector((state) => { return state.userProfile; });

    const { open, close, header } = props;

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[incompleteForm, setIncompleteForm] = useState(false);

    const handleTitleChange = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
      e.preventDefault();
      setDescription(e.target.value);
    }

    const addCollection = (e) => {
      e.preventDefault();
    }
  
    return (

      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
            <div class="loginFormDiv">
                <form class="loginbox" autocomplete="off">
                    <input placeholder="Title" type="text" id="title" value={title} onChange={handleTitleChange}></input>
                    <input placeholder="Description" type="text" id="description" value={description} onChange={handleDescriptionChange}></input>
                    <button onClick={addCollection}>Add Collection</button>
                    <p id="incompleteFormError" hidden={!incompleteForm}>Please Complete All Form Fields</p>
                </form>
            </div>
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };

  export default AddCollectionModal;