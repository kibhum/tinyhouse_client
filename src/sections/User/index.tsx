import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Row, Layout } from "antd";
import { USER } from "../../lib/graphql/queries";
import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { UserProfile } from "./components";
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

interface MatchParams {
  id: string;
}
interface Props {
  viewer: Viewer;
}
const { Content } = Layout;

export const User = ({ viewer }: Props) => {
  let { id } = useParams();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: id ? id : " ",
    },
  });
  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === id;
  const userProfileElement = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;
  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }
  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  return (
    <Content className="user">
      <Row gutter={12} typeof="flex" justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
