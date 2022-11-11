export default function dicesResults(dicesQty, sixes = false) {
  return Array.from({ length: dicesQty }, () =>
    sixes ? 6 : Math.floor(1 + 6 * Math.random())
  );
}
