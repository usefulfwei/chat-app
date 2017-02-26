/**
 * Created by jwdn on 2017/2/24.
 */
export function date(date){
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let str = hour+":"+adjust(min)+":"+adjust(sec);
  return str;
}

function adjust(num){
  if(num<10){
    return '0' + num
  }
  else return num;
}