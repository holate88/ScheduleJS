(function(_, _dp, _Emp){
	if(!_Emp)
		throw new Error("No Employee found...");
	
	function Employees() {
		var emps = [];
		_dp(this, "AddEmployee", { value: 
			function(name, id) {
				var new_emp = new _Emp(name, id);
				
				if(this.GetEmployeeByName(new_emp.name) !== -1 || this.GetEmployeeById(new_emp.id) !== -1)
				   throw new Error("Already created employee...");
				
				emps.push(new_emp);
				return new_emp;
			}
		});
		_dp(this, "RemoveEmployee", { value: 
			function(index) {
				return emps.splice(index, 1);
			}
		});
		_dp(this, "GetEmployee", { value: 
			function(index) {
				return emps[index];
			}
		});
		_dp(this, "GetEmployeeByName", { value: 
			function(name) {
				for(var i in emps)
					if(emps[i].name === name)
						return i;
				return -1;
			}
		});
		_dp(this, "GetEmployeeById", { value: 
			function(id) {
				for(var i in emps)
					if(emps[i].id === id)
						return i;
				return -1;
			}
		});
		_dp(this, "LoopEmployees", { value: 
			function(f) {
				for(var i in emps)
					f(emps[i]);
			}
		});
	}
	
	var Emps = new Employees();
	
	// Add Employees...
	var emp = Emps.AddEmployee("Dylan Holt", 0);
	emp = Emps.AddEmployee("Jacob Diaz", 1);
	//emp.Add_Time_Slot("M", "07:00", "11:00");
	
	_dp(_, "Employees", { value: Emps });
})(this, Object.defineProperty, Employee)