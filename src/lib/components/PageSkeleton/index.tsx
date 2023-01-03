import React, { Fragment } from "react";
import { Skeleton } from "antd";

export const PageSkeleton = () => {
  const skeletonParagraph = (
    <Skeleton
      paragraph={{ rows: 4, width: "100%" }}
      active
      className="page-skeleton__paragraph"
    />
  );
  return (
    <Fragment>
      {skeletonParagraph}
      {skeletonParagraph}
      {skeletonParagraph}
    </Fragment>
  );
};
