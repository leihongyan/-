
/*
    designWidth 设计稿的宽度
    fontsize 自定义字体大小
    relWidth 实际屏幕宽度
    relFontSize 字体实际尺寸
    当屏幕尺寸变化时执行该函数
    window.onresize=function(){}
 */
function fontsize(designWidth){
    function fontsizeRel(){
        var fontSize=100;
        var relWidth=document.documentElement.clientWidth;
        var relFontSize=fontSize*relWidth/designWidth;
        document.getElementsByTagName("html")[0].style.fontSize=relFontSize+"px";
    }
    fontsizeRel();
    window.onresize=fontsizeRel;
}
fontsize(750);