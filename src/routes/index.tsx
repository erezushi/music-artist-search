import { SearchResults } from '#/components';
import { TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

import type { artistResponse } from '#/types';
import type { ChangeEvent } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: [searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/123/search.php?s=${searchQuery}`,
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return response.json() as Promise<artistResponse>;
    },
  });

  const changeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  return (
    <div className="result-list">
      <TextField
        className="search-input"
        label="Artist search"
        value={searchInput}
        onChange={changeSearchInput}
      />
      {searchQuery === '' ? (
        <div>Enter search query</div>
      ) : (
        <SearchResults data={data} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}
