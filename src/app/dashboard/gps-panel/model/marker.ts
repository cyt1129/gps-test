import { Point, MarkerOptions } from "angular2-baidu-map";

export class Marker {
    point:Point; 
    entityId?:string;
    title?:string;  
    time?:number;
    options?:MarkerOptions;
    constructor(){}
  }