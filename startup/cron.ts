import schedule from 'node-schedule';
import { airQualityCitiesService } from '../components/air/airQuality.service';
import AirQuality from '../models/airQuality.model';
import config from 'config';
export default () => {
    schedule.scheduleJob('*/1 * * * *', async () => {
        const { statusCode, data } = await airQualityCitiesService(config.get("ParisData.latitude"), config.get("ParisData.longitude"))
        if (statusCode === 200) {
            try {
                let airQuality = await AirQuality.findOne({ city: data.city });
                if (airQuality) {
                    //update city to update updatedAt TS
                    airQuality.updatedAt = new Date();
                } else {
                    new AirQuality(data);
                }
                await airQuality?.save();
            } catch (error) {
                console.log(error);
            }
        }

    });
}