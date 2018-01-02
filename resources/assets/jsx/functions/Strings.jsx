
/*
  Anything to do with asset management
*/

export function trunc(string, n, useWordBoundary = true) {
  let isTooLong = string.length > n
  let s_ = isTooLong ? string.substr(0, n - 1) : string

  s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_

  return isTooLong ? s_ + '...' : s_
};

export function numberWithCommas(value, sep = ',') {
  if (value === null) {
    return value
  }

  var nStr = value.toLocaleString().replace(/\,/g,'');
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

export function amtWithCommas(num, delimeter = ',') {
  if(num && num !== ''){
    num = num.toString()
    var p = num.split(".");
    p[0] = p[0].replace(/\s*/g, "");
    p[0] = p[0].replace(/\,/g, "");
    var num1=''
    if(p[0]){
      num1 = p[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    if(p[1] || num.indexOf('.')>-1){
      num1 = num1 + "."+p[1]
    }
  }
  return num1
}

/*
Param  :
1)the date in string data type
2)[optional - string - default is "/"] the date delimiter, most likely "/" or "-"
3)[optional - int - default is 0] the position of the day component when the date string is broken up via the String.split function (into arrays)
4)[optional - int - default is 1] the position of the month component when the date string is broken up via the String.split function (into arrays)
5)[optional - int - default is 2] the position of the year component when the date string is broken up via the String.split function (into arrays)

Return : a javascript date is returned if the params are OK else null
*/
export function IsValidDate(strDate, strDelimiter, iDayPosInArray, iMonthPosInArray, iYearPosInArray) {
  var strDateArr // a string array to hold constituents day, month, and year components
  var dtDate // our internal converted date
  var iDay, iMonth, iYear

  // sanity check
  // no integer checks are performed on day, month, and year tokens as parsing them below will result in NaN if they're invalid
  if (strDate === null || typeof strDate !== 'string') {
    return null
  }

  // defaults
  strDelimiter = strDelimiter || '/'
  iDayPosInArray = undefined === iDayPosInArray ? 0 : iDayPosInArray
  iMonthPosInArray = undefined === iMonthPosInArray ? 1 : iMonthPosInArray
  iYearPosInArray = undefined === iYearPosInArray ? 2 : iYearPosInArray

  strDateArr = strDate.split(strDelimiter)

  iDay = parseInt(strDateArr[iDayPosInArray], 10)
  iMonth = parseInt(strDateArr[iMonthPosInArray], 10) - 1 // Note: months are 0-based
  iYear = parseInt(strDateArr[iYearPosInArray], 10)

  dtDate = new Date(
      iYear,
      iMonth, // Note: months are 0-based
      iDay)

  return (!isNaN(dtDate) && dtDate.getFullYear() === iYear && dtDate.getMonth() === iMonth && dtDate.getDate() === iDay) ? dtDate : null // Note: months are 0-based
}
export function isFutureDate(strDate, strDelimiter, iDayPosInArray, iMonthPosInArray, iYearPosInArray) {
  var strDateArr // a string array to hold constituents day, month, and year components
  var dtDate // our internal converted date
  var iDay, iMonth, iYear, today

  // sanity check
  // no integer checks are performed on day, month, and year tokens as parsing them below will result in NaN if they're invalid
  if (strDate === null || typeof strDate !== 'string') {
    return null
  }

  // defaults
  strDelimiter = strDelimiter || '/'
  iDayPosInArray = undefined === iDayPosInArray ? 0 : iDayPosInArray
  iMonthPosInArray = undefined === iMonthPosInArray ? 1 : iMonthPosInArray
  iYearPosInArray = undefined === iYearPosInArray ? 2 : iYearPosInArray

  strDateArr = strDate.split(strDelimiter)

  iDay = parseInt(strDateArr[iDayPosInArray], 10)
  iMonth = parseInt(strDateArr[iMonthPosInArray], 10) - 1 // Note: months are 0-based
  iYear = parseInt(strDateArr[iYearPosInArray], 10)
  today = new Date().getTime()

  dtDate = new Date(
      iYear,
      iMonth, // Note: months are 0-based
      iDay)

 return (today - dtDate) < 0 ? true : false;
}

/*
Param:
str: String to pad
pad: String that will be used for padding

Return:
The padded number
*/
export function padNumber(str, pad) {
  // because they have to be string
  str = `${str}`
  pad = `${pad}`

  return pad.substring(0, pad.length - str.length) + str
}

// A function to format text to look like a phone number
export function formatPhone(input){
  // Strip all characters from the input except digits
  input = input.replace(/\D/g,'');

  // Trim the remaining input to ten characters, to preserve phone number format
  input = input.substring(0,10);

  // Based upon the length of the string, we add formatting as necessary
  var size = input.length;
  if (size == 0){
          input = input;
  }else if(size < 4){
          input = '('+input;
  }else if(size < 7){
          input = '('+input.substring(0,3)+') '+input.substring(3,6);
  }else{
          input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
  }
  return input;
}


export function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

