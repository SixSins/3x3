import { forEach } from "lodash";

/**
 * 
 * 
 * @param data {[number, number][]} A list of [x,z] coords to parse through
 * @param coords {[number, number]} The [x,z] coordinate of the player
 */
export default function locate(data: [number, number][], coords: [number, number]): [number, number]
{
  let [x, z] = coords;
  let [xFinal, zFinal] = [0, 0];
  let distance = Infinity;
  let xDiff, zDiff, distanceCurrent: number;

  forEach(data, ([xCurrent, zCurrent]) =>
  {
    xDiff = Math.abs(xCurrent - x);
    zDiff = Math.abs(zCurrent - z);

    // fast return if the total distance is farther away than the distance on one axis
    // that way, we can save some math
    if (xDiff > distance || zDiff > distance) return;

    // distance formula, from high school algebra
    distanceCurrent = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(zDiff, 2) );

    // if the distance to this point is less than the previous lowest distance
    if (distanceCurrent < distance)
    {
      // set it  as the new lowest distance
      distance = distanceCurrent;
      [xFinal, zFinal] = [xCurrent, zCurrent];
    }
  });

  return [xFinal, zFinal];
}