import React, {useState} from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// const options = [
//     { value: 'Not Specified', label: 'Not Specified' },
//     { value: 'Accounting/Finance', label: 'Accounting/Finance' },
//     { value: 'Admin/HR', label: 'Admin/HR' },
//     { value: 'Sales/Marketing', label: 'Sales/Marketing' },
//     { value: 'Arts/Media/Communications', label: 'Arts/Media/Communications' },
//     { value: 'Services', label: 'Services' },
//     { value: 'Education/Training', label: 'Education/Training' },
//     { value: 'Education', label: 'Education' },
//     { value: 'Tech Support/IT', label: 'Tech Support/IT' },
//     { value: 'Software Development', label: 'Software Development' },
//     { value: 'Engineering', label: 'Engineering' },
//     { value: 'Healthcare', label: 'Healthcare' },
//     { value: 'Manufacturing', label: 'Manufacturing' },
//     { value: 'Legal', label: 'Legal' },
//     { value: 'Science', label: 'Science' },
//     { value: 'Other', label: 'Other' }
// ]

const options = [
  { value: '1', label: 'Not Specified' },
  { value: '2', label: 'Accounting/Finance' },
  { value: '3', label: 'Admin/HR' },
  { value: '4', label: 'Sales/Marketing' },
  { value: '5', label: 'Arts/Media/Communications' },
  { value: '6', label: 'Services' },
  { value: '7', label: 'Education/Training' },
  { value: '8', label: 'Education' },
  { value: '9', label: 'Tech Support/IT' },
  { value: '10', label: 'Software Development' },
  { value: '11', label: 'Engineering' },
  { value: '12', label: 'Healthcare' },
  { value: '13', label: 'Manufacturing' },
  { value: '14', label: 'Legal' },
  { value: '15', label: 'Science' },
  { value: '16', label: 'Other' }
]

// const specializations = [
//     'Not Specified',
//     'Accounting/Finance', 
//     'Admin/HR',
//     'Sales/Marketing',
//     'Arts/Media/Communications',
//     'Services',
//     'Education/Training',
//     'Tech Support/IT',
//     'Software Development',
//     'Engineering',
//     'Healthcare', 
//     'Manufacturing', 
//     'Legal', 
//     'Science',
//     'Other'
// ]

function SearchBar() {

    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchValue);
        console.log(selectedOption);
        // map over the selectedOption array and return the value of each object
        // then join them into a string separated by commas
        
        const specializations = selectedOption.map((option) => {
            return option.value;
        }).join(',');
        
        window.location.href = `/applicant/jobs/?search=${searchValue}&spec=${specializations}`;

    }

    return (
        <>
        <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand >Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex w-100" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Job title, Description, or Keywords"
              className="me-2 w-100"
              aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Select
                // defaultValue={[options[0]].value}
                // defaultInputValue={options[0].value}
                placeholder="Select a Category"
                isMulti
                name="specializations"
                options={options}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                isSearchable={true}
                value={selectedOption}
                onChange={setSelectedOption}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}

export default SearchBar;