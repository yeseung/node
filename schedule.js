const schedule = require('node-schedule');
let scheduleObj = null;

const set = (s) => {
	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = s.dayOfWeek; 
	rule.hour = s.hour;
	rule.minute = s.minute;

	var job = schedule.scheduleJob(rule, function (){ 
		console.log('Scheduler has executed!');
	});

	scheduleObj = job;
};

const cancel = () => {
	if (scheduleObj != null) {
		scheduleObj.cancel();
	}
};

const setScheduler = (s) => {
	cancel();
	set(s);
};

const scheduleData = {
	dayOfWeek: [2, 4, 5], //화, 목, 금
	hour: 9,
	minute: 42
};

setScheduler(scheduleData);
