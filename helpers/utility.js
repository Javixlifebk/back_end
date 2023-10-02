class MenuClass
{  
	constructor(menuRecs){this.JSONMENUS={};this.menuRecs=menuRecs;}
	getMenuList()
	{
		
		for(var i=0;i<this.menuRecs.length;i++)
		{
			this.prepareMenu(this.menuRecs[i]);
		}
		
		return(this.JSONMENUS);
	}

	prepareMenu(menu_)
	{
		var menuItem=menu_;
		
		var itemId=menuItem.itemId;
		var parentId=menuItem.parentId;
		var title=menuItem.linkName;
		var linkURL=menuItem.linkURL;
		var type=menuItem.type; // c , n, p
		
		var tmpItemId='';
		var tmpParentId='';
		if(type==="C" )
		{
			tmpItemId=itemId;
			tmpParentId=parentId;
			var rec={id:tmpItemId,title:title,type:'item',navLink:linkURL};
			if(this.JSONMENUS[tmpParentId]===undefined) {
				this.JSONMENUS[tmpParentId]={};}
			this.JSONMENUS[tmpParentId].children.push(rec);
			
		}
		else if (type==="P") 
		{   tmpItemId=itemId;
			
			var rec={id:tmpItemId,title:title,type:'collapse',children:[]};
			if(this.JSONMENUS[tmpItemId]===undefined) {this.JSONMENUS[tmpItemId]={};}
			this.JSONMENUS[tmpItemId]=rec;
		}
		else if (type==="N")
		{
			tmpItemId=itemId;
			var rec={id:tmpItemId,title:title,type:'item',navLink:linkURL};
			if(this.JSONMENUS[tmpItemId]===undefined) {this.JSONMENUS[tmpItemId]={};}
			this.JSONMENUS[tmpItemId]=rec;
		}
		
	}

};

exports.randomNumber = function (length) {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};

exports.uID = function () {
	var text = Date.now();
	var possible = "123456789";
	for (var i = 0; i < 5; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	
	return (text);
};
exports.isDate=function(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}
exports.toYYmmdd=function(ddmmyy)
{
	var yymmdd="";
	var cols=ddmmyy.split("-");
	if(cols.length===3 && ddmmyy.length===10)
	{
		if(cols[2].length==4){
		yymmdd=cols[2]+"-"+cols[1]+"-"+cols[0];
		return(yymmdd);
	}
	else{
		return(ddmmyy);
	}
	}
	return("");
}
exports.toDDmmyy=function(yymmdd)
{
	var ddmmyy="";
	try{
	if(yymmdd.toISOString().indexOf('T')!=-1){
	var cols=(yymmdd.toISOString()).split("T")[0];
	cols=cols.split("-");
	}
	else{
		var cols=(yymmdd.toISOString()).split("-");
	}	
	
	if(cols.length>2 )
	{
		ddmmyy=cols[2]+"-"+cols[1]+"-"+cols[0];
		return ddmmyy;
	}
	else{
	return "";
}
}catch(e){
	var cols=yymmdd.split("-");
	if(cols.length>2 )
	{
		ddmmyy=cols[2].split('T')[0]+"-"+cols[1]+"-"+cols[0];
		return ddmmyy;
	}
	else{
	return "";
}


}}



exports.calculateAge=function(dateOfBirth){
	var dob = new Date(dateOfBirth);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
}







exports.getMenuClassObject=function(menuItems){return(new MenuClass(menuItems));};