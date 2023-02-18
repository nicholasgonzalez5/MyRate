import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom'

function BookCard() {
    console.log("in book card");
    const location = useLocation();
    const { bookDetails } = location.state;
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

export default BookCard;