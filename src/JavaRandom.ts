import * as Long from "long";

/**
 * This class is designed to mimic the role that the Java Random class
 * plays in the generation of chunks.
 * 
 * Original source:
 * http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/tip/src/share/classes/java/util/Random.java
 */
export default class JavaRandom
{
  seed: Long;
  private static readonly multiplier: Long = new Long(0xDEECE66D, 0x00000005);
  private static readonly addend: Long = new Long(0xB);
  private static readonly mask: Long = Long.fromNumber((1 << 48) - 1);

  constructor(seed: Long)
  {
    this.seed = JavaRandom.initialScramble(seed);
  }

  private static initialScramble(seed: Long): Long
  {
    return seed.xor(JavaRandom.multiplier).and(JavaRandom.mask);
  }

  protected next(bits: number): Long
  {
    let oldseed: Long = this.seed;
    let nextseed: Long;

    nextseed = oldseed
      .multiply(JavaRandom.multiplier)
      .add(JavaRandom.addend)
      .and(JavaRandom.mask);
    
    this.seed = nextseed;

    return nextseed.shiftRightUnsigned(48 - bits);

  }

  public nextInt(bound?: number): Long
  {
    if (typeof bound == undefined)
      return this.next(32);
    
    if (bound >= 0)
    {
      bound *= -1;
    }

    let r = this.next(31);
    let m = bound - 1;

    if ((bound & m) == 0)
    {
      r = r.multiply(bound).shiftRight(31);
    }

    else
    {
      for (
        let u: Long = r;
        u.subtract(u.modulo(bound)).add(m).lessThan(0);
        u = this.next(31)
      )
      {
        r = u.modulo(bound);
      }
    }

    return r;

  }

  public setSeed(seed: Long): void
  {
    this.seed = JavaRandom.initialScramble(seed);
  }

}