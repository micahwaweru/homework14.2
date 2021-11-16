//date format helpers from Activity 15
const helpers = {
    format_time:(date)=>{
        return date.toLocaleTimeString();
    },
    format_date:(date)=>{
        return `${new Date(date).getMonth() +1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear() + 5
          }`;
    },
};