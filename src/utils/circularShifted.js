/**
 * @param {[]} arr
 * @param {number} index
 */
export default function circularShifted(arr, index) {
  return arr.concat(arr).slice(index + 1, index + arr.length);
}
