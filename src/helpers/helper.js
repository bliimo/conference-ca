export const getReadableDate = (date) =>{
  const month = ['January','February','March','April','May','June','June','July','August','September','October','November','December']
  const dateArr = date.split('-');
  dateArr[2] = parseInt(dateArr[2]) < 10 &&  dateArr[2].replace('0','');
  return `${month[parseInt(dateArr[1]) - 1]} ${dateArr[2]}, ${dateArr[0]}`
}