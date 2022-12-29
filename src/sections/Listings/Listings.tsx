import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Alert, List, Avatar, Button, Spin } from "antd";
import { Listings as ListingsData } from "./__generated__/Listings";
import { ListingsSkeleton } from "./components";
import {
  DeleteListing as DeleteListingsData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import "./styles/Listings.css";
const LISTINGS = gql`
  query Listings {
    listings {
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    listing: deleteListing(id: $id) {
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
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingsData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });

    refetch();
  };
  const listings = data ? data.listings : null;
  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;
  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Uh Oh! Something went wrong with deleting - Please try again later!"
      className="listings__alert"
    />
  ) : null;

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  return (
    <div className="listings">
      {loading ? (
        <div className="listings">
          <ListingsSkeleton title={title} error />
        </div>
      ) : (
        <Spin spinning={deleteListingLoading}>
          {deleteListingErrorAlert}
          <h2>{title}</h2>
          {listingsList}
        </Spin>
      )}
    </div>
  );
};

export default Listings;
