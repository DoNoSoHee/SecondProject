var markers = new Array(); // 마커 정보를 담는 배열
var infoWindows = new Array(); // 정보창을 담는 배열

var marker_icon_default_content = '<img src="./img/gray_icon.png" style="width:40px">';
var marker_icon_open_content = '<img src="./img/blue_icon.png" style="width:40px">';
var marker_icon_break_content = '<img src="./img/orange_icon.png" style="width:40px">';
var marker_icon_close_content = '<img src="./img/red_icon.png" style="width:40px">';
var marker_icon_selected_content = '<img src="./img/gray_icon.png" style="width:20px">';

var positions = new Array();  // 지역을 담는 배열 ( 지역명/위도경도 )

positions.push(
    //{ "title": '제나키친', foodtype: "한식" , closeD: "Sat", openH:"11", openM:"00", closeH:"20", closeM:"00", breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"30", latlng: new naver.maps.LatLng(37.6034, 127.04169) },
    { "title":"조아버거",  foodtype: "햄버거", closeD: "Sun", openH:"11", openM:"00", closeH:"20", closeM:"00", break:false, latlng: new naver.maps.LatLng(37.6039015, 127.0408758) },
    { "title": '송송식탁', foodtype: "한식",  closeD: "Sun", openH:"11", openM:"00", closeH:"21", closeM:"00", break:true, breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"00", latlng: new naver.maps.LatLng(37.6038977, 127.0427576) },
    { "title": '스시빈',  foodtype: "초밥/롤",closeD: "Sun", openH:"11", openM:"30", closeH:"22", closeM:"00", break:true, breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"00", latlng: new naver.maps.LatLng(37.60385, 127.0433) },
    { "title": '백소정',   foodtype: "일식당",closeD:"null", openH:"11", openM:"00", break:true, breakOH:"15", breakOM:"00",  breakCH:"17", breakCM:"00" ,closeH:"21", closeM:"00" , latlng: new naver.maps.LatLng(37.6028850, 127.0412987)},
    { "title":"서브웨이",  foodtype: "샌드위치", closeD:"null", openH:"08", openM:"00", break:false ,closeH:"22", closeM:"00" ,latlng: new naver.maps.LatLng(37.60384, 127.04272) },
    { "title":"밥은화",  foodtype: "한식", closeD:"Sun", openH:"11", openM:"30", break:false, closeH:"20", closeM:"30" ,latlng: new naver.maps.LatLng(37.605748, 127.044525) },
    { "title":"연이네 과자점",  foodtype: "카페, 디저트", closeD:"Sat", openH:"11", openM:"00", break:false, closeH:"20", closeM:"00" ,latlng: new naver.maps.LatLng(37.603879, 127.041563) }
//    { "title": '핏짜피자',  foodtype: "피자",closeD: "null", openH:"11", openM:"00", breakOH:"15", breakOM:"30", breakCH:"17", breakCM:"00" ,closeH:"21", closeM:"30" , latlng: new naver.maps.LatLng(37.6037559, 127.0420138) },
//    { "title": '샐러디',   foodtype: "샐러드", closeD:"null", openH:"08", openM:"30", openH2:"10", openM2:"0", breakOH:"null", breakOM:"null", breakCH:"null" ,breakCM:"null" ,closeH:"21", closeM:"00", closeH2:"2", closeM:"00" , latlng: new naver.maps.LatLng(37.6041401,127.0428911) }
);

var selectedMarker = null;

//지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = { 
        center: new naver.maps.LatLng(37.6034, 127.04169), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
var map = new naver.maps.Map(mapContainer, mapOption);

