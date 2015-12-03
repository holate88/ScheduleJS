(function(_, _dp, _Emp){
	if(!_Emp)
		throw new Error("No Employee found...");
	
	function Employees() {
		var emps = [];
		_dp(this, "AddEmployee", { value: 
			function(name, id) {
				emps.push(new _Emp(name, id));
			}
		});
		_dp(this, "RemoveEmployee", { value: 
			function(index) {
				emps.splice(index, 1);
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
	Emps.AddEmployee("Dylan Holt", 0);
	
	Emps.LoopEmployees(function(emp){ console.log(emp.name) });
	
	_dp(_, "Employees", { value: Emps });
})(this, Object.defineProperty, Employee)