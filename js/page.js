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
			var p	  = day.times[i].toHTML(),
				button = document.createElement("input");
			button.type	= "submit";
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
	// Draws the employee to the screen.
	DrawEmployee(new_emp);
	return new_emp;
};
_dp(_, "CreateEmployee", { value: CreateEmployee });

// Creates the employee and draws it.
function RemoveEmployee(name, id) {
	// Check to see if the name matches an employee.
	if(_Emps.GetEmployeeByName(name) !== -1)
		// If so then remove that employee.
		 _Emps.RemoveEmployee(_Emps.GetEmployeeByName(name));
	// Check to see if the if matches an employee.
	if(_Emps.GetEmployeeById(id) !== -1)
		// If so then remove the employee.
		 _Emps.RemoveEmployee(_Emps.GetEmployeeById(id));
	// Then reload the table.
	Reload();
};
_dp(_, "RemoveEmployee", { value: RemoveEmployee });

function Reload() {
	// Has to keep child i = 0 (th) and i = 1 (meta data).
	for(var i = html_table.children.length; --i > 1;)
		// Basically destroys all of the children.
		html_table.removeChild(html_table.children[i]);
	// Draw already made employees.
	_Emps.LoopEmployees(DrawEmployee);
}
_dp(_, "Reload", { value: Reload });

// Initial loading of the employees.
Reload();

function AddTimeSlotByName(name) {
	// Used to get the elements for later.
	var dayElem   = _byid("timeslot-day"),
		startElem = _byid("timeslot-start"),
		endElem   = _byid("timeslot-end");
	
	// Gets the employee with the name.
	_Emps.GetEmployee(_Emps.GetEmployeeByName(name))
	// Adds the slot to that employee.
	.Add_Time_Slot(
		 dayElem.options[dayElem.selectedIndex].value, 
		 startElem.options[startElem.selectedIndex].value, 
		 endElem.options[endElem.selectedIndex].value
	);

	// Refreshes everything to show the newly added time slot.
	Reload();
};
_dp(_, "AddTimeSlotByName", { value: AddTimeSlotByName});

})(this, Object.defineProperty, 
   document, 
   function(id){return document.getElementById(id)}, 
   function(name){return document.getElementsByClassName(name)}, 
   Employees)