import { Injectable } from '@angular/core';
import { Point } from 'angular2-baidu-map';

@Injectable()
export class GpsCoordService {

  constructor() { }

  pi = Math.PI;  
  private a = 6378245.0;  
  private ee = 0.00669342162296594323;
  transformLat(x:number, y:number):number{
      let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y  + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;  
      ret += (20.0 * Math.sin(y * this.pi) + 40.0 * Math.sin(y / 3.0 * this.pi)) * 2.0 / 3.0;  
      ret += (160.0 * Math.sin(y / 12.0 * this.pi) + 320 * Math.sin(y * this.pi / 30.0)) * 2.0 / 3.0;  
      return ret;
    }

    transformLon(x,y):number {
      let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));  
      ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;  
      ret += (20.0 * Math.sin(x * this.pi) + 40.0 * Math.sin(x / 3.0 * this.pi)) * 2.0 / 3.0;  
      ret += (150.0 * Math.sin(x / 12.0 * this.pi) + 300.0 * Math.sin(x / 30.0 * this.pi)) * 2.0 / 3.0;  
      return ret;
    }  

  /** 
    * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System 
	*/
    gps84_To_Bd09(lat:number,lon:number):Point {  
	  let dLat = this.transformLat(lon - 105.0, lat - 35.0);  
	  let dLon = this.transformLon(lon - 105.0, lat - 35.0);  
	  let radLat = lat / 180.0 * this.pi;  
	  let magic = Math.sin(radLat);  
	  magic = 1 - this.ee * magic * magic;  
	  let sqrtMagic = Math.sqrt(magic);  
	  dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);  
	  dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);  
	  let mgLat = lat + dLat;  
      let mgLon = lon + dLon; 
      //将 GCJ-02 坐标转换成 BD-09 坐标
      let x = mgLon;
      let y = mgLat; 
      let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.pi);  
	  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.pi);  
	  let bd_lon = z * Math.cos(theta) + 0.0065;  
	    let bd_lat = z * Math.sin(theta) + 0.006;  
        let p:Point
        p={
            lat:bd_lat,
            lng:bd_lon
        }
        return p;
}  
    /** 
	 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标 
	 */
	 gcj02_To_Bd09(gg_lat, gg_lon) {  
	    var x = gg_lon, y = gg_lat;  
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.pi);  
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.pi);  
	    var bd_lon = z * Math.cos(theta) + 0.0065;  
	    var bd_lat = z * Math.sin(theta) + 0.006;  
	    console.log(bd_lon+" "+bd_lat);  
	    } 
}
