import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SearchForm extends React.Component {

  render() {
    return (
      <Form className="form"
        onSubmit={this.props.functionCall}
      >
        <Form.Group >
          <Form.Label >Enter a City </Form.Label>
          <Form.Control
            onChange={this.props.handleChange}
            className="formText"
            type="text"
            id="city_name"
            placeholder='Enter City Here' />
          <Form.Text
            className="text-muted formText">Enter a City to see its weather</Form.Text>

          <Button type="submit">Enter</Button>
        </Form.Group>
      </Form>
    )
  }
}

export default SearchForm;
