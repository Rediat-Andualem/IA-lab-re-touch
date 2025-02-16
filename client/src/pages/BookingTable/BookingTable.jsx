import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { axiosInstance } from "../../Utility/urlInstance";
import "./BookingTable.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../../components/Header/Header"


function BookingTable({ day, reasonForBlock }) {
  const [bookedCells, setBookedCells] = useState({});
  const [bookings, setBookings] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]); 
  const [lastSunday, setLastSunday] = useState(null);
  const [blockingData, setBlockingData] = useState({
    joinedDate: "", 
    blockingMessage: ""
  });
  
  const auth = useAuthUser();
  const userID = auth.userId;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const equipmentId = queryParams.get("equipmentId");

  useEffect(() => {
    if (equipmentId) {
      fetchBookingStatus();
      fetchBlockingStatus();  
    }
  }, [equipmentId]);




  const startDate = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + offsetToMonday);
    return monday;
  }, []);

  const daysOfWeek = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      return day;
    });
  }, [startDate]);

  const data = useMemo(
    () =>
      [
        { Time: "9AM-10AM" },
        { Time: "10AM-11AM" },
        { Time: "11AM-12PM" },
        { Time: "12PM-1PM" },
        { Time: "2PM-3PM" },
        { Time: "3PM-4PM" },
        { Time: "4PM-5PM" },
      ].map((row) => ({
        ...row,
        ...Object.fromEntries(
          Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])
        ),
      })),
    []
  );
// to see day information of the last week

useEffect(() => {
  if (daysOfWeek.length > 0) {
    const lastDay = daysOfWeek[13]; // The last day in your 14-day range
    const lastDayName = lastDay.toLocaleDateString("en-US", { weekday: "long" });

    if (lastDayName === "Sunday") {
      const formattedDate = lastDay.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      setLastSunday(formattedDate);
    }
  }
}, [daysOfWeek]); 

console.log(lastSunday)
  //* Fetch booking status 
  const fetchBookingStatus = async () => {
    try {
      const response = await axiosInstance.get(`/booking/status/${equipmentId}`);
      const bookings = response.data;

      // Transform the data for easier lookup
      const slots = {};
      bookings.forEach(({ slotDate, slotTime, bookingStatus }) => {
        const key = `${slotTime}-${new Date(slotDate).toLocaleDateString()}`;
        slots[key] = bookingStatus;
      });

      // Update the state with transformed data
      setBlockedSlots(slots);
    } catch (error) {
      console.error("Error fetching booking status:", error);
    }
  };
// * Fetch blocking status 
   
