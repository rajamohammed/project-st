 
	var error = '';
	var display = document.getElementById('listview');
	var currentdate = new Date(); 
	var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
    function sordByDate(a,b)
    {
    	var dateA = new Date(a)
    }
    
 

	 

	var todo_model = {
		
		delitem : function(listindex)
		{

			var list = this.getItems();
			if(this.storageLen() != '')
		 	{	
		 			var newlist = [];
			
			  	   	list.forEach(function(element,index,todoitem){
			  	   		if(index === listindex)
			  	   		{
			  	   			todoitem[index].status = 0;
			  	   		}
			  	   		// Creating a new array
			  	   		newlist[index] = { 'item' : todoitem[index].item,
			  	   							'date' : todoitem[index].date,
			  	   							'status' : todoitem[index].status
			  	   		};
			  	   	})

			  	   return	localStorage.setItem('todoitem' , JSON.stringify(newlist));	  
			}	
		},

		retainitem : function(listindex)
		{

			var list = this.getItems();
			if(this.storageLen() != '')
		 	{	
		 			var newlist = [];
			
			  	   	list.forEach(function(element,index,todoitem){
			  	   		if(index === listindex)
			  	   		{
			  	   			todoitem[index].status = 1;
			  	   		}
			  	   		// Creating a new array
			  	   		newlist[index] = { 'item' : todoitem[index].item,
			  	   							'date' : todoitem[index].date,
			  	   							'status' : todoitem[index].status
			  	   		};
			  	   	})

			  	   return	localStorage.setItem('todoitem' , JSON.stringify(newlist));	  
			}	
		},


		newTodo : function(obj)
		{
			
			 
			 if(obj.item != '' )
			 {
			 	 
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

		delitem : function(index)
		{
			todo_model.delitem(index);
			return view.renderView();
		},

		retainitem : function(index)
		{
			todo_model.retainitem(index);
			return view.renderView();
		},

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
				 document.querySelector("#listview").innerHTML='';
				 var finallist = controller.getList();
			    if(controller.getStorageLen() != '')
			    {
			
			  	   	finallist.forEach(function(element,index,todoitem){
			  	   		 var actionlist = '<div class="hoverlist"> ';
			  	   		 	 actionlist+= '<button class="btn btn-success pull-left retain-todo">';
			  	   		 	 actionlist+= '<span class="glyphicon glyphicon-ok"></button>';
							 actionlist+= '<button class="btn btn-danger pull-right del-todo">';
							 actionlist+= '<span class="glyphicon glyphicon-remove"></button> </div>';

						if(todoitem[index].status===0)
						{
							var strike = "strike";
						}
						else
						{
							strike = '';
						}
					 	 html = '<li class="list-group-item relativeClass " >'+actionlist
					 	 html+= '<span class="'+strike+'">'+todoitem[index].item+'</span><br>';
					 	 html+= '<small><span class="'+strike+'">'+todoitem[index].date+'</span></small></li>';

					 	 $('#listview').prepend(html);
					 	 var delelem = document.querySelector(".del-todo");
					 	 
					 	 delelem.addEventListener('click', (function(listindex){
					 	  	return  function(){
					 	  		controller.delitem(listindex)
					 	  	};
					 	  })(index));


					 	 var retainelem = document.querySelector(".retain-todo");
					 	 
					 	 retainelem.addEventListener('click', (function(listindex){
					 	  	return  function(){
					 	  		controller.retainitem(listindex)
					 	  	};
					 	  })(index));




					});
 				
			    }

			   
				
		}

	};



 

