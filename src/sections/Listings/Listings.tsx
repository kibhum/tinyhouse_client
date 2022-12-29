import React from "react";
import { server, useQuery } from "../../lib/api";
import {
  ListingsData,
  DeleteListingsData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
query Listings{
  listings{
    id
    title
    image
    address
    price
    numOfBeds
    numOfGuests
    numOfBaths
    rating
  }
}

`;

const DELETE_LISTING = `
mutation DeleteListing($id: ID!){
  listing: deleteListing(id: $id){
    id
    title
    image
    address
    price
    numOfBeds
    numOfGuests
    numOfBaths
    rating
  }
}

`;

interface Props {
  title: string;
}

const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
    refetch();
  };
  const listings = data ? data.listings : null;
  const listingsList = (
    <ul>
      {listings?.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => deleteListing(listing.id)}> Delete</button>
          </li>
        );
      })}
    </ul>
  );

  if (error) {
    return <h2>Uh Oh! Something went wrong - Please try again later :(</h2>;
  }

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2>{title}</h2>
          {listingsList}
        </>
      )}
    </div>
  );
};

export default Listings;
