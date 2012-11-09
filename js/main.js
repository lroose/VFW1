window.addEventListener("DOMContentLoaded", function(){
	function $(x){
		var myElement = document.getElementById(x);
		return myElement;
	}
	
	
	function getCheckboxValue(){
		if($('Dishes').checked){
			DishesValue = $('Dishes').value;
		}else{
			DishesValue = "No"
		};
		if($('Sweep').checked){
			SweepValue = $('Sweep').value;
		}else{
			SweepValue = "NO"
		};
		if($('Bathroom').checked){
			BathroomValue = $('Bathroom').value;
		}else{
			BathroomValue = "NO"
		};
		if($('Dust').checked){
			DustValue = $('Dust').value;
		}else{
			DustValue = "NO"
		};
		if($('Trash').checked){
			TrashValue = $('Trash').value;
		}else{
			TrashValue = "NO"
		};
	};
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('contactForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('contactForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('chore').style.display = "none"
				break;
			default:
				return false;
		}
	}
	
	function storeData(key) {
		if (!key){
			var id 						=Math.floor(Math.random()*1000001);
		}else{
			id = key;
		}
		getCheckboxValue();
		var chore					= {};
			chore.fname				= ["First Name:", $('fname').value];
			chore.lname				= ["Last Name:", $('lname').value];
			chore.DishesValue		= ["Dishes", DishesValue ];
			chore.SweepValue		= ["Sweep", SweepValue];
			chore.BathroomValue		= ["Bathroom", BathroomValue];
			chore.DustValue			= ["Dust", DustValue];
			chore.TrashValue		= ["Trash", TrashValue]
			chore.rate				= ["Rate", $('rate').value];
			chore.date				= ['Date', $('date').value];
			chore.reward			= ["Anticipated Reward:", $('reward').value];
			
		localStorage.setItem(id, JSON.stringify(chore));
		alert("Chore List Saved!");
	}
	
	function getData(){
		toggleControls('on');
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "chore");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('chore').style.display = "block"
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLI = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+ " "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLI);
			}
		}
		makeItemLinks(localStorage.key(i), linksLI);
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#" ;
		editLink.key = key;
		var editText = "Edit list.";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Chore!";
		deleteLink.addEventListener('click', deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	function editItem() {
		var value = localStorage.getItem(this.key);
		var chore = JSON.parse(value);
		
		toggleControls("off");
		
		$('fname').value = chore.fname[1];
		$('lname').value = chore.lname[1];
		if (chore.DishesValue[1] == "Yes") {
			$('Dishes').setAttribute("checked", "checked");
	}	
		if (chore.SweepValue[1] == "Yes") {
			$('Sweep').setAttribute("checked", "checked");
	}
		if (chore.BathroomValue[1] == "Yes") {
			$('Bathroom').setAttribute("checked", "checked");
	}	
		if (chore.DustValue[1] == "Yes") {
			$('Dust').setAttribute("checked", "checked");
	}
		if (chore.TrashValue[1] == "Yes") {
			$('Trash').setAttribute("checked", "checked");
	}
		$('rate').value = chore.rate[1];
		$('date').value = chore.date[1];
		$('reward').value = chore.reward[1];
		
		save.removeEventListener("click", storeData);
		$('submit').value = "Edit chore.";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this list?");
		if (ask){
			localStorage.removeItem(this.key);
			alert("Chore list was deleted.");
			window.location.reload();
		}else{
			alert("List was NOT deleted.");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All data deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		var getFname = $('fname');
		var	getLname = $('lname');
		
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid red";
		getLname.style.border = "1px solid red";
		
		var messageAry = [];
		
		if(getFname.value === ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		
		if(getLname.value === ""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);
		}
		
		if (messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
	var RewardsGroup = ["N/A", "N/A", "Toys", "Lego", "Hotwheels", "Barbie Doll", "My Little Pony", "Money", "$1", "$5", "$10", "Other"];
		errMsg = $('errors');
		
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var accept = $('submit');
	accept.addEventListener("click", storeData);
	

});