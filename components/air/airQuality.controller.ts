import { Response, Request } from 'express';
import { airQualityCitiesService,getParisAirQualityTimestamp } from './airQuality.service'
interface LONLAT {
    longitude: string;
    latitude: string;
};
/**
 * @apiName /airQuality/cities
 * @param {string} longitude
 * @param {string} latitude
 * @returns 
 *      - 400 {"message": "Please provide correct lon & lat format" }
 *      - 200   {"data": {
        "city": "Remada",
        "state": "Tataouine",
        "country": "Tunisia",
        "location": {
            "type": "Point",
            "coordinates": [
                10.39551,
                32.31662
            ]
        },
        "current": {
            "pollution": {
                "ts": "2023-03-29T18:00:00.000Z",
                "aqius": 17,
                "mainus": "p2",
                "aqicn": 6,
                "maincn": "p2"
            },
            "weather": {
                "ts": "2023-03-29T18:00:00.000Z",
                "tp": 20,
                "pr": 1026,
                "hu": 19,
                "ws": 2.06,
                "wd": 70,
                "ic": "01n"
            }
        }
    }}
 *      - 500 {message: 'An unexpected error occurred'}
 */
const airQualityCities = async (req: Request, res: Response) => {
    const { longitude, latitude } = req.query as unknown as LONLAT;
    const { statusCode,...resObj } = await airQualityCitiesService(latitude,longitude);     
    return res.status(statusCode).json(resObj)
};

/*-----------------------------------------------------------------------------------------------------------*/
/**
 * @apiName /airQuality/timestamp
 * @returns 
 *          -  200 {"timestamp": "2023-03-29T02:04:01.676Z"}
 *          -  404 {"message": "Content doesn't exist"}
 */
const parisAirQuality = async (req: Request, res: Response)=> {
    const {statusCode,...resObj} = await getParisAirQualityTimestamp();
    return res.status(statusCode).json(resObj)
}

export { airQualityCities ,parisAirQuality }