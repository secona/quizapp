export default function toBoolean(value: any) {
  return /^(true|1)$/i.test(String(value));
}
