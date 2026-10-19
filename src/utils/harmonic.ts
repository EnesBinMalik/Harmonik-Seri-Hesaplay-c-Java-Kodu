import { HarmonicStep } from '../types';

export const EULER_MASCHERONI = 0.57721566490153286;

// Compute greatest common divisor for BigInt
export function gcdBigInt(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

// Add two fractions: n1/d1 + n2/d2
export function addFractions(
  n1: bigint,
  d1: bigint,
  n2: bigint,
  d2: bigint
): { num: bigint; den: bigint } {
  const commonDen = (d1 * d2) / gcdBigInt(d1, d2);
  const commonNum = n1 * (commonDen / d1) + n2 * (commonDen / d2);
  const g = gcdBigInt(commonNum, commonDen);
  return {
    num: commonNum / g,
    den: commonDen / g,
  };
}

// Calculate Harmonic sum as float
export function calculateHarmonicFloat(n: number): number {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 1.0 / i;
  }
  return sum;
}

// Calculate exact fraction for n (up to moderate n, e.g. 100)
export function calculateHarmonicFraction(n: number): { num: bigint; den: bigint } {
  if (n <= 0) return { num: 0n, den: 1n };
  let currentNum = 1n;
  let currentDen = 1n;

  for (let i = 2; i <= n; i++) {
    const res = addFractions(currentNum, currentDen, 1n, BigInt(i));
    currentNum = res.num;
    currentDen = res.den;
  }

  return { num: currentNum, den: currentDen };
}

// Calculate logarithmic approximation: H_n ≈ ln(n) + gamma + 1/(2n)
export function harmonicApproximation(n: number): number {
  if (n <= 0) return 0;
  return Math.log(n) + EULER_MASCHERONI + 1 / (2 * n);
}

// Generate steps for visual inspection
export function generateHarmonicSteps(n: number, maxSteps: number = 30): HarmonicStep[] {
  const steps: HarmonicStep[] = [];
  const limit = Math.min(n, maxSteps);
  
  let cumSum = 0;
  let cumNum = 0n;
  let cumDen = 1n;

  for (let i = 1; i <= limit; i++) {
    const termVal = 1.0 / i;
    cumSum += termVal;
    
    // Only calculate exact fraction if n is within reasonable limit
    if (i <= 50) {
      if (i === 1) {
        cumNum = 1n;
        cumDen = 1n;
      } else {
        const res = addFractions(cumNum, cumDen, 1n, BigInt(i));
        cumNum = res.num;
        cumDen = res.den;
      }
    }

    steps.push({
      k: i,
      fractionStr: `1/${i}`,
      termValue: termVal,
      cumulativeSum: cumSum,
      cumulativeFraction: {
        num: cumNum,
        den: cumDen,
      },
    });
  }

  return steps;
}
