export default function dicesResults(dicesQty) {
  return Array.from({ length: dicesQty }, () =>
    Math.floor(1 + 6 * Math.random())
  );
}
