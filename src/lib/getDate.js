 export const GetDate = (date) => {
   let year = new Date(date).getFullYear();
   let month = new Date(date).getMonth() + 1;
   let day = new Date(date).getDate()
   let hour = new Date(date).getHours()
   let minute = new Date(date).getMinutes()

   return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year} ${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`
}

