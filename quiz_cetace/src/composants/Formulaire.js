import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

function Formulaire() {
  return (
    <div className='container mt-5'>
        <Stack gap={3} direction="vertical">
            <Form>
        <Row className="align-items-center">
            <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput">
                Name
            </Form.Label>
            <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
            />
            </Col>
            <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Username
            </Form.Label>
            <InputGroup className="mb-2">
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control id="inlineFormInputGroup" placeholder="Username" />
            </InputGroup>
            </Col>
            <Col xs="auto">
            <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Remember me"
            />
            </Col>
            <Col xs="auto">
            <Button type="submit" className="mb-2">
                Submit
            </Button>
            </Col>
        </Row>
        </Form>
        </Stack>
        
    </div>
  );
}

export default Formulaire;