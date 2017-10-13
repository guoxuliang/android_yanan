/**
 * 清单
 */
;define(function(require, exports, module){

	var submit = function(){


	};

	var validate = function(){


	}

	var nameHid = function(name){
		if(name==null||name==undefined||name==''){
			return '';
		}
		var newName = '';
    	if(name.length==1){
    		newName = name+'医生';
    	}else if(name.length==2){
    		newName = name.substring(0,1)+'*医生';
    	}else{
    		newName = name.substring(0,1)+'**医生';
    	}
    	return newName;
	}

	 //查询其他选项
    var queryOther = function(op){
    	var tpl   =  $("#tplListItem").html();
		var template = Handlebars.compile(tpl);
		var that = this;
		that.account = $.parseJSON(window.localStorage.account);
		//传染病
    	var queryCRB = function(){

    		var paramsQuery ={
    				healthArchivesNo:that.account.user.idCardNo
    		};

    		var url=aigovApp.constants.my.MY_HEALTH_CRB;
        	aigovApp.utils.openLoading();
    		aigovApp.ajax(url, paramsQuery, function(d){
    			aigovApp.utils.closeLoading();
    			if(d.code==0){
    				var data = d.data;
    				if(data.length>0){
    					var newList = [];
    					var length = data.length;
//    					if(length>3){
//    						length = 3;
//    					}
    					for(var i = 0;i<length;i++){
    						var d = data[i];
    						newList.push({
    							type:'crb',
    							id:d.infectionReporId,
    							time:d.reportDateDesc,
    							data1:d.reportOrgName,
    							data2:d.infectionTypeName
    						})
    					}

    					var html = template({data:newList});
        				$('#list .item').append(html);

        				$('.detailBtncrb').click(function(){
        					var me = $(this);
        					var id = me.data('id');
        					var pageParam = {
        	            			id:id
        	            	}
        	            	aigovApp.openAppWindow('myHealthyCRB',pageParam);
        				});
    				}
    			}
    		});
    	}
    	//体检
    	var queryTJ = function(){

    		var paramsQuery ={
    				healthArchivesNo:that.account.user.idCardNo
    		};

    		var url=aigovApp.constants.my.MY_HEALTH_TJ;
        	aigovApp.utils.openLoading();
    		aigovApp.ajax(url, paramsQuery, function(d){
    			aigovApp.utils.closeLoading();
    			if(d.code==0){
    				var data = d.data;
    				if(data.length>0){
    					var newList = [];
    					var length = data.length;
//    					if(length>3){
//    						length = 3;
//    					}
    					for(var i = 0;i<length;i++){
    						var d = data[i];
    						newList.push({
    							type:'tj',
    							id:d.healthArchivesNo,
    							time:d.examDateDesc,
    							data1:d.orgName
    							//data2:nameHid(d.respDoctorName)
    						})
    					}
    					var html = template({data:newList});
        				$('#list .item').append(html);

        				$('.detailBtntj').click(function(){
        					var me = $(this);
        					var id = me.data('id');
        					var pageParam = {
        	            			id:id
        	            	}
        	            	aigovApp.openAppWindow('myHealthyTJ',pageParam);
        				});
    				}
    			}
    		});
    	}
    	//血糖
    	var queryXT = function(){

    		var paramsQuery ={
    				healthArchivesNo:that.account.user.idCardNo
    		};

    		var url=aigovApp.constants.my.MY_HEALTH_XT;
        	aigovApp.utils.openLoading();
    		aigovApp.ajax(url, paramsQuery, function(d){
    			aigovApp.utils.closeLoading();
    			if(d.code==0){
    				var data = d.data;
    				if(data.length>0){
    					var newList = [];
    					var length = data.length;
//    					if(length>3){
//    						length = 3;
//    					}
    					for(var i = 0;i<length;i++){
    						var d = data[i];
    						newList.push({
    							type:'xt',
    							id:d.diabetes2FollowupId,
    							time:d.thisFollowupDateDesc,
    							data1:d.refertoOrgName,
    							data2:'空腹血糖值:'+(d.fbg||'')+" 餐后两小时血糖值:"+(d.pbg||'')
    						})
    					}

    					var html = template({data:newList});
        				$('#list .item').append(html);

        				$('.detailBtnxt').click(function(){
        					var me = $(this);
        					var id = me.data('id');
        					var pageParam = {
        	            			id:id
        	            	}
        	            	aigovApp.openAppWindow('myHealthyXT',pageParam);
        				});
    				}
    			}
    		});
    	}
    	//血压
		var queryXY = function(){

			var paramsQuery ={
					healthArchivesNo:that.account.user.idCardNo
			};

			var url=aigovApp.constants.my.MY_HEALTH_XY;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, paramsQuery, function(d){
				aigovApp.utils.closeLoading();
				if(d.code==0){
					var data = d.data;
					if(data.length>0){
						var newList = [];
						var length = data.length;
//						if(length>3){
//							length = 3;
//						}
						for(var i = 0;i<length;i++){
							var d = data[i];
							newList.push({
								type:'xy',
								id:d.hypertensionFollowupId,
								time:d.thisFollowupDateDesc,
								data1:d.refertoOrgName,
								data2:'收缩压:'+(d.sbp||'')+" 舒张压:"+(d.dbp||'')
							})
						}

						var html = template({data:newList});
						$('#list .item').append(html);

						$('.detailBtnxy').click(function(){
							var me = $(this);
							var id = me.data('id');
							var pageParam = {
			            			id:id
			            	}
			            	aigovApp.openAppWindow('myHealthyXY',pageParam);
						});
					}
				}
			});
		}
		//疫苗
		var queryYM = function(){

			var paramsQuery ={
					healthArchivesNo:that.account.user.idCardNo
			};

			var url=aigovApp.constants.my.MY_HEALTH_YM;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, paramsQuery, function(d){
				aigovApp.utils.closeLoading();
				if(d.code==0){
					var data = d.data;
					if(data.length>0){
						var newList = [];
						var length = data.length;
//						if(length>3){
//							length = 3;
//						}
						for(var i = 0;i<length;i++){
							var d = data[i];
							newList.push({
								type:'ym',
								id:d.vaccRecordId,
								time:d.vaccinateDateDesc,
								data1:d.vaccineName,
								data2:d.vaccinateOrgName
							})
						}

						var html = template({data:newList});
						$('#list .item').append(html);

						$('.detailBtnym').click(function(){
							var me = $(this);
							var id = me.data('id');
							var pageParam = {
			            			id:id
			            	}
			            	aigovApp.openAppWindow('myHealthyYM',pageParam);
						});
					}
				}
			});
		}

		//诊疗
		var queryZL = function(){

			var paramsQuery ={
					healthArchivesNo:that.account.user.idCardNo
			};

			var url=aigovApp.constants.my.MY_HEALTH_ZL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, paramsQuery, function(d){
				aigovApp.utils.closeLoading();
				if(d.code==0){
					var data = d.data;
					if(data.length>0){
						var newList = [];
						var length = data.length;
//						if(length>3){
//							length = 3;
//						}
						for(var i = 0;i<length;i++){
							var d = data[i];
							newList.push({
								type:'zl',
								id:d.id,
								time:d.time,
								data1:d.orgName,
								//data2:nameHid(d.doctorName),
								data3:d.diagName,
								other:d.flag
							})
						}

						var html = template({data:newList});
						$('#list .item').append(html);

						$('.detailBtnzl').click(function(){
							var me = $(this);
							var id = me.data('id');
							var flag = me.data('other');
							var pageParam = {
			            			id:id,
			            			flag:flag
			            	}
			            	aigovApp.openAppWindow('myHealthyZL',pageParam);
						});
					}
				}
			});
		};


    	//查询
		var type = op.type;
		if(type=='crb'){

			$('#titleName').html('传染病报告');
			var obj = winObj.getComponent('header');
			obj.setTitle("传染病报告");
			queryCRB();
		}else if(type=='tj'){

			$('#titleName').html('健康体检');
			var obj = winObj.getComponent('header');
			obj.setTitle("健康体检");
			queryTJ();
		}else if(type=='xt'){

			$('#titleName').html('血糖');
			var obj = winObj.getComponent('header');
			obj.setTitle("血糖");
			queryXT();
		}else if(type=='xy'){

			$('#titleName').html('血压');
			var obj = winObj.getComponent('header');
			obj.setTitle("血压");
			queryXY();
		}else if(type=='ym'){

			$('#titleName').html('预防接种');
			var obj = winObj.getComponent('header');
			obj.setTitle("预防接种");
			queryYM();
		}else if(type=='zl'){

			$('#titleName').html('诊断记录');
			var obj = winObj.getComponent('header');
			obj.setTitle("诊断记录");
			queryZL();
		}

    }
    winObj=null;
	module.exports = {
		onCreate : function(o){
			Handlebars.registerHelper("dateDayFormat",function(date){
                return moment(date).format('YYYY-MM-DD');
            });
			winObj=o
			queryOther(o.intent);
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }

	};
});
