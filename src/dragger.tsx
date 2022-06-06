export class Drag {
  x: any
  y: any
  constructor (x:number, y:number) {
    this.x = x
    this.y = y
  }

  move (x:number, y:number): void {
    this.x = x
    this.y = y
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  getXY () {
    return { x: this.x, y: this.y }
  }

  getDistance (drag:Drag): number|null {
    const dx = this.x - drag.x
    const dy = this.y - drag.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}