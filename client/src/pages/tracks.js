import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

const TRACKS = gql`
 query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;
const Tracks = () => {
  const {loading, error, data} =useQuery(TRACKS);

  if(loading) return 'Loading...';

  if(error) return `Error! ${error.message}`;

  return (
      <Layout grid>
        <QueryResult error={error} loading={loading} data={data}>
          {data?.tracksForHome?.map((x, index)=> <TrackCard key={index} track={x}/>)}
        </QueryResult>
      </Layout>
  );
};

export default Tracks;
