import React, { useEffect, useState } from "react";
import { server } from "../../lib/api";
import {
  Listing,
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);
  const fetchListings = async () => {
    const {
      data: { listings },
    } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(listings);
  };
  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    });
    fetchListings();
  };
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

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
    </div>
  );
};

export default Listings;
