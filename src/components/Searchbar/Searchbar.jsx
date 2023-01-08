import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  HeaderForm,
  FormButton,
  FormButtonLabel,
  FormInput,
} from './Searchbar.styled';

export function Searchbar({ onFormSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleInputChange = e => {
    setSearchName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      return toast.warn('Write something!');
    }
    onFormSubmit(searchName);
    // setSearchName((e.target.value = ''));
  };

  return (
    <Header>
      <HeaderForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <FormButtonLabel>Search</FormButtonLabel>
        </FormButton>

        <FormInput
          onChange={handleInputChange}
          name="searchName"
          value={searchName}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </HeaderForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
