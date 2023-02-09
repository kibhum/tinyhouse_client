import React from "react";
import { Button, Card, DatePicker, Divider, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { formatListingPrice } from "../../../../lib/utils";
import { displayErrorMessage } from "../../../../lib/utils";
const { Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  setCheckInDate: (checkInDate: Dayjs | null) => void;
  setCheckOutDate: (checkOutDate: Dayjs | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const disabledDate = (currentDate?: Dayjs) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(dayjs().endOf("day"));
      return dateIsBeforeEndOfDay;
    } else {
      return false;
    }
  };
  const verifyAndSetCheckOutDate = (selectedCheckoutDate: Dayjs | null) => {
    if (checkInDate && selectedCheckoutDate) {
      if (dayjs(selectedCheckoutDate).isBefore(dayjs(checkInDate, "days"))) {
        return displayErrorMessage(
          "You can't book date of checkout prior check in!"
        );
      }
    }
    setCheckOutDate(selectedCheckoutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              showToday={false}
              value={checkInDate}
              format={"YYYY/MM/DD"}
              disabledDate={disabledDate}
              onChange={(dateValue) => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              showToday={false}
              disabled={checkOutInputDisabled}
              value={checkOutDate}
              format={"YYYY/MM/DD"}
              disabledDate={disabledDate}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button
          disabled={buttonDisabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request To Book
        </Button>
      </Card>
    </div>
  );
};