for (var i = 0; i < positions.length; i++) {
    // 지역을 담은 배열의 길이만큼 for문으로 마커와 정보창을 채워주자 !
    var markerOptions = {
        map: map,
        title: positions[i].title, // 지역구 이름 
        position: positions[i].latlng, // 지역구의 위도 경도 넣기 
        icon: {
            content: marker_icon_default_content,
            size: new naver.maps.Size(22, 35),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
            scaledSize : new naver.maps.Size(22, 35)
        }
    };
    var marker = new naver.maps.Marker(markerOptions);
    
    /* 정보창 */
    var infoWindow = new naver.maps.InfoWindow({
        content: 
    '   <div style="width:200px;text-align:center;padding:10px;">'
    +'      <strong>' + positions[i].title + '</strong><br/>'
    +'      <b>'+positions[i].foodtype+'<b>'+ '<br>' 
    +       positions[i].openH + ':'+ positions[i].openM + '~'+positions[i].closeH +":" +positions[i].closeM
    +'  </div>'
    }); // 클릭했을 때 띄워줄 정보 HTML 작성
        
    markers.push(marker); // 생성한 마커를 배열에 담는다.
    infoWindows.push(infoWindow); // 생성한 정보창을 배열에 담는다.
}	
function showMarkers() {
    setMarkers(map)    
}
function getClickHandler(seq) {
		
    return function(e) {  // 마커를 클릭하는 부분
        var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
        infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다
        
        if (infoWindow.getMap()) {
            infoWindow.close();
            // changeMarkerBack(marker);
        } else {
            infoWindow.open(map, marker); // 표출
            // changeMarkerSmall(marker);
        }
        
    }
}

for (var i=0; i<markers.length; i++) {
    naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
}
// var origin_icon = null;
// function changeMarkerSmall(marker) {
//     origin_icon = marker.c
//     marker.setIcon({
//         content : marker_icon_selected_content,
//         size: new naver.maps.Size(22, 35),
//         origin: new naver.maps.Point(0, 0),
//         anchor: new naver.maps.Point(11, 35),
//         scaledSize : new naver.maps.Size(22, 35)
//     });
// }
// function changeMarkerBack(marker) {
//     marker.setIcon({
//         content : origin_icon,
//         size: new naver.maps.Size(22, 35),
//         origin: new naver.maps.Point(0, 0),
//         anchor: new naver.maps.Point(11, 35),
//         scaledSize : new naver.maps.Size(22, 35)
//     });
// }

var opens = new Array(); //오픈한 식당
var closes = new Array(); //닫은 식당
var breaks = new Array(); //현재 브레이크인 식당

//오픈한 가게만 보이게 하기
function ChangeValue(){
    var day = document.getElementById('day');
    var hour = document.getElementById('hour');
    var min = document.getElementById('min');
    var selectedD = day.options[day.selectedIndex].value;
    var selectedH = parseInt(hour.options[hour.selectedIndex].value);
    var selectedM = parseInt(min.options[min.selectedIndex].value);
    for(var i=0;i<positions.length;i++) {
         var openH = parseInt(positions[i].openH);
         var openM = parseInt(positions[i].openM);
         var closeH = parseInt(positions[i].closeH);
         var closeM = parseInt(positions[i].closeM);
         var breakOH = parseInt(positions[i].breakOH);
         var breakOM = parseInt(positions[i].breakOM);
         var breakCH = parseInt(positions[i].breakCH);
         var breakCM = parseInt(positions[i].breakCM);
         if (selectedD == positions[i].closeD) {
             //휴무일이랑 같으면
             markers[i].setIcon({
                content : marker_icon_close_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } 
         //휴무일 아닌 애들
         else if( selectedH < openH) { 
             //오픈시간보다 작으면
             markers[i].setIcon({
                content : marker_icon_default_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH == openH && selectedM < openM ) { 
             //오픈시간보다 같은데 오픈 분보다 작으면
             markers[i].setIcon({
                content : marker_icon_default_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH > breakOH && selectedH < breakCH) {
             //브레이크 시작보다 크고 브레이크 끝보다 작으면
             markers[i].setIcon({
                content : marker_icon_break_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH == breakOH && selectedM >= breakOM) {
             //브레이크 시작이랑 같은데 분이 크면
             markers[i].setIcon({
                content : marker_icon_break_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH == breakCH && selectedM < breakCM) {
             //브레이크 끝이랑 같은데 분이 작으면
             markers[i].setIcon({
                content : marker_icon_break_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH > closeH) {
             //끝나는 시간보다 크면
             markers[i].setIcon({
                content : marker_icon_close_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else if( selectedH == closeH && selectedM >= closeM) {
             //끝나는 시간보다 작거나 같은데 끝나는 분보다 같거나 크면
             markers[i].setIcon({
                content : marker_icon_close_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         } else{ //다 아니면 보이게
             markers[i].setIcon({
                content : marker_icon_open_content,
                size: new naver.maps.Size(22, 35),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(11, 35),
                scaledSize : new naver.maps.Size(22, 35)
            })
            markers.push(markers[i]); //바뀐 마커 저장
         }
    }
    
    return markers;
 }

 