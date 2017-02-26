/**
 * Created by jwdn on 2017/2/25.
 */
export function getUrl(param, key) {
  if(param == null) return '';
  let _search = '?';
  for (let key in param) {
    _search += `${key}=${encodeURIComponent(param[key])}&`
  }
  return _search.slice(0, -1);
}