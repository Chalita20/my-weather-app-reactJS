import { useEffect, useState } from "react";

export const useDate = ({ dateTime }) => {
    const [formattedDate, setFormattedDate] = useState(null);
    
    useEffect(() => {
        if (dateTime) {
            const date = new Date(dateTime);

            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                timeZone: "UTC",
                timeZoneName: "short",
            };

            const dateFormatter = new Intl.DateTimeFormat('en', options);
            const formatted = dateFormatter.format(date);

            const dateString = formatted.replace(" UTC", "");
            const formattedFinal = `${dateString} UTC`;

            setFormattedDate(formattedFinal);
        }
    }, [dateTime]);

    if (!formattedDate) return { date: null, time: null };

    return {
        date: formattedDate,
        time: formattedDate,
    };
};
