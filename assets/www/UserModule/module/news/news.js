/*
 * 资讯
 */
define(function(require, exports, module){

	

	module.exports = {
		onCreate : function(winObj){
			
			
			var navSwiper, topSwiper, isNew;

			// 栏目导航单击事件
			var newsNavClick = function(o){
				var that = o;
				
				// 选中样式
				/*$('.swiper-slide a').removeClass('current');
				if(!o.opts.catId){
					$(".newsnav-wrapper a").first().addClass('current');
					that.opts.catId = $(".newsnav-wrapper a").first().data('id');
					that.opts.title = $(".newsnav-wrapper a").first().html();
				} else {
					$(".newsnav-wrapper").find("a[data-id='"+o.opts.catId+"']").addClass('current');
				}*/
				
				//领导介绍不要轮播
				if(that.opts.catId == "21778"){
					$("#newstop",that.dom).hide();
				} else {
					$("#newstop",that.dom).show();
				}
				newsTopLoad(that);
			}
			
			//资讯
			var newsMain;
			
			//每页显示条数
			var pageCount=10;
			
			//当前所在 
			var curPageNum=1;
			
			//滚动对象
			var iScrollObj=null;
			
			//得到下拉对象
			var $pulldown = null;
			
			//得到上拉对象
			var $pullup   = null;
			
			//内容
			var $content  = null;
			


			// 轮播新闻
			var newsTopLoad = function(o){
				// 通知公告和视频新闻不显示轮播
				if(newsMain.opts.catId == '10419' || newsMain.opts.catId == '10014'){
					$("#newstop",newsMain.dom).hide();
					newsListLoad();
					return;
				}
				
				var url = aigovApp.constants.news.NEWS_LIST_URL;
				
				var params = {
						catId : newsMain.opts.catId,
						curPageNum : 1,
						pageCount : 3,
						dictId : newsMain.opts.dictId,
						isShowThumb : true
				};

				aigovApp.utils.openLoading();

				aigovApp.ajax(url, params, function(d){
					if(d.data!=null){
						
						aigovApp.utils.closeLoading();
						
						// 轮播新闻模板渲染
						var tpl   =  $("#tpl2",newsMain.dom).html();
						var template = Handlebars.compile(tpl);
						var html = template(d);
						
						// 轮播新闻滑动控制
						if(isNew){
							$('#newstop-wrapper',newsMain.dom).append(html);
							topSwiper = new Swiper($('#newstop',newsMain.dom)[0], {
								pagination : $('.swiper-pagination',newsMain.dom)[0],
								loop : true,
								autoplay : 5000,
								preventClicks : false,
								preventLinksPropagation : true,
								width : window.innerWidth,
								autoplayDisableOnInteraction : false,
						        observer : true
							});
						} else {
							topSwiper.stopAutoplay();
							topSwiper.removeAllSlides();
							if($.trim(html) != ""){
								topSwiper.appendSlide(html);
								topSwiper.startAutoplay();
							}
						}
						
						if($.trim(html) != ""){
							var flag=true;
							// 轮播新闻单击事件
							$("#newstop a",newsMain.dom).on(navigator.msPointerEnabled?"MSPointerMove":"touchmove",function(){
								flag=false;
							})
							
							$("#newstop a",newsMain.dom).on(navigator.msPointerEnabled?"MSPointerDown":"touchstart",function(){
								flag=true;
								
							})
							$("#newstop a",newsMain.dom).on(navigator.msPointerEnabled?"MSPointerUp":"touchend",function(){
								if(flag){
									var param = {
											"id": $(this).data('id'),
											"title": $(this).data('title'),
											"dictId" : newsMain.opts.dictId
									};
									aigovApp.openAppWindow("newsDetail",param);
								}
							})
						}
						
						// 轮播新闻只有一条是暂时轮播
						if(d.data.length == 1){
							topSwiper.stopAutoplay();
						}
						newsListLoad();
					}else{
					
						aigovApp.nativeFunc.alert("请先订阅新闻！");	
					
					}
				});
			};

			// 新闻列表
			var newsListLoad = function(){
				getDatas();

			};
			
			/**
			 * 渲染数据
			 */
			var renderData=function(datas,isAppend){
				
				var tpl   =  $("#tpl3",newsMain.dom).html();
				var template = Handlebars.compile(tpl);
				var result = template({data:datas});
				
				_controlUpAndDown(datas);
				
				var html=$(result);
				html.on("tap",function(){
					var catId = $(this).data('catid');
					if(catId == "24968"){
						var param = {
							"url": $(this).data('contenturl'),
							"title": "资讯"
						};
						aigovApp.openAppWindow("openUrl2",param);
					} else {
						var param = {
							"id": $(this).data('id'),
							"title": $(this).data('title'),
							"dictId" : newsMain.opts.dictId
						};
						aigovApp.openAppWindow("newsDetail",param);
					}
				})
				//追加
				if(isAppend){
					
					$content.append(html);
					
					refreshScroll();
					
				} else {//重新渲染
					
					$content.html(html);
					
					//若已经有滚动实例了,则不再创建
					if(!iScrollObj){
						
						//滚动辅助模块
						iScrollObj=aigovApp.iscrollAssist.newVerScrollForPull($("#J-ai-body-box",newsMain.dom),pulldownAction,pullupAction,null,pullText);
					}	
					
					//滚动刷新,且回到顶端
					refreshScroll(true);
				}
				
				aigovApp.utils.closeLoading();
				
				isNew = false;
			}
			
			
			/**
			 * 判断上拉操作下拉操作
			 */
			var _controlUpAndDown=function(datas){
				$pulldown.show();
				//若要渲染的数据小于每页显示的条数,说明后面没有数据了,则隐藏上拉加载更多的DOM
				if(datas){
					if(pageCount > datas.length){
						$pullup=$pullup.detach();
					}else if($pullup && $pullup.length>0){
						$content.after($pullup.show());
					}else{
						$content.after($pullup.show());
					}
				}else{
					$pullup = $pullup.detach();
				}
			}
			
			//下拉操作
			var pulldownAction=function(){
				newsTopLoad();
				
			}
			
			//上拉操作
			var pullupAction=function(){
				getDatas(true);
			}
			
			/**
			 * 获取记录列表数据
			 * @param isAppend 是否是追加
			 */
			var getDatas=function(isAppend){
				aigovApp.utils.openLoading();
			
				//是否翻页
				if(!isAppend){
					curPageNum = 1;
				}else{
					curPageNum ++ ;
				}
			
				var callback = function(content){
					
					renderData(content,isAppend);
					
				}
				
				getDatasByPage(callback);
			}
			
			/**
			 * 得到页面数据
			 */
			var getDatasByPage=function(callback){
				var url = aigovApp.constants.news.NEWS_LIST_URL;
				var params = {
						catId : newsMain.opts.catId,
						curPageNum : curPageNum,//curPage
						pageCount : pageCount,//pageSize
						dictId : newsMain.opts.dictId,
						isShowThumb : false
				};
				
				var cbFun = function(data){
					
					//若获取失败,打印失败信息
					if(!data.code=="0") {
						
						aigovApp.nativeFunc.alert(data.message);
						aigovApp.utils.closeLoading();
						refreshScroll();
						return;
					}
					
					if(typeof callback === 'function'){
						callback(data.data);
					}
				}
				
				//请求后台
				aigovApp.ajax(url, params , cbFun);
			}
			
			/**
			 * 刷新操作
			 */
			var refreshScroll = function(isScrollToTop){
				
				if(iScrollObj){
					
					iScrollObj.refresh();
				
					if(isScrollToTop){
						iScrollObj.scrollTo(0,iScrollObj.minScrollY);
					}
				}
			};
			
			var pullText = {
				
				//下拉刷新文字
				pulldownRefresh   : '下拉刷新...',
				
				//上拉加载更多文字
				pullupLoadingMore : '上拉加载更多...',
				
				//松开开始刷新文字
				releaseToRefresh  : '松手开始刷新...',
				
				//松开开始加载文字
				releaseToLoading  : '松手开始加载...',
				
				//加载中文字
				loading           : '加载中...',
			};
			// 订阅
			var subscribeLoad = function(o){
				var that = o;
				$(".subscribe",newsMain.dom).click(function(){
					var param = {
						userId : that.opts.userId,
						dictId : that.opts.dictId,
						id : "newsMain",
						win : o//将当前窗口对象传给子窗口
					};
					aigovApp.openAppWindow("newsSubscribe",param);
				});
			}


			var NewsMain = function(opts,dom){
				this.opts=opts;
				this.dom=dom;
			}

			NewsMain.prototype.load = function(){
				newsNavClick(this);
			}
			
			NewsMain.prototype.reloadNav = function(){
				newsNavClick(this);
			}
			
			
			
			
			isNew = true;
			
			newsMain = new NewsMain(winObj.intent,winObj.$dom);
			
			aigovApp.newsMain = newsMain;
			
			//得到下拉对象
			$pulldown = $('#aigov-list-pulldown',winObj.$dom);
			
			//得到上拉对象
			$pullup   = $('#aigov-list-pullup',winObj.$dom);
			
			//内容
			$content  = $('#newslist',winObj.$dom);
			
			iScrollObj=null;
			
			pageCount=10;
			
			//当前所在 
			curPageNum=1;
			
			newsMain.load();
		},
		onBack:function(intent){
			
		}
	}

});
