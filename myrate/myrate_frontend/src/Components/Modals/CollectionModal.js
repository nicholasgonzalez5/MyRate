import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/collectionModal.css';

const CollectionCheckbox = (props) => {
  var c = props.collection
  if(props.mediaType==="movie") {
    if(c.movies.indexOf(props.mediaId) > -1) {
      return (
        <div>
        <label>
          <input
            type="checkbox"
            checked={true}
          />
          {c.title}
        </label>
        </div>
      )
    } else {
      return (
        <div>
        <label>
          <input
            type="checkbox"
            checked={false}
          />
          {c.title}
        </label>
        </div>
      )
    }
  }

}

const CollectionModal = (props) => {

    const { open, close, header } = props;
    const [collections, setCollections] = useState();

    // Fetch existing collections
    useEffect(() => {
      axios.get(`http://localhost:5000/collection`)
          .then(function (response) {
              console.log(response.data);
              setCollections(response.data);
          });
  }, []);
  
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
              {collections.map(c => (
                <CollectionCheckbox collection={c} mediaType={props.mediaType} mediaId={props.mediaId}/>
              ))}
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

  export default CollectionModal;