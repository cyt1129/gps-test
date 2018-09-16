import { Component,OnInit,ChangeDetectionStrategy,ChangeDetectorRef,OnDestroy} from  "@angular/core";
import {
  MapOptions, 
  Point, 
  MarkerOptions, 
  NavigationControlOptions, 
  ControlAnchor,
  NavigationControlType, 
  OverviewMapControlOptions, 
  ScaleControlOptions, 
  MapTypeControlOptions, 
  MapTypeControlType,
  GeolocationControlOptions
} from 'angular2-baidu-map';
import { GpsService } from './gps.service';
import { GpsCoordService } from './gps-coord.service';
import { Marker } from "./model/marker";

@Component({
  selector: 'app-gps-panel',
  templateUrl: './gps-panel.component.html',
  styleUrls: ['./gps-panel.component.css']
})
export class GpsPanelComponent implements OnInit {

  opts:MapOptions;
  public markers:Marker[] = [];
  
  controlOpts:NavigationControlOptions;
  overviewmapOpts:OverviewMapControlOptions;
  scaleOpts:ScaleControlOptions;
  mapTypeOpts:MapTypeControlOptions;
  geolocationOpts:GeolocationControlOptions

  //public GPSList:GPS[];//这个可能不需要
  private timer;
  ismarkersTestk:boolean = true;

  constructor(
    private _gpsService:GpsService,
    private _gpsCoordService:GpsCoordService
  ){
    this.opts={
      centerAndZoom:{ //设置中心点和缩放级别
        lng:120.12, //经度
        lat:30.16,  //纬度
        zoom:11     //缩放级别
      },
      minZoom:3,//最小缩放级别的地图
      maxZoom:19,//最大缩放级别
      enableHighResolution:true, //是否使用高分辨率的地图，default:true
      enableAutoResize:true,//是否可以自动调整大小，default:true
      enableMapClick:true,//地图是否可以点击，default:true
      disableDragging:false,//是否禁用地图拖动功能
      enableScrollWheelZoom:true,//是否启用滚轮进行缩放功能
      disableDoubleClickZoom:true,//是否禁用双击缩放功能
      enableKeyboard:false,//是否启用键盘移动地图功能
      enableContinuousZoom:true,//是否启用连续缩放功能
      disablePinchToZoom:false,//是否禁用缩放功能的缩放
      currentCity:'苏州市'
    };


    // 这是控件control
    this.controlOpts = {         // 导航控件
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,      // 显示的控件的位置
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,   // 用来描述它是什么样的导航
      offset: {                                        // 控件的大小
        width: 30,
        height: 30
      },
      showZoomInfo: true,                             // 是否展示当前的信息
      enableGeolocation: true                         // 是否启用地理定位功能
    };

    this.controlOpts = {         // 导航控件
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,      // 显示的控件的位置
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,   // 用来描述它是什么样的导航
      offset: {                                        // 控件的大小
        width: 30,
        height: 30
      },
      showZoomInfo: true,                             // 是否展示当前的信息
      enableGeolocation: true                         // 是否启用地理定位功能
    };
    this.overviewmapOpts = {    // 地图全景控件
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,  // 显示的控件的位置
      isOpen: true                                    // whf 。。官网里没有说明？？
    };
    this.scaleOpts = {          // 比例尺控件
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    };
    this.mapTypeOpts = {        // 地图类型
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
    };

  }

  ngOnInit(){ 
  /*
    this._gpsService.realSubject.subscribe(data=>{
      //console.log(data);
      //this.markerslib[data.name] = this.handleGPSRawdata(data.data.data);
      //console.log(this.markerslib);
      //把marker库里的存到一个新的下标是0，1，2..的数组里，不然ngFor识别不了，醉了.....
      //另外要改marker，添加entityId属性，方便找到对应的设备信息,如果需要点一下marker就显示marker信息的话
      //let i = 0;//应该可以取下标的吧
      //for(let tmp in this.markerslib){
        //this.markers[i] = this.markerslib[tmp];
    
           //this.markersTest[i].entityId = tmp;
           //this.markersTest[i].point = this.markerslib[tmp];
        
        //i++;
      //}
     
       let list = this.GPSList;  //不能直接处理GPSList
      for(let tmp in list){
        if(msg.name == list[tmp].entityId){
          this.GPSList[tmp].data = msg.data.data;
        }
      }
      //console.log(this.markers);
    });
*/
    //gps信息转换成marker信息存到markersTest里面
    this._gpsService.gpsSubject.subscribe(msg=>{
      console.log(msg);
      let hasThisEntity:boolean = false;
      
      let m = new Marker();
      m.entityId = msg.name;
      m.point = msg.data.point;
      m.title = msg.data.name;
      m.time = msg.data.data.time;
      
      console.log(m);
    if(this.markers.length == 0){
      this.markers.push(m);
    }else{

      for(let tmp in this.markers){
        if(msg.name === this.markers[tmp].entityId){
          this.markers[tmp] = m;
          hasThisEntity = true;
          break;
        }
      }
      if(!hasThisEntity){
        this.markers.push(m);
      }
    }
    console.log(this.markers);
    });

    
  }

  

  loadMap(map:any){
    console.log('map instance here',map);
  }

  clickmap(e:any){
    console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
  }
  //点击marker后的弹出框
  public showWindow({ e, marker, map }: any,mark): void {
  let t = new Date(mark.time).toLocaleString();
  let sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+mark.title+"</h4>"+
                 "<p>"+"最后更新时间："+t+"</p>";
    map.openInfoWindow(
      new window.BMap.InfoWindow(sContent,{
        offset: new window.BMap.Size(0, -30),
        //title: mark.options.title
      }),
      marker.getPosition()
    )
  }
 
  //处理gps数据
  handleGPSRawdata(data:string):Point{
    //let data="$GNRMC,070203.000,A,3015.8482,N,12007.0309,E,0.00,0.00,310718,,,A*75";
    let strArray = data.split(",");
    let y = parseFloat(strArray[5]);//原始经度
    let x = parseFloat(strArray[3]);//原始纬度
    let y_z = parseInt((y/100).toString());//取经度整数部分
    let x_z = parseInt((x/100).toString());//取维度整数部分
    x = (x-x_z*100)/60+x_z;
    y = (y-y_z*100)/60+y_z;
    let p:Point;
    p = this._gpsCoordService.gps84_To_Bd09(x,y);
    console.log(p);
    //marker.lat=30;
    return p;
  }


  
}
   

