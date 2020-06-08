import { NumberFormat } from 'intl';

interface ILocation {
  language: string;
  unity: string;
}

export default class Rational {
  private numerator: number;
  private denominator: number;

  constructor(num = 0, denom?: number) {
    if (!denom) {
      this.firstOperation(num);
    } else {
      this.secondOperation(num, denom);
    }
  }

  private firstOperation(value: number): void {
    const epsilon = Number.EPSILON;
    const maxDenominator = Number.MAX_SAFE_INTEGER;
    const maxIterations = 100;
    let r0 = value;
    let a0 = Math.floor(r0);

    if (Math.abs(a0 - value) < epsilon) {
      this.numerator = Math.trunc(a0);
      this.denominator = 1;
      return;
    }

    let p0 = 1;
    let q0 = 0;
    let p1 = a0;
    let q1 = 1;

    let p2;
    let q2;

    let n = 0;
    let stop = false;

    do {
      ++n;
      const r1 = 1.0 / (r0 - a0);
      const a1 = Math.floor(r1);
      p2 = a1 * p1 + p0;
      q2 = a1 * q1 + q0;

      const convergent = p2 / q2;
      if (
        n < maxIterations &&
        Math.abs(convergent - value) > epsilon &&
        q2 < maxDenominator
      ) {
        p0 = p1;
        p1 = p2;
        q0 = q1;
        q1 = q2;
        a0 = a1;
        r0 = r1;
      } else {
        stop = true;
      }
    } while (!stop);
    this.numerator = Math.trunc(p2);
    this.denominator = Math.trunc(q2);
  }

  private secondOperation(num: number, denom: number): void {
    this.numerator = num;
    this.denominator = denom;
  }

  /**
   * @return the greatest common denominator
   */
  public greatestCommonDenominator(a: number, b: number): number {
    return b === 0 ? a : this.greatestCommonDenominator(b, a % b);
  }

  /**
   * @return the number parsed to fraction
   */
  public toString(): string {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    if (this.numerator / this.denominator === 1) {
      return '1';
    }
    const gcm = this.greatestCommonDenominator(
      this.numerator,
      this.denominator,
    );
    return `${this.numerator / gcm}/${this.denominator / gcm}`;
  }

  /**
   * @return the number parsed to maximun reduced fraction
   */
  public toHumman(): string {
    const result = this.toString();
    const value = this.numerator / this.denominator;
    const intval = Math.trunc(value);
    let frac = value - intval;
    frac = Math.round(frac * 100000) / 100000;
    const tmp = value.toString();
    if (
      (tmp.length >= result.length &&
        Math.abs(this.denominator) <= 10 &&
        Math.abs(this.numerator) <= 5) ||
      this.denominator === 1
    ) {
      return result;
    }
    let fstr = frac.toString();
    if (fstr.length > 5) {
      fstr = (Math.round(value * 1000) / 1000).toString();
    }
    return fstr;
  }

  public contentToString(
    quantity: number,
    content: number,
    location: ILocation,
  ): string {
    const toLocaleString = NumberFormat(location.language);
    const parseToLocale = (value: string) =>
      toLocaleString.format(Number(value));
    let total = quantity * content;
    let multiplier = 1;
    let rational = new Rational(total);
    let reduced = parseToLocale(rational.toHumman());

    if (location.unity.toUpperCase() === 'UN') return reduced;
    if (total < 0) {
      multiplier = -1;
      total = -total;
    }

    let result = location.unity;
    const intval = Math.trunc(total);
    const frac = total - intval;

    if (location.unity === 'm' && intval === 0 && frac > 0.01) {
      result = 'c' + result;
      multiplier = multiplier * 100;
    } else if (total < 1) {
      result = 'm' + result;
      multiplier = multiplier * 1000;
    } else if (total >= 1000 && location.unity !== 'L') {
      result = 'k' + result;
      multiplier = multiplier * 0.001;
    }

    rational = new Rational(total * multiplier);
    reduced = parseToLocale(rational.toHumman());
    return reduced + result;
  }
}
