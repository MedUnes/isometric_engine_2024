import { Grid } from "./grid";
import { Coords, Isometric } from "./isometric";

/**
 * Represents a point on the map.
 * Each point has a single height.
 * Four points would make a cell, which will be represented by another object
 */
export class GridPoint {
  public readonly baseCoords: Coords;
  public readonly coords: Coords;
  public height: number = 0;
  public isHighlighted = false;

  private get heightMultiplier() {
    // the scaling of the height levels should be related to the isometric sizing
    return this.isometric.xStep * 1;
  }

  private get scaledHeight() {
    return this.heightMultiplier * this.height;
  }

  public get coordsAtSeaLevel()  {
    return {x: this.coords.x, y: this.coords.y - this.scaledHeight};
  }

  constructor(public x: number, public y: number,
    private isometric: Isometric) {
    this.baseCoords = this.isometric.coords(x, y);
    this.height = Math.floor(Math.random() * 2 - 2);
    if (x === 0 && y === 0) {
      this.height = 0;
    }
    this.coords = {x: this.baseCoords.x, y: this.baseCoords.y + this.scaledHeight};
  }

  /**
   * This basically should get called just once on initialisation
   * The problem is that the neighbouring grid points might not yet have been initialised
   * So for that reason I've put this in a function to be called later. It's a bit clunky though.
   * @param grid 
   * @returns 
   */
  public neighbours(grid: GridPoint[][]) {
    return {
      north: grid[this.y - 1]?.[this.x] ?? null,
      east: grid[this.y]?.[this.x + 1] ?? null,
      south: grid[this.y + 1]?.[this.x] ?? null,
      west: grid[this.y]?.[this.x - 1] ?? null,
    }
  }


  public adjustHeight(direction: 'raise' | 'lower') {
    const newHeight = this.height + (direction === "raise" ? -1 : 1);
    this.setHeight(newHeight);
  }
  
  public setHeight(height: number) {
    this.height = height;
    this.coords.y = this.baseCoords.y + this.scaledHeight;
  }

  public distanceToPoint(point: Coords) {
    return Math.sqrt((point.x - this.coords.x) ** 2 + (point.y - this.coords.y) ** 2);
  }
}