import { useState } from 'react';

const Search = ({ placeholder, getQuery }) => {
  const [text, setText] = useState('');

  const inputChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    <section>
      <input
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={(e) => inputChange(e.target.value)}
      />
    </section>
  );
};

export default Search;
