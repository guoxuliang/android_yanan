/**
 * 用户和部门信息进行操作的
 * 
 * @author keyz@asiainfo.com
 * @since 2016-05-25
 */
define(function(require, exports, module){
	//存储辅助
	var storageAssist = require('storageAssist');
	
	var userData=null;
	var groupData=null;
	var constants = {
			//用户表
			USER_TABLE_NAME : 'contacts_user',
			//查询字段
			SEARCH_CLOMNS : ['name','nameSpell','mobile'],
			//部门表
			DEPT_TABLE_NAME : 'contacts_dept'
		};
	
    //模块对外提供的方法
    var exportsMethods =  {
    	
		/**
    	 * 加载用户
    	 * @param fun 回调方法
    	 * @param flag 如果true重新加载，否则从存储中读（默认从存储中读）
    	 */
    	loadUser:function(fun,flag){
    		//如果群组不为空时，并不要重新加载时，直接读存储
    		if(userData && !flag){
    			if(typeof fun=='function'){
					fun(userData);
				}
    			return;
    		}
			sql="SELECT * FROM "+constants.USER_TABLE_NAME+" ORDER BY nameSpell ASC";
			storageAssist.doQuery(sql,function(datas){
				userData=datas;
				if(typeof fun=='function'){
					fun(userData);
				}
			});
    	},

    	/**
    	 * 加载群组
    	 * @param fun 回调方法
    	 * @param flag 如果true重新加载，否则从存储中读（默认从存储中读）
    	 */
    	loadGroup:function(fun,flag){ 
    		//如果群组不为空时，并不要重新加载时，直接读存储
    		if(groupData && !flag){
    			if(typeof fun=='function'){
					fun(groupData);
				}
    			return;
    		}
    		var sql="select d.id,d.name,count(0) num from "+constants.USER_TABLE_NAME+" u,"+constants.DEPT_TABLE_NAME+" d where d.unid= u.managedept and d.type = '3' group by d.unid order by d.name ";
    		storageAssist.doQuery(sql,function(datas){
    			groupData=datas;
				if(typeof fun=='function'){
					fun(groupData);
				}
			});
    	},
    	/**
    	 * 搜索用户
    	 * @param text
    	 */
    	searchUser:function(text,fun){
    		var sql="SELECT U.* FROM "+constants.USER_TABLE_NAME+" U,"+constants.DEPT_TABLE_NAME+" D WHERE U.belongTo=d.id and ("+
			"U."+constants.SEARCH_CLOMNS[0]+" like '%"+text+"%' or " +
			"U."+constants.SEARCH_CLOMNS[1]+" like '%"+text+"%' or " +
			"U."+constants.SEARCH_CLOMNS[2]+" like '%"+text+"%' or " +
			"D."+constants.SEARCH_CLOMNS[0]+" like '%"+text+"%') ORDER BY nameSpell ASC";
    		storageAssist.doQuery(sql,function(data){
    			if(typeof fun=='function'){
    				fun(data);
    			}
    		});
    		
    	},
    	
    	/**
    	 * 回调方法
    	 * @param fun
    	 */
    	refresh:function(fun){
    		this.loadUsers(fun,true);
    		this.loadGroup(fun,true);
    	},
    	/**
    	 * 根据id搜索用户
    	 * @param text
    	 */
    	searchUserByid:function(id,fun){
    		var sql="SELECT * FROM "+constants.USER_TABLE_NAME+" WHERE id='"+id+"'";
    		storageAssist.doQuery(sql,function(data){
    			if(typeof fun=='function'){
    				if(data && data.length!=0){
    					fun(data[0]);
    				}
    			}
    		});
    	}
    	
    };
    
    module.exports = exportsMethods;
});