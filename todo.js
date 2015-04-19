 
	var error = '';
	var display = document.getElementById('listview');
	var currentdate = new Date(); 
	var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

	var todo_model = {
		

		newTodo : function(obj)
		{
			
			 
			 if(obj.item != '' )
			 {
			 		// data.push(JSON.parse(localStorage.todoitem));
				 	// data.push(obj);
				 	// localStorage.todoitem = JSON.stringify(data);
				 	// data = [];
			 	 // if(localStorage.length > 0)
			 	 // {
			 	 // 	data = JSON.parse(localStorage.getItem('todoitem'));
				  // 	data.push(obj);
				  // 	localStorage.setItem('todoitem' , JSON.stringify(data));
			 	 // }
			 	 // else
			 	 // {
			 	 // 	localStorage.setItem('todoitem' ,JSON.stringify(obj));
			 	 // }
			 	//  if(localStorage.getItem('todoitem') != '')
			 	//  {
			 	//  	var data = JSON.parse(localStorage.getItem('todoitem'));
			 	//  	var datas = [data];
			 	//  	datas.push(obj);
					// localStorage.setItem('todoitem' , JSON.stringify(datas));
			 	//  }
			 	//  else
			 	// {
			 	// 	localStorage.setItem('todoitem' , JSON.stringify(obj));
			 			
			 	// }

			 	var data = JSON.parse(localStorage.getItem('todoitem'));
			 	var datas = new Array();
			 	if(data!==null)
			 	{
			 		datas = data;
			 		datas.push(obj);
			 	}
			 	else
			 	{
			 		datas.push(obj);
			 	}
			 	
			 	
				localStorage.setItem('todoitem' , JSON.stringify(datas));
				datas.length =0 ;
 
			 }
			 else
			 {
			 	error = 'Empty Item couldnot be included';
			 }
			 controller.renderView();

		},

		getItems : function()
		{
			return JSON.parse(localStorage.getItem('todoitem'));
		},

		storageLen : function()
		{
			return localStorage.getItem('todoitem');
		},

		init : function(){
			if(!localStorage.getItem('todoitem'))
			{
				var values = [];
				localStorage.setItem('todoitem',values);
			}
		}
		

	};


	var controller = {

		
		addNew : function(todoVal)
		{
			var sendtoModel = {
				item : todoVal,
				date  : datetime,
				status : 1
			};
			
			todo_model.newTodo(sendtoModel);
		},

		getList : function()
		{
			return todo_model.getItems();
		},

		getStorageLen : function()
		{
			return todo_model.storageLen();
		},

		renderView : function()
		{
			view.renderView();
		},

		init : function(){
			view.init();
			todo_model.init();
		}
	};


	

	var view = {
		
		init : function(){
			document.getElementById('submit').addEventListener('click',function(){
				var todoVal = document.getElementById('todo').value;
				controller.addNew(todoVal);
				document.getElementById('todo').value = '';

			});
			this.renderView();
		},
		
		renderView : function()
		{	 
				 var html = '';
			    if(controller.getStorageLen() != '')
			    {
			  	   	controller.getList().forEach(function(todoitem){
					 	 html += '<li>'+todoitem.item+'<br>'+todoitem.date+'</li>';
					});
 					
					display.innerHTML =  html;
			    }
				
		}

	};


	




 

