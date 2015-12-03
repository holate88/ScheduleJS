(function(_, _dp){

function Employee(name, id) {
    var new_employee = this;
    
    if(typeof name !== "string") {
         throw new Error("The name of an Employee must be a string.");
    }
    
    if(isNaN(id = +id)) { // '+' calls the valueOf for the 'id' variable.
         throw new Error("The id given was not a number.");
    }
    
    // Creates a property for "this" called name that is not writable.
    _dp(new_employee, "name", { value: name, enumerable: true });
    _dp(new_employee, "id", { value: id, enumerable: true });

    _dp(new_employee, "schedule", { value: new Schedule() });
};

Employee.prototype.Add_Time_Slot = function(day_of_week, start, end) {
    var employee = this;
    employee.schedule.week[day_of_week].times.push(new Time_Slot(start, end));
    return employee;
};

Employee.prototype.Remove_Time_Slot = function(day_of_week, index) {
    var employee = this;
    employee.schedule.week[day_of_week].times.splice(index, 1);
    return employee;
};

function Time_Slot(start, end) {
    this.start = start;
    this.end   = end;
};

function Day(day_of_week) {
    // Makes sure that day_of_week is U, M, T, W, R, F, or S.
    if(day_of_week.length !== 1 || "UMTWRFS".indexOf(day_of_week) === -1)
        throw new Error("Not valid day of week.");
    var self = this;
    _dp(self, "day", { value: day_of_week, enumerable: true });
    _dp(self, "times", { value: [], enumerable: true });
};

function Week() {
    var self = this,
        week_days = "UMTWRFS";
    for(var i in week_days)
       (function(day_of_week){ _dp(self, day_of_week, { value: new Day(day_of_week), enumerable: true }) })(week_days[i]);
};

function Schedule() {
    var self = this;
    _dp(self, "week", { value: new Week() });
};

// Adds Employee to the global space.
_dp(_, "Employee", { value: Employee });

})(this, Object.defineProperty)