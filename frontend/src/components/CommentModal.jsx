import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CommentModal = ({}) => {
  const [isCommenting, setIsCommenting] = useState(false);

  return (
    <Modal
      show={isCommenting}
      onHide={() => setIsCommenting(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default CommentModal;
