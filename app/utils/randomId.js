export default function randomId() {
  return Math.random().toString(32).slice(2).substr(0, 5);
}
