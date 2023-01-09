import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { LISTING } from "../../lib/graphql/queries";
import { useParams } from "react-router-dom";
import { Layout } from "antd";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

const { Content } = Layout;

const PAGE_LIMIT = 3;

export const Listing = () => {
  let { id } = useParams();
  const [bookingsPage, SetBookingsPage] = useState(1);
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: id ? id : " ",
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );
  if (loading) {
    <Content className="listings">
      <PageSkeleton />
    </Content>;
  }
  if (error) {
    <Content className="listings">
      <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
    </Content>;
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;
  return <h2>Listing</h2>;
};
