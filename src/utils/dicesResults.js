export default function dicesResults(dicesQty, testNum = false) {
  return Array.from({ length: dicesQty }, () =>
    testNum ? testNum : Math.floor(1 + 6 * Math.random())
  );
}
