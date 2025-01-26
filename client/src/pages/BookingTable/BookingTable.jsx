//* SECOND BEST SO FAR
// import React, { useMemo, useState } from "react";
// import {useTable} from "react-table"
// import { axiosInstance } from '../../Utility/urlInstance';
// import "./BookingTable.css";
// import { MDBBtn } from "mdb-react-ui-kit";
// import { useLocation } from 'react-router-dom';
// import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
// function BookingTable({ day, reasonForBlock }) {
//      const [bookedCells, setBookedCells] = useState({});
//      const [bookings, setBookings] = useState([]);
// //  to get user information from auth 
//     const auth = useAuthUser()
//     const userID = auth.userId
// //  to get equipment ID
//      const location = useLocation();
//      const queryParams = new URLSearchParams(location.search);
//      const equipmentId = queryParams.get('equipmentId'); 
// // -------------------
//   const startDate = useMemo(() => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
//     const monday = new Date(today);
//     monday.setDate(today.getDate() + offsetToMonday);
//     return monday;
//   }, []);

// // -----------------------------------
//   const daysOfWeek = useMemo(() => {
//     return Array.from({ length: 14 }, (_, i) => {
//       const day = new Date(startDate);
//       day.setDate(startDate.getDate() + i);
//       return day;
//     });
//   }, [startDate]);

//   const data = useMemo(
//     () => [
//       { Time: "9AM-10AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "10AM-11AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "11AM-12PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "12PM-1PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "2PM-3PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "3PM-4PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "4PM-5PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//     ],
//     []
//   );

//   const handleCellClick = (time, dayIndex) => {
//     const slotDate = daysOfWeek[dayIndex]?.toLocaleDateString();
//     const bookingDate = new Date().toLocaleDateString();
//     const cellKey = `${time}-${slotDate}`;

//     if (bookedCells[cellKey]) return;

//     setBookedCells((prev) => ({
//       ...prev,
//       [cellKey]: true,
//     }));

//     setBookings((prev) => [
//       ...prev,
//       {
//         timeSlot: time,
//         slotDate,
//         bookingDate,
//       },
//     ]);
//   };

//   const handleSubmit = async () => {
//     if (!equipmentId) {
//       alert("Problem with selecting equipment please try again");
//       return;
//     }

//     if (bookings.length === 0) {
//       alert("No bookings selected!");
//       return;
//     }


//     const payload = {
//       equipmentId,
//       bookingsCount: bookings.length,
//       bookings,
//       userID,
//     };

//     try {
//       const response = await axiosInstance.post("/booking/equipmentBookings", payload); 
//       console.log(response);
//       alert("Booking submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("Error submitting booking.");
//     }
//   };

//   const columns = useMemo(() => {
//     return [
//       { Header: "Time", accessor: "Time" },
//       ...daysOfWeek.map((date, index) => ({
//         Header: date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
//         accessor: `Day${index}`,
//       })),
//     ];
//   }, [daysOfWeek]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   });

//   const now = new Date();

//   const parseTime = (time) => {
//     const [hour, modifier] = time.match(/\d+|AM|PM/g);
//     const hourIn24 = modifier === "PM" && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour);
//     return hourIn24 * 60;
//   };

//   const isPastTimeSlot = (time) => {
//     const [startTime, endTime] = time.split("-").map(parseTime);
//     const currentMinutes = now.getHours() * 60 + now.getMinutes();
//     return currentMinutes >= endTime;
//   };

//   return (
//     <div>
//       <div className="container">
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell, cellIndex) => {
//                     const time = row.values.Time;
//                     const dayIndex = cellIndex - 1;
//                     const isTimeColumn = cell.column.id === "Time";
//                     const dayDate = daysOfWeek[dayIndex];
//                     const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
//                     const isBooked = bookedCells[cellKey];
//                     const isWeekend = dayDate?.getDay() === 0 || dayDate?.getDay() === 6;

//                     const isPast = dayDate && (
//                       dayDate < new Date(now.toDateString()) ||
//                       (dayDate.toDateString() === now.toDateString() && isPastTimeSlot(time))
//                     );

//                     let cellStyle = {};
//                     let cellText = cell.value;

//                     if (isWeekend && !isTimeColumn) {
//                       cellStyle = { backgroundColor: "red", color: "white", cursor: "not-allowed" };
//                       cellText = "Weekend";
//                     } else if (isPast && !isBooked && !isTimeColumn) {
//                       cellStyle = { backgroundColor: "black", color: "white", cursor: "not-allowed" };
//                       cellText = "Closed without booking";
//                     } else if (isBooked) {
//                       cellStyle = { backgroundColor: "green", color: "white" };
//                       cellText = "Booked";
//                     } else if (isTimeColumn) {
//                       cellStyle = { backgroundColor: "#0A7075", color: "white" };
//                       cellText = time;
//                     }

//                     return (
//                       <td
//                         {...cell.getCellProps()}
//                         onClick={() => {
//                           if (!isTimeColumn && !isBooked && !isWeekend && !isPast) {
//                             handleCellClick(time, dayIndex);
//                           }
//                         }}
//                         style={cellStyle}
//                       >
//                         {cellText}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//                 <MDBBtn
//                   color="success"
//                   onClick={handleSubmit}
//                 >
//                   Continue
//                 </MDBBtn>
//       </div>
//       {bookings.length > 0 && (
//         <div className="booking-summary">
//           <h3>Booking Summary</h3>
//           {bookings.map((booking, index) => (
//             <div key={index}>
//               <p>Time Slot: {booking.timeSlot}</p>
//               <p>Slot Date: {booking.slotDate}</p>
//               <p>Booking Date: {booking.bookingDate}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingTable;

//  the above code contains the first major things with closed without booking features and booking features 
// * FIRST BEST SO FAR 23-01-2025
// // ! to implement booking status updating from backend
// import React, { useEffect, useMemo, useState } from "react";
// import { useTable } from "react-table";
// import { axiosInstance } from "../../Utility/urlInstance";
// import "./BookingTable.css";
// import { MDBBtn } from "mdb-react-ui-kit";
// import { useLocation } from "react-router-dom";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// function BookingTable({ day, reasonForBlock }) {
//   const [bookedCells, setBookedCells] = useState({});
//   const [bookings, setBookings] = useState([]);
//   const [blockedSlots, setBlockedSlots] = useState({}); // For storing fetched data
//   const auth = useAuthUser();
//   const userID = auth.userId;

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const equipmentId = queryParams.get("equipmentId");

//   const startDate = useMemo(() => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
//     const monday = new Date(today);
//     monday.setDate(today.getDate() + offsetToMonday);
//     return monday;
//   }, []);

//   const daysOfWeek = useMemo(() => {
//     return Array.from({ length: 14 }, (_, i) => {
//       const day = new Date(startDate);
//       day.setDate(startDate.getDate() + i);
//       return day;
//     });
//   }, [startDate]);

//   const data = useMemo(
//     () =>
//       [
//         { Time: "9AM-10AM" },
//         { Time: "10AM-11AM" },
//         { Time: "11AM-12PM" },
//         { Time: "12PM-1PM" },
//         { Time: "2PM-3PM" },
//         { Time: "3PM-4PM" },
//         { Time: "4PM-5PM" },
//       ].map((row) => ({
//         ...row,
//         ...Object.fromEntries(
//           Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])
//         ),
//       })),
//     []
//   );

//   // const fetchBookingStatus = async () => {
//   //   try {
//   //     const response = await axiosInstance.get(`/booking/status/${equipmentId}`);
//   //     console.log("response",response.data)
//   //     const  bookings  = response.data;
//   //     bookingStatusSetter(bookings)
//   //     // Transform the data for easier lookup
//   //     const slots = {};
//   //     bookingStatusGetter?.forEach(({ slotDate, slotTime, bookingStatus }) => {
//   //       const key = `${slotTime}-${new Date(slotDate).toLocaleDateString()}`;
//   //       slots[key] = bookingStatus;
//   //     });

//   //     setBlockedSlots(slots);
//   //   } catch (error) {
//   //     console.error("Error fetching booking status:", error);
//   //   }
//   // };
  
//   const fetchBookingStatus = async () => {
//     try {
//       const response = await axiosInstance.get(`/booking/status/${equipmentId}`);
//       const bookings = response.data;
  
//       // Transform the data for easier lookup
//       const slots = {};
//       bookings.forEach(({ slotDate, slotTime, bookingStatus }) => {
//         const key = `${slotTime}-${new Date(slotDate).toLocaleDateString()}`;
//         slots[key] = bookingStatus;
//       });
  
//       // Update the state with transformed data
//       setBlockedSlots(slots);
//     } catch (error) {
//       console.error("Error fetching booking status:", error);
//     }
//   };
  
  
  
//   useEffect(() => {
//     if (equipmentId) fetchBookingStatus();
//   }, [equipmentId]);

//   const handleCellClick = (time, dayIndex) => {
//     const slotDate = daysOfWeek[dayIndex]?.toLocaleDateString();
//     const cellKey = `${time}-${slotDate}`;

//     if (bookedCells[cellKey] || blockedSlots[cellKey]) return;

//     setBookedCells((prev) => ({
//       ...prev,
//       [cellKey]: true,
//     }));

//     setBookings((prev) => [
//       ...prev,
//       {
//         timeSlot: time,
//         slotDate,
//         bookingDate: new Date().toLocaleDateString(),
//       },
//     ]);
//   };

//   const handleSubmit = async () => {
//     if (!equipmentId) {
//       alert("Problem with selecting equipment. Please try again.");
//       return;
//     }

//     if (bookings.length === 0) {
//       alert("No bookings selected!");
//       return;
//     }

//     const payload = {
//       equipmentId,
//       bookingsCount: bookings.length,
//       bookings,
//       userID,
//     };

//     try {
//       const response = await axiosInstance.post(
//         "/booking/equipmentBookings",
//         payload
//       );
//       alert("Booking submitted successfully!");
//       fetchBookingStatus()
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("Error submitting booking.");
//     }
//   };

//   const columns = useMemo(() => {
//     return [
//       { Header: "Time", accessor: "Time" },
//       ...daysOfWeek.map((date, index) => ({
//         Header: date.toLocaleDateString("en-US", {
//           weekday: "long",
//           month: "short",
//           day: "numeric",
//         }),
//         accessor: `Day${index}`,
//       })),
//     ];
//   }, [daysOfWeek]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data,
//     });

//   return (
//     <div>
//       <div className="container">
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           {/* <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell, cellIndex) => {
//                     const time = row.values.Time;
//                     const dayIndex = cellIndex - 1;
//                     const isTimeColumn = cell.column.id === "Time";
//                     const dayDate = daysOfWeek[dayIndex];
//                     const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
//                     const bookingStatus = blockedSlots[cellKey];
//                     const isBlocked = !!bookingStatus;

//                     let cellStyle = {};
//                     let cellText = cell.value;

//                     if (isTimeColumn) {
//                       cellStyle = { backgroundColor: "#0A7075", color: "white" };
//                     } else if (isBlocked) {
//                       cellStyle = {
//                         backgroundColor: "lightcoral",
//                         color: "white",
//                         cursor: "not-allowed",
//                       };
//                       cellText = bookingStatus;
//                     }

//                     return (
//                       <td
//                         {...cell.getCellProps()}
//                         style={cellStyle}
//                         onClick={() => {
//                           if (!isTimeColumn && !isBlocked) {
//                             handleCellClick(time, dayIndex);
//                           }
//                         }}
//                       >
//                         {cellText}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody> */}
//           <tbody {...getTableBodyProps()}>
//   {rows.map((row) => {
//     prepareRow(row);
//     return (
//       <tr {...row.getRowProps()}>
//         {row.cells.map((cell, cellIndex) => {
//           const time = row.values.Time;
//           const dayIndex = cellIndex - 1;
//           const isTimeColumn = cell.column.id === "Time";
//           const dayDate = daysOfWeek[dayIndex];
//           const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
//           const bookingStatus = blockedSlots[cellKey];
//           const isBlocked = !!bookingStatus;

//           // Initialize styles and text
//           let cellStyle = {};
//           let cellText = cell.value;

//           if (isTimeColumn) {
//             // Time column styling
//             cellStyle = { backgroundColor: "#0A7075", color: "white" };
//           } else if (dayDate) {
//             const dayOfWeek = dayDate.getDay();

//             if (dayOfWeek === 6 || dayOfWeek === 0) {
//               // If Saturday or Sunday
//               cellStyle = {
//                 backgroundColor: "#54162B",
//                 color: "white",
//                 cursor: "not-allowed",
//               };
//               cellText = "Holiday";
//             } else if (isBlocked) {
//               // Blocked slots styling
//               cellStyle = {
//                 backgroundColor: "lightcoral",
//                 color: "white",
//                 cursor: "not-allowed",
//               };
//               cellText = bookingStatus;
//             }
//           }

//           return (
//             <td
//               {...cell.getCellProps()}
//               style={cellStyle}
//               onClick={() => {
//                 if (!isTimeColumn && !isBlocked && cellText !== "Holiday") {
//                   handleCellClick(time, dayIndex);
//                 }
//               }}
//             >
//               {cellText}
//             </td>
//           );
//         })}
//       </tr>
//     );
//   })}
// </tbody>

//         </table>
//         <MDBBtn color="success" onClick={handleSubmit}>
//           Continue
//         </MDBBtn>
//       </div>
//       {bookings.length > 0 && (
//         <div className="booking-summary">
//           <h3>Booking Summary</h3>
//           {bookings.map((booking, index) => (
//             <div key={index}>
//               <p>Time Slot: {booking.timeSlot}</p>
//               <p>Slot Date: {booking.slotDate}</p>
//               <p>Booking Date: {booking.bookingDate}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingTable;

//  teh above code includes almost everyhting of the booking status and table view 

// !-------------------------------------------------------------------------------
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
  const [blockedSlots, setBlockedSlots] = useState({}); // For storing fetched data
  const auth = useAuthUser();
  const userID = auth.userId;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const equipmentId = queryParams.get("equipmentId");

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

  useEffect(() => {
    if (equipmentId) fetchBookingStatus();
  }, [equipmentId]);

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
      const response = await axiosInstance.post(
        "/booking/equipmentBookings",
        payload
      );
      alert("Booking submitted successfully!");
      fetchBookingStatus();
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
    <div className="h-100" >
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
          <tbody  {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => {
                    const time = row.values.Time;
                    const dayIndex = cellIndex - 1;
                    const isTimeColumn = cell.column.id === "Time";
                    const dayDate = daysOfWeek[dayIndex];
                    const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
                    const bookingStatus = blockedSlots[cellKey];
                    const isBlocked = !!bookingStatus;

                    let cellStyle = {};
                    let cellText = cell.value;

                    if (isTimeColumn) {
                      cellStyle = { backgroundColor: "#0A7075", color: "white" };
                    } else if (dayDate) {
                      const dayOfWeek = dayDate.getDay();

                      if (dayOfWeek === 6 || dayOfWeek === 0) {
                        // Weekend styling
                        cellStyle = {
                          backgroundColor: "#54162B",
                          color: "white",
                          cursor: "not-allowed",
                        };
                        cellText = "Holiday";
                      } else if (isPastTimeSlot(time, dayDate) && !isBlocked) {
                        // Closed without booking styling
                        cellStyle = {
                          backgroundColor: "black",
                          color: "white",
                          cursor: "not-allowed",
                        };
                        cellText = "Closed without booking";
                      } else if (isBlocked) {
                        // Blocked slot styling
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
      {bookings.length > 0 && (
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
      )}
    </div>
  );
}

export default BookingTable;