const fetchBlockingStatus = async () => {
  try {
    const response = await axiosInstance.get(`/blocking/getAllBlocking`);  
    const blockingData = response?.data?.data; 

    // Ensure the data is always treated as an array
    if (Array.isArray(blockingData)) {
      setBlockingData(blockingData); 
    } else {
      console.error("Expected blocking data to be an array");
      setBlockingData([]); // fallback in case of error
    }
  } catch (error) {
    if (error?.response.data.errors[0] === "No blocking records found.") {
      setBlockingData([]);
    }
  }
};








  const parseTime = (time) => {
    const [hour, modifier] = time.match(/\d+|AM|PM/g);
    const hourIn24 = modifier === "PM" && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour);
    return hourIn24 * 60;
  };

  const isPastTimeSlot = (time, dayDate) => {
    if (!dayDate) return false;
    const now = new Date();
    if (dayDate < new Date(now.toDateString())) return true;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [startTime, endTime] = time.split("-").map(parseTime);
    return dayDate.toDateString() === now.toDateString() && currentMinutes >= endTime;
  };

  const handleCellClick = (time, dayIndex) => {
    const slotDate = daysOfWeek[dayIndex]?.toLocaleDateString();
    const cellKey = `${time}-${slotDate}`;

    if (bookedCells[cellKey] || blockedSlots[cellKey]) return;

    setBookedCells((prev) => ({
      ...prev,
      [cellKey]: true,
    }));

    setBookings((prev) => [
      ...prev,
      {
        timeSlot: time,
        slotDate,
        bookingDate: new Date().toLocaleDateString(),
      },
    ]);
  };


  const handleSubmit = async () => {
    if (!equipmentId) {
      alert("Problem with selecting equipment. Please try again.");
      return;
    }
  
    if (bookings.length === 0) {
      alert("No bookings selected!");
      return;
    }
  
    const payload = {
      equipmentId,
      bookingsCount: bookings.length,
      bookings,
      userID,
    };
  
    try {
      const response = await axiosInstance.post("/booking/equipmentBookings", payload);
      alert(response?.data.message);
  
      // Clear the selected bookings and booked cells after successful submission
      setBookings([]); // Reset bookings
      setBookedCells({}); // Reset booked cells to allow new selections
  
      fetchBookingStatus(); // Refresh the booking status to show the latest availability
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking.");
    }
  };
  

  const columns = useMemo(() => {
    return [
      { Header: "Time", accessor: "Time" },
      ...daysOfWeek.map((date, index) => ({
        Header: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        accessor: `Day${index}`,
      })),
    ];
  }, [daysOfWeek]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="" >
      <Header/>
      <div className="container">
        <table  {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
  {rows.map((row) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row?.cells.map((cell, cellIndex) => {
          const time = row.values.Time;
          const dayIndex = cellIndex - 1;
          const isTimeColumn = cell.column.id === "Time";
          const dayDate = daysOfWeek[dayIndex];
          const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
          const bookingStatus = blockedSlots[cellKey];
          const isBlocked = !!bookingStatus;

          let cellStyle = {};
          let cellText = cell.value;

          // Ensure blockingData is available and is an array
           // Inside your map block checking logic, update the date comparison:

if (Array.isArray(blockingData) && dayDate) {
  // Check if any blocking record matches the current day
  const isBlockedByAny = blockingData.some((block) => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const blockedDate = `${block.blockingMonth} ${block.blockingNumber} ${currentYear}`;
    const blockDateObj = new Date(blockedDate); // Construct the blocked date using the current year
    return blockDateObj.toLocaleDateString() === dayDate.toLocaleDateString(); // Compare with the current day
  });

  if (isBlockedByAny) {
    const blockingRecord = blockingData.find((block) => {
      const currentYear = new Date().getFullYear(); // Get the current year
      const blockedDate = `${block.blockingMonth} ${block.blockingNumber} ${currentYear}`;
      const blockDateObj = new Date(blockedDate);
      return blockDateObj.toLocaleDateString() === dayDate.toLocaleDateString();
    });

    cellStyle = {
      backgroundColor: "lightcoral",
      color: "white",
      cursor: "not-allowed",
    };
    cellText = blockingRecord?.blockingMessage || "Blocked";  // Display the blocking message
  }
}


          // Apply styles for weekends and other conditions
          if (isTimeColumn) {
            cellStyle = { backgroundColor: "#0A7075", color: "white" };
          } else if (dayDate) {
            const dayOfWeek = dayDate.getDay();

            // Apply styles for weekends
            if (dayOfWeek === 6 || dayOfWeek === 0) {
              cellStyle = {
                backgroundColor: "#54162B",
                color: "white",
                cursor: "not-allowed",
              };
              cellText = "Holiday";
            }
            // Apply styles for past time slots
            else if (isPastTimeSlot(time, dayDate) && !isBlocked) {
              cellStyle = {
                backgroundColor: "black",
                color: "white",
                cursor: "not-allowed",
              };
              cellText = "Closed without booking";
            } 
            // Apply styles for booked slots
            else if (isBlocked) {
              cellStyle = {
                backgroundColor: "lightcoral",
                color: "white",
                cursor: "not-allowed",
              };
              cellText = bookingStatus;
            }
          }

          return (
            <td
              {...cell.getCellProps()}
              style={cellStyle}
              onClick={() => {
                if (!isTimeColumn && !isBlocked && cellText !== "Holiday" && cellText !== "Closed without booking") {
                  handleCellClick(time, dayIndex);
                }
              }}
            >
              {cellText}
            </td>
          );
        })}
      </tr>
    );
  })}
</tbody>




        </table>
        <MDBBtn className="m-2" color="success" onClick={handleSubmit}>
          Continue
        </MDBBtn>
      </div>
      {/* {bookings.length > 0 && (
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          {bookings.map((booking, index) => (
            <div key={index}>
              <p>Time Slot: {booking.timeSlot}</p>
              <p>Slot Date: {booking.slotDate}</p>
              <p>Booking Date: {booking.bookingDate}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default BookingTable;


