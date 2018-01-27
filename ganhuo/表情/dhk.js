
function _insertimg(str) {
  if (document.getSelection().type=="Range") {
    document.execCommand('delete');
  } else {}
  
  var selection = window.getSelection ? window.getSelection() : document.selection;
  var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
  if (!window.getSelection) {
    document.getElementById('fwb_sx').focus();
    var selection = window.getSelection ? window.getSelection() : document.selection;
    var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    range.pasteHTML(str);
    range.collapse(false);
    range.select();
  } else {
    document.getElementById('fwb_sx').focus();
    range.collapse(false);
    var hasR = range.createContextualFragment(str);
    var hasR_lastChild = hasR.lastChild;
    while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
      var e = hasR_lastChild;
      hasR_lastChild = hasR_lastChild.previousSibling;
      hasR.removeChild(e)
    }
    range.insertNode(hasR);
    if (hasR_lastChild) {
      range.setEndAfter(hasR_lastChild);
      range.setStartAfter(hasR_lastChild)
    }
    selection.removeAllRanges();
    selection.addRange(range)
  }
}
//普通版
function img_sxin(emoji) {
    document.getElementById("fwb_sx").focus();
    var source = '<img src="' + emoji + '">';
    _insertimg(source);
    document.getElementById("fwb_sx").blur(); 
  };
  //删除
function del_sx(){
  if (document.getElementById("fwb_sx").innerHTML.length!==0) {
      document.execCommand('delete');
    }
}
//初始化 
function face_jiazai(){
  // 将图片循环
  for (var i = 1, j = 1, face_swiper = [], str = []; i <= 108; i++) {
    if (i == 1 || i == j * 28 - 27) {
      str[j] = "";
    }
    str[j] += '<img onclick="img_sxin(' + "'http://img.51fth.com/m/images/img_sx/em/em_" +i+ ".png'" + ')" src="http://img.51fth.com/m/images/img_sx/em/em_' + i + '.png">';
    if (i > 0 && i == 28 * j || i == 108) {
      face_swiper[j] = '<div class="swiper-slide">' + str[j] + '</div>';
      $(".swiper-container_sx .swiper-wrapper").append(face_swiper[j]);
      j++;
    }
    if (i == 108) {
      var swiper_sx = new Swiper('.swiper-container_sx', {
        pagination: '.swiper-pagination_sx',
        centeredSlides: true,
        autoplayDisableOnInteraction: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      });
    }
  }
  // 处理图片的样式
  padding=8;
  var face_img=$(".faces_path img");
  for(var i=0;i<face_img.length;i++){
    face_img[i].style.padding="0 "+padding+"px"
  }
}

//placeholder
function placeholder_sx(){
    if($('#fwb_sx').html()==placeholder_div){
        $('#fwb_sx').html("")
        $("#fwb_sx").css('color','#000');
    }
}
/*********************需要计数*********************************/
//计数
var old_txt=0;//j旧文本
var length_sx=0;//内容长度
function js(jsLen,jsNum,dataJs){
  data_js = $("#fwb_sx").attr(dataJs);
  data_js++;
  $("#fwb_sx").attr(dataJs,data_js);
    var txt=document.getElementById("fwb_sx").innerHTML;
    txt=inner_format(txt);
    txt=txt.replace(/\r\n/g,"a");
    if(txt.length>=jsLen) {
        document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==8){ // 按 backspace
                 //要做的事情
            } else{
              return false;
            }
        }; 
      }else{
        document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==8){ // 按 backspace
                 //要做的事情
            } else{
              return true;
            }
        }; 
      }
    length_sx=txt.length;
    old_txt=txt;
    if(txt.length==0){
      length_sx=0
    }
    $(jsNum).html(length_sx);
}
//格式化
function inner_format(str){
    str= str.replace(/<div><br><\/div>/g,"\r\n").replace(/<div>/g,"\r\n")
            .replace(/<\/div>/g,"")
            .replace(/<img src="http:\/\/img.51fth.com\/m\/images\/img_sx\/em\/(em_[0-9]*).png"\>/g,"[$1]")
            .replace(/<br>/g,"\r\n")
            .replace(/&nbsp;/g," ");
    return str;
}
