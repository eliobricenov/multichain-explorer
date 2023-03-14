export function shortenAddress(hash: string) {
  return hash.slice(0, 8) + "..." + hash.slice(hash.length - 8, hash.length);
}

export function shortenHash(hash: string) {
  return hash.slice(0, 16) + "...";
}
