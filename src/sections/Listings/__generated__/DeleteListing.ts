/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListing
// ====================================================

export interface DeleteListing_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfGuests: number;
  numOfBaths: number;
  rating: number;
}

export interface DeleteListing {
  listing: DeleteListing_listing;
}

export interface DeleteListingVariables {
  id: string;
}
