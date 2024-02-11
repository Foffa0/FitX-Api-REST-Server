const schedule = require('node-schedule');


const runUpdateSchedule = () => {
    const job = schedule.scheduleJob('*/30 * * * *', () => { // run every 30 Minutes
        console.log('The answer to life, the universe, and everything!');
    });
}

module.exports = {
    runUpdateSchedule,
}