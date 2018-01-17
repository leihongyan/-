//父集container
var Page = function(container,params){
	var defaults = {   
		sum:'',           //总条数
		length:10,        //每页显示条数
		url:'',           //ajax地址
		div_name:'',      //ajax替换div名称
		page_shownumber:5,//page_shownumber 显示页码最大个数
	}
	params = params || {} ;
	for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
	var s = this;
	s.params = params;
	s.count=Math.ceil(s.params.sum/s.params.length);
	s.par_div = document.querySelector(container);
	s.pagebox = s.par_div.querySelector(".pagebox");

	function creat_obj(obj_name,class_name,innertext,other_style_width,attr_val){
		obj_name =  document.createElement('div');
		obj_name.className = class_name;
		if(other_style_width){
			obj_name.style.width = other_style_width;
		}
		if(attr_val){
			obj_name.setAttribute('page',attr_val);
		}
		obj_name.innerHTML = innertext;
		obj_name.addEventListener('selectstart', function(){
		   	return false;
		});
		s.pagebox.appendChild(obj_name);
		if(class_name == 'page'){
			obj_name.onclick =  function(){
				s.page_click(this);
			}
			s.page.push(obj_name);
		}else if(class_name == 'active pageup'){
			obj_name.onclick =  function(){
				s.pageup();
			}
		}else if(class_name == 'active pagedown'){
			obj_name.onclick =  function(){
				s.pagedown();
			}
		}
	}
	var pageup,fsym;
	s.page = [];
	creat_obj('pageup','active pageup','上一页','65px');
	creat_obj('fsym','symbol fsym','...');
	for(var j = 0;j < s.count;j++){
		creat_obj('page','page',j+1,false,j+1);
		if(j+1 == 1){
			s.page[j].classList.add('current');
		}
		for(i = s.params.page_shownumber ;i < s.count;i++){
			if(j == i){
				hide(s.page[j]);
			}
		} 
	}
	creat_obj('lsym','symbol lsym','...');
	creat_obj('pagedown','active pagedown','下一页','65px');
	
	s.next_page =s.par_div.querySelector(".pagedown");
	s.prev_page = s.par_div.querySelector(".pageup");
	s.fsym = s.par_div.querySelector(".fsym");
	s.lsym = s.par_div.querySelector(".lsym");
	s.pages = s.par_div.querySelector(".pages");
	hide(s.prev_page);
	hide(s.fsym);
	if(s.count < 2){                     //一页
        hide(s.pages);
    }else if(s.count < s.params.page_shownumber+1){                 //5页以内
        hide(s.next_page);
        hide(s.prev_page);
        hide(s.fsym);
        hide(s.lsym);
    }else{
        show(s.pages);
    }

	function hide(obj){
		obj.style.display = 'none';
	}
	function show(obj){
		obj.style.display = 'inline-block';
	}
	s.page_num = 1;
	s.page_click = function(obj){
		s.page_num = parseInt(obj.innerHTML);
		for(var i = 0;i < s.page.length;i++){
			s.page[i].classList.remove('current');
			hide(s.page[i]);
		}
		this.page[s.page_num-1].classList.add('current');
		hide(s.next_page);
        hide(s.prev_page);
        hide(s.fsym);
        hide(s.lsym);
        if(s.count < s.params.page_shownumber+1){
        	for(var i = 0;i < s.count;i++){
				show(s.page[i]);
	        }
        }else{
        	if(s.page_num < 4){
        		for(var i = 0;i < s.params.page_shownumber;i++){
                    show(s.page[i]);
                };
                show(s.next_page);
                show(s.lsym);
        	}else if(s.page_num > s.count-3){
	            for(var i = s.count - 5;i < s.count;i++){
	                show(s.page[i]);
	            };
	            show(s.prev_page);
	            show(s.fsym);
        	}else{
	            for(var i = s.page_num - 3;i < s.page_num + 2;i++){
	                show(s.page[i]);
	            };
	            show(s.next_page);
		        show(s.prev_page);
		        show(s.fsym);
		        show(s.lsym);
	        }
        }
        ajax({
   			method: 'POST',
  　　		url: s.params.url,
  　　		data: {page: s.page_num},
  			async: true,
  　　		success: function (data){ 
  				document.querySelector(s.params.div_name).innerHTML=data;
  			}
  		});
	}

	s.pagedown = function(){
		s.page_num++;
		s.page[s.page_num-1].click();
	}

	s.pageup = function(){
		s.page_num--;
		s.page[s.page_num-1].click();
	}
}


