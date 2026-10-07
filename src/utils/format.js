export const formatEth = (n) => `${parseFloat(Number(n).toFixed(4))} ETH`;

export const formatCompact = (n) =>
  n < 1000 ? String(n) : `${parseFloat((n / 1000).toFixed(3))}K`;
