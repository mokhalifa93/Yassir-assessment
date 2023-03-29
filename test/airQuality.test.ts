import { describe, expect, test } from '@jest/globals';
import { airQualityCitiesService } from '../components/air/airQuality.service'
import config from 'config'
describe('Air quality service test cases', () => {
    test('should return 400 if not valid lon or lat format', async () => {
        const { statusCode, ...res } = await airQualityCitiesService('20,86962222212121', '20,88888888888');
        expect(statusCode).toBe(400)
        expect(res.message).toBe("Please provide correct lon & lat format")
    });
    test('should return 200 with Paris air quality data passed Paris lon & lat', async () => {
        const { statusCode, data } = await airQualityCitiesService(config.get("ParisData.latitude"), config.get("ParisData.longitude"))
        expect(statusCode).toBe(200)
        expect(data.city).toBe("Paris");
    });
    test('should return 400 if city provided not supported (Axios Error)', async () => {
        const { statusCode, ...res } = await airQualityCitiesService(config.get("notSupportedCity.latitude"), config.get("notSupportedCity.longitude"))
        expect(statusCode).toBe(400)
    });
});