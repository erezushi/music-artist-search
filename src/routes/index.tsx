import { SearchResults } from '#/components';
import { Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

import type { ADBResponse } from '#/types';
import type { ChangeEvent, KeyboardEvent } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/123/search.php?s=${searchQuery}`,
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return response.json() as Promise<ADBResponse>;
    },
  });

  const keyboardHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setSearchQuery(searchInput)
    }
  }, [searchInput]);

  const changeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  const onSubmitClick = useCallback(() => {
    setSearchQuery(searchInput)
  }, [searchInput]);

  return (
    <div className="main-page" onKeyDown={keyboardHandler}>
      <TextField
        className="search-input"
        label="Artist search"
        value={searchInput}
        onChange={changeSearchInput}
      />
      <Button variant='contained' className='submit-button' onClick={onSubmitClick}>Submit</Button>
      {searchQuery === '' ? (
        <div>Enter search query</div>
      ) : (
        <SearchResults data={data} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
