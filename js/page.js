(function(_, _dp, _doc, _byid, _byclass, _Emps) {

if(!_Emps) throw new Error("No Employees found...");

var	
// gets the divs by their ids
	html_div_scheduler = _byid("scheduler"),
	html_table = _byid("scheduler-table");
	
function addrow(name){
	var table = _doc.createElement("table");
	table.innerHTML = '<tr id="name-'+ name +'"> <td>'+ name +'</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>' +
	                  '<input type="submit" onclick="AddTimeSlotByName(\''+name+'\')" value="+"></td> </tr>';
	var new_row = table.children[0].children[0];
	
	html_table.appendChild(new_row);
	
	return new_row;
};

// Draws employees...
function DrawEmployee(emp) {
	var elem = _byid("name-" + emp.name);
	if(elem) {
		html_table.removeChild(elem);
	}
	
	var row = addrow(emp.name),
	    pc  = 1;
	emp.schedule.week.LoopDays(function(day) {
		for(var i in day.times) {
			var p      = day.times[i].toHTML(),
			    button = document.createElement("input");
			button.type    = "submit";
			button.value   = "x";
			// Dereferences i.
			(function(index) {
				button.onclick = function() { 
					emp.Remove_Time_Slot(day.day, index);
					Reload();
				};
			})(i)
			p.appendChild(button);
			row.children[pc].appendChild(p);
		}
		pc++;
	});
};
_dp(_, "DrawEmployee", { value: DrawEmployee })

function getEmployeeRowByName(name){
	return _byid("name-" + name);
};
_dp(_, "getEmployeeRowByName", { value: getEmployeeRowByName});

// Creates the employee and draws it.
function CreateEmployee(name, id) {
	var new_emp = _Emps.AddEmployee(name, id);
	DrawEmployee(new_emp);
	return new_emp;
};
_dp(_, "CreateEmployee", { value: CreateEmployee });

// Creates the employee and draws it.
function RemoveEmployee(name, id) {
	if(_Emps.GetEmployeeByName(name) !== -1)
		 _Emps.RemoveEmployee(_Emps.GetEmployeeByName(name));
	if(_Emps.GetEmployeeById(id) !== -1)
		 _Emps.RemoveEmployee(_Emps.GetEmployeeById(id));
	 Reload();
};
_dp(_, "RemoveEmployee", { value: RemoveEmployee });

function Reload() {
	// Draw already made employees.
	_Emps.LoopEmployees(DrawEmployee);
}
_dp(_, "Reload", { value: Reload });

Reload();

function AddTimeSlotByName(name) {
	var dayElem = document.getElementById("timeslot-day"),
	    startElem = document.getElementById("timeslot-start"),
	    endElem = document.getElementById("timeslot-end");
	
	_Emps.GetEmployee(_Emps.GetEmployeeByName(name))
	
	.Add_Time_Slot(
	     dayElem.options[dayElem.selectedIndex].value, 
		 startElem.options[startElem.selectedIndex].value, 
		 endElem.options[endElem.selectedIndex].value
    );

	Reload();
};
_dp(_, "AddTimeSlotByName", { value: AddTimeSlotByName});

})(this, Object.defineProperty, 
   document, 
   function(id){return document.getElementById(id)}, 
   function(name){return document.getElementsByClassName(name)}, 
   Employees)