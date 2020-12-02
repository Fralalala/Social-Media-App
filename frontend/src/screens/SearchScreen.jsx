import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { searchUsers } from "../actions/searchAction";
import SearchResult from "../components/SearchResult";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const searchReducer = useSelector((state) => state.searchReducer);

  const { results } = searchReducer;

  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUsers(text));
  };

  return (
    <Container>
      <Row>
        <Col className="mb-3" style={{ textAlign: "center" }}>
          <h2>Find someone you know!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for a name here!"
                type="name"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <InputGroup.Append>
                <Button type="submit" variant="dark">
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row>
        {results &&
          results.map((result) => {
            return (
              <SearchResult
                profilePicSrc={result.profilePicSrc}
                name={result.name}
                _id={result._id}
              />
            );
          })}
      </Row>
    </Container>
  );
};

export default SearchScreen;
