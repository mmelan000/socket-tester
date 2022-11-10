import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS } from '../utils/queries';

export default function Forums() {
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  return (
    <div className="flex-row justify-center">
      <div className="col-12 col-md-8 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList
            thoughts={thoughts}
            title="Here are some of the things being talked about!"
          />
        )}
      </div>
    </div>
  );
}
