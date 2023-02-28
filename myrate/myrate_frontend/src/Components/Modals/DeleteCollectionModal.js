import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../css/collectionModal.css';


const DeleteCollectionModal = (props) => {

  const userProfile = useSelector((state) => { return state.userProfile; });

    const { open, close, header } = props;

    const deleteCollection = (e) => {
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
            <div class="loginFormDiv" >
            <form class="loginbox">
                <div>Delete this collection?</div>
                <button onClick={deleteCollection}>Yes</button>
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

  export default DeleteCollectionModal;