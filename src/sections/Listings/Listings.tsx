import React from "react";
import { server } from "../../lib/api";
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
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };
  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingsData,
      DeleteListingVariables
    >({ query: DELETE_LISTING, variables: { id: "63ac332cc35cf300c560ba84" } });
    console.log(data);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}> Query Listings</button>
      <button onClick={deleteListing}> Delete a Listing</button>
    </div>
  );
};

export default Listings;
