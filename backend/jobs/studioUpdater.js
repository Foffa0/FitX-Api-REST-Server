import schedule from 'node-schedule';
import got from 'got';
import { Studio } from '../models/studioModel.js';
import { WeekdayCapacityModel } from '../models/capacityWeekdayModel.js';
import { updateCapacityByStudioId } from '../controllers/capacityWeekdayController.js';

const runUpdateSchedule = () => {
    const job = schedule.scheduleJob('*/30 * * * *', async () => { // run every 30 Minutes
        const studios = await Studio.find();

        for (let i = 0; i < studios.length; i++) {
            
            const studioId = studios[0].studioId;

            console.log(studioId);
            console.log(`Studio id: ${studioId}`);
            got.get(`https://fitx-proxy.daniel-stefan.dev/api/utilization/${studioId}`, {responseType: 'json'})
            .then(async res => {
                console.log('Status Code:', res.statusCode);
                
                const body = res.body;

                for (let x = 0; x < body.items.length; x++) {
                    if (body.items[x].isCurrent)
                    {
                        console.log(body.items[x].percentage);

                        const studioModel = await Studio.findOne({ studioId: studioId });

                        if (!studioModel) {
                            throw new Error('Studio not found');
                        }

                        const d = new Date();
                        let weekday = d.getDay();

                        const capacity = await WeekdayCapacityModel.findOne({ studio: studioModel._id, weekday: weekday });

                        //console.log(`capacity: ${capacity}`)
                        
                        for (let y = 0; y < capacity.values.length; y++) {

                            const time = `${d.getHours()}:${d.getMinutes()}:00`

                            if (time >= capacity.values[y].start && time <= capacity.values[y].end)
                            {

                                console.log(`found! ${capacity.values[y].start} - ${capacity.values[y].end}`);
                                if (capacity.values[y].capacities.length >= 4) {
                                    capacity.values[y].capacities.shift();
                                }

                                capacity.values[y].capacities.push(body.items[x].percentage);

                                await updateCapacityByStudioId(studioModel._id, weekday, capacity.values);

                                break;
                            }
                        }
                        break;
                    }
                }
            })
            .catch(err => {
                console.log('Error: ', err.message);
            });

            console.log('The answer to life, the universe, and everything!');
        }
    });
}

export {
    runUpdateSchedule,
}