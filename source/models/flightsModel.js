const dotenv = require('dotenv');
dotenv.config();
var db = require('../database/db');

exports.getFlights = (departureLocation, arrivalLocation, departureDate, arrivalDate, callback) => {
    let query = 'SELECT *, DATE_FORMAT(departure_date, "%d/%m/%Y") AS formatted_departure_date, DATE_FORMAT(arrival_date, "%d/%m/%Y") AS formatted_arrival_date, DATE_FORMAT(departure_time, "%H:%i") AS formatted_departure_time, DATE_FORMAT(arrival_time, "%H:%i") AS formatted_arrival_time, TIME_FORMAT(TIMEDIFF(arrival_time, departure_time), "%Hh %im") AS temp, IF(TIMEDIFF(arrival_time, departure_time) < "05:00:00", "Direct", "Stopover") AS type, CONCAT(FORMAT(economy_price, 0), " đ") AS formatted_economy_price, CONCAT(FORMAT(business_price, 0), " đ") AS formatted_business_price FROM Flights WHERE departure_location = ? AND arrival_location = ? AND departure_date = ?';
    let values = [departureLocation, arrivalLocation, departureDate];

    if (arrivalDate) {
        query += ' AND arrival_date = ?';
        values.push(arrivalDate);

        // Kiểm tra tính hợp lệ của trường Arrival_Date so với trường Departure_Date
        query += ' AND arrival_date >= departure_date';
    }

    db.query(query, values, (error, results) => {
        if (error) throw error;

        // Thêm trường type vào kết quả truy vấn
        results = results.map((flight) => {
            const timeDiff = flight.temp.split(':');
            const hours = parseInt(timeDiff[0]);
            const minutes = parseInt(timeDiff[1]);

            let type;
            if (hours < 5 || (hours === 5 && minutes === 0)) {
                type = 'Bay thẳng';
            } else {
                type = 'Bay có điểm dừng';
            }

            return {
                ...flight,
                departure_date: flight.formatted_departure_date,
                arrival_date: flight.formatted_arrival_date,
                arrival_time: flight.formatted_arrival_time,
                departure_time: flight.formatted_departure_time,
                type: type,
                economy_price: flight.formatted_economy_price,
                business_price: flight.formatted_business_price
            };

        });

        callback(results);
    });
}