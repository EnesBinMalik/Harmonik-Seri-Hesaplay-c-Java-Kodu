export interface HarmonicStep {
  k: number;
  fractionStr: string;
  termValue: number;
  cumulativeSum: number;
  cumulativeFraction: {
    num: bigint;
    den: bigint;
  };
}

export type JavaImplementationType = 'loop' | 'fraction' | 'recursive' | 'stream';

export interface JavaCodeSnippet {
  id: JavaImplementationType;
  title: string;
  subtitle: string;
  code: string;
  description: string;
}
