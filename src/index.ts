import Rational from './Rational';

interface ILocation {
  language: string;
  unity: string;
}

interface IRational {
  toHumman: () => string;
  toString: () => string;
  greatestCommonDenominator: (a: number, b: number) => number;
  contentToString: (
    quantity: number,
    content: number,
    location: ILocation,
  ) => string;
}

const rational = (num?: number, denom?: number): IRational =>
  new Rational(num, denom);

export default rational;
