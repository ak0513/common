$(window).on('load',function(){
	responsive();
	mainSlide();
	mainProduct();
	counterMotion();
	rndSlide();
	tabMobControl();
	
	setTimeout(function(){
		locationControl();
		facilitySlide();
	}, 200);
});

$(function() {
	letSet();	
	btnOpenControl();
	mainPanel();
	scrollCont();
	scrollHistory();
	controlAccor();
	
	if($('.state_img_list').length > 0){
		var stateHtml = $('.state_img_list ul.swiper-wrapper').html();
		$('.state_img_thumb ul.swiper-wrapper').append(stateHtml);
	}
});

function letSet(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
	
	var myTimer
	, widSize = $(window).width();
	$(window).resize(function(){
		clearTimeout(myTimer);
		myTimer = setTimeout(function(){
			var mainWid = $(window).width();
			if(widSize != mainWid){
				document.documentElement.style.setProperty('--vh', vh+'px');
			}
		},350);
	});
}

function responsive(){
	var res = '';
	var param = $('#header');
	var param2 = $('#wrap');
	var gnbArea = $('.gnb li');
	var gnbLink = gnbArea.children("a");
	$('#header').append('<div class="gnb_bg"></div>')

	//default 
	if(!($(".btn_menu").is(":hidden"))) res = "mob";
	else res = "web";  
	param.attr("class",res);
	param2.attr("class",res);
	def(param, param2);

	$(window).resize(function(){
		if(!($(".btn_menu").is(":hidden"))) res2 = "mob";
		else res2 = "web"; 
		param.attr("class",res2);
		param2.attr("class",res2);
		if(res != res2){
			res = res2;  
			def(param, param2);
		}
	}); 

	//mobile
	$('.btn_menu').on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('body, #header nav, .area_menu_all').removeClass('active');
			posY = $('body').attr('data-scroll');
			$(window).scrollTop(posY);
		}else{
			posY = window.scrollY || document.documentElement.scrollTop;
			$(this).addClass('active');
			$('body, #header nav, .area_menu_all').addClass('active');
			$('body').attr('data-scroll',posY);
		}
		return false;
	});
	$(document).on('click','.btn_close',function(){
		$('.btn_menu').removeClass('active');
		$('body, #header nav, .area_menu_all').removeClass('active');
		posY = $('body').attr('data-scroll');
		$(window).scrollTop(posY);
		return false;
	});
	
	function webGnb(){
		$('#header.web .gnb > li > a').on({
			mouseover: function(){
				$('.gnb_bg').addClass('active');
				setTimeout(function(){
					$('#header .inr').addClass('active');
				}, 200);
				if($(this).parents('li').hasClass('only')){
					$('.gnb_bg').css('height','76px');
				}else{
					$('.gnb_bg').css('height','149px');
				}
				
				$('.gnb > li').removeClass('active').find('ul').stop().removeClass('active').slideUp("fast");
				$(this).parent().addClass('active').find('ul').stop().slideDown('', function(){
					$(this).addClass('active');
				}); 

				$('.gnb').hover(function() {   
				}, function(){     
					$('.gnb_bg').removeClass('active');
					setTimeout(function(){
						$('#header .inr').removeClass('active');
					}, 200);
					$('.gnb > li').removeClass('active').find('ul').stop().removeClass('active').slideUp("fast");
				}); 
			},
			focus: function(){
				$('.gnb_bg').addClass('active');
				setTimeout(function(){
					$('#header .inr').addClass('active');
				}, 200);
				if($(this).parents('li').hasClass('only')){
					$('.gnb_bg').css('height','76px');
				}else{
					$('.gnb_bg').css('height','149px');
				}
				
				$('.gnb > li').removeClass('active').find('ul').stop().removeClass('active').slideUp("fast");
				$(this).parent().addClass('active').find('ul').stop().slideDown('', function(){
					$(this).addClass('active');
				});  

				$('*').not('.gnb *').focus(function() {  
					$('.gnb_bg').removeClass('active');
					setTimeout(function(){
						$('#header .inr').removeClass('active');
					}, 200);
					$('.gnb > li').removeClass('active').find('ul').stop().removeClass('active').slideUp("fast");
				}); 
			}
		});
		
		$('.gnb li').each(function(){
			if(!($(this).find("ul").length > 0)){
				$(this).addClass('only');
			}
		});
	}
	webGnb();

	function mobGnb(){
		if(param.attr("class") == "mob"){
			$('.gnb li a, nav .gnb').unbind('mouseenter mouseleave mouseover focus');
			$('.area_menu_all .gnb li').each(function(){		
				var cateLink = $(this).children('a'),
				cateLi = cateLink.parent();
				if(cateLink.next('ul').length > 0){
					$('<button type="button" class="open">硫붾돱�대┝</button>').appendTo(cateLi);
				}
			});
			var gnbRoot = $('.area_menu_all'),
			gnbMenu = $('.area_menu_all .gnb li button'),
			gnbLink = gnbMenu.siblings('a');
			//$('.area_menu_all .gnb > li ul').hide();	

			function gnbShow(){		
				var openText = $(this).text();
				$(this).parent().siblings().find("> button").removeClass('active').end().removeClass('active').children('ul').stop().slideUp('');
				$(this).toggleClass('active').siblings("button").toggleClass('active');
				//$(this).text(openText == '硫붾돱�대┝' ? '硫붾돱�リ린' : '硫붾돱�대┝');
				$(this).parent("li:first").toggleClass('active').children('ul').stop().slideToggle('');			
				return false;
			}
			gnbMenu.click(gnbShow);
			gnbLink.click(gnbShow);
			
			
		}
	}
	
	function def(param){
		if(param.attr("class") == "web"){
			$('#header nav .gnb > li > a').unbind('click');
			$('#header nav .gnb > li').removeClass('active');
			$('#header nav .gnb > li > ul').removeAttr('style');
			$('#header nav .area_menu_all').contents().unwrap();
			$('#header nav .btn_close').remove();
			webGnb();
			
			$('#header nav button.open').remove();
			$('.btn_menu').removeClass('active');
			$('body, #header nav, .area_menu_all').removeClass('active');
			$('.area_tab_small').removeClass('full');

		} else if (param.attr("class") == "mob"){  			
			$('.gnb li a, nav .gnb').unbind('mouseenter mouseleave mouseover focus');
			$('<a href="#" class="btn_close"><span>硫붾돱�リ린</span></a>').prependTo('#header.mob nav');
			$('#header.mob nav .gnb, #header.mob nav .btn_close').wrapAll('<div class="area_menu_all"></div>');
			mobGnb();
		}
	}
}




function mainPanel(){
	if(!($(".onpage_panel").length > 0)) return;
	
	var $wrap = $(".onpage_panel"),
	pages = $("[data-onepage]").length,
	scrolling = false,
	currentPage = 1,				
	$navPanel = $(".nav-panel"),
	$scrollBtn = $(".scroll-btn"),
	$navBtn = $(".nav-btn");
	
	$("body").attr("class","active_page" + currentPage);
	

	var widthMatch = matchMedia("all and (min-width: 1301px)");
	var widthHandler = function(matchList) {
		if (matchList.matches) {
			
			setTimeout(function(){
				$wrap.find("[data-onepage]").removeClass();
				$("body").attr("class","active_page1");
			}, 100);
			
			//functions
			function manageClasses() {
				var prevPage = currentPage - 1;
				$wrap.find("[data-onepage]").removeClass();
				$wrap.find("[data-onepage=" + currentPage + "]").addClass("active_page" + currentPage);	
				$wrap.find("[data-onepage=" + prevPage + "]").addClass("visible");
				$navBtn.removeClass('active');
				$(".nav-btn.nav-page" + currentPage).addClass('active');
				$("body").attr("class","active_page" + currentPage);
				scrolling = true;
				setTimeout(function () {						
					scrolling = false;
				}, 1000);
				
				//add
			}				
			function navigateUp() {
				if (currentPage > 1) {
					currentPage--;
					manageClasses();
				}
				
			}
			function navigateDown() {
				if (currentPage < pages) {
					currentPage++;
					manageClasses();
				}
			}

			//mousewheel
			$(document).on("mousewheel DOMMouseScroll", function (e) {
				if (!scrolling) {
					if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
						navigateUp();
						if($("body").hasClass("active_page3")){
							is_action = false;
							counterMotion();
						}
					} else {
						navigateDown();
						if($("body").hasClass("active_page3")){
							is_action = false;
							counterMotion();
						}
					}
				}
			});
			//navigation
			// nav up/down btn page navigation
			$(document).on("click", ".scroll-btn", function () {
				if ($(this).hasClass("up")) {
					navigateUp();
				} else {
					navigateDown();
				}
			});

			//nav circle direct page btn
			jQuery.fn.navBtnClik = function(){
				var target = this.attr("data-target");
				var prevPage = target - 1;
				$wrap.find("[data-onepage]").removeClass();
				$wrap.find("[data-onepage=" + target + "]").addClass("active_page" + target);
				$wrap.find("[data-onepage=" + prevPage + "]").addClass("visible");
				$("body").attr("class","active_page" + target);
				$navBtn.removeClass('active');
				this.addClass('active');
				currentPage = target;
				scrolling = true;
				setTimeout(function () {
					scrolling = false;
				}, 1000);
			}
			
			
			$('.nav-panel').each(function(){
				var navPage = $(this).find('li');
				navPage.on('click',function(){
					if($(this).hasClass('.active')){
						return;
					}else{
						if (!scrolling) {
							$(this).navBtnClik();
						}
					}
				});
				navPage.eq(0).click();
				setTimeout(function(){
					$('[data-onepage="1"]').addClass('active_page1');
				}, 100);

			});
			
			
		} else {
			mobPanel();
		}
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}

function mobPanel(){
	$("body").attr("class","active_page1");
	setTimeout(function(){
		$('[data-onepage="1"]').addClass('active_page1');
	}, 100);

	var pageTop = $('[data-onepage="2"]').position().top;
	
	$(window).scroll(function(){
		var mainTop = $(document).scrollTop();
		if(mainTop > pageTop){
			$("#header .inr").addClass("fix");			
		}else{
			$("#header .inr").removeClass("fix");
		}
		
		$('[data-onepage]').each( function(i){	
			var winTop = $(window).scrollTop() + $(window).height(),
			top_of_object = $(this).offset().top + $(this).outerHeight()/2,
			target = $(this).data("onepage");
		
			if( winTop > top_of_object ){     
				$(".onpage_panel").find("[data-onepage]").removeClass();
				$(this).addClass("active_page" + target);	
				$("body").attr("class","active_page" + target);
			}else{
				$(this).removeClass("active_page" + target);
			}	
		});   
		
		$('.is_ani').each( function(i){		
			var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			
			if( bottom_of_window > bottom_of_object ){                
				$(this).addClass("is_show");	
			}else{
				$(this).removeClass('is_show');
			}		
		});   
		
		$('.is_conter').each( function(i){		
			var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			
			if( bottom_of_window > bottom_of_object ){                
				counterMotion();
				is_action = true;
			}else{
			}		
		});   

		
	});
}



function controlAccor(){
	if(!($('[data-control="accordion"]').length > 0)) return;
	$('[data-control="accordion"]').on('click',function(){
		$(this).toggleClass('active').parent().next('[data-control="accordion_conts"]').slideToggle();
		if($(this).hasClass('show')){
			$(this).toggleClass('show active');
		}
		return false;
	});
	var widthMatch = matchMedia("screen and (min-width: 1025px)");
	var widthHandler = function(matchList) {
	    if (matchList.matches) {
	    	$('[data-control="accordion"]').removeClass('active');
	    	$('[data-control="accordion_conts"]').removeAttr('style');
	    }
	};
	widthMatch.addListener(widthHandler);
	widthHandler(widthMatch);
}


