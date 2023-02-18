import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom'
import useAxiosGoogleBooks from "../Hooks/useAxiosGoogleBooks";
import { Link } from "react-router-dom";
//import BookCard from "../Components/BookCard";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const BookCard = (bookDetails) => {
    console.log("in book card");
    const location = useLocation();
    //const { bookDetails } = location.state;
    console.log(bookDetails.i);
    const { image, bookTitle, bookAuthor, publisher, publicationdate, secondarybooklink, collectionslink } = bookDetails;


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{bookTitle}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{bookAuthor}</ListGroup.Item>
        <ListGroup.Item>{publisher}</ListGroup.Item>
        <ListGroup.Item>{publicationdate}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">View Book</Card.Link>
        <Card.Link href="#">Save Book</Card.Link>
      </Card.Body>
    </Card>
  );
}

const SearchPage = () => {
    const [bookDetails, setBookDetails] = useState("");
    const [calls, setCalls] = useState("");

    const location = useLocation();
    const { input } = location.state;

    const { response, loading, error } = useAxiosGoogleBooks({
        method: 'get',
        searchterms: input,
        specify_type: 'title',
        responseLength: 5,
    });

    const renderSliderList = () => {
        if (response){// && calls != "called") {
            setCalls("called");
            var res = response.docs;
            console.log(res);
            var text = "";
            //for (let i = 0; i < res.length; i++) {
            try {
                var title = res.title;
                var cover_i = res.cover_i;
                if (cover_i == undefined)
                    cover_i = "";
                var imagelink = "https://covers.openlibrary.org/b/ID/" + `${cover_i}` + "-M.jpg";
                console.log("IMAGELINK: " + imagelink);
                var author = res.author_name;
                var publish = res.publisher;
                var date = res.first_publish_year;
                //var amazon_id = res[i].id_amazon[0]
                //var amazonLink = "amazon.com/use-myrate-more/dp/" + isbn_10_input;
                var desc = "";//res[i].description;
                var details = { image: imagelink, bookTitle: title, bookAuthor: author, publisher: publish, publicationdate: date, description: desc, secondarybooklink: "#", collectionslink: "#" }
                setBookDetails(details);
                return (
                    <div>
                    {res.map(book => (
                        <div className="bookDiv">
                            <div className="bookImageDiv">
                                <BookCard bookDetails={details} />
                            </div>
                        </div>
                    ))}
                </div>
                )

            }
            catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <>
            <Navbar />
            <div>
                <h5> Search Page</h5>
                {renderSliderList()}
            </div>
        </>
    )
};


export default SearchPage;