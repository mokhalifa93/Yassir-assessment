import axios from 'axios';
import config from 'config';
import AirQuality from '../../models/airQuality.model';

const apiKey: string | undefined = process.env.IQ_API_KEY
const lonLatRegex = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;
/*----------------------------------------------------------------------------------------------------------------------*/
/**
 * @airQualityCitiesService air quality service air qulaity for city using lon & lat. 
 * @param {string} latitude 
 * @param {string} longitude 
 * @returns {object}
 *          - statusCode {400|200|500}
 *          - message?   {string}
 *          - res?       {object}
 */
const airQualityCitiesService = async (latitude: string, longitude: string) => {
    try {
        if (!lonLatRegex.test(latitude) || !lonLatRegex.test(longitude)) return {
            statusCode: 400,
            message: "Please provide correct lon & lat format"
        };
        const response = await axios.get(
            `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`
        )
        return { statusCode: 200, ...response.data }
    } catch (error) {   
             
        if (axios.isAxiosError(error)) {
            return { statusCode: 400, message: error.message };
        } else {
            return { statusCode: 500, message: 'An unexpected error occurred' };
        }
    }
};
/*----------------------------------------------------------------------------------------------------------------------*/
/**
 * @getParisAirQualityTimestamp Get  Paris last timestamp updated
 * @returns {Object}
 *          - statusCode {200|404}
 *          - timestamp? {Date}
 *          - message {String}
 */
const getParisAirQualityTimestamp = async ()=>{
  const { updatedAt } = await AirQuality.findOne({city:config.get('ParisData.name')}).lean().select('updatedAt') || {};
  return updatedAt ?  {statusCode:  200 , timestamp : updatedAt } : {statusCode:  404 , message : 'Content doesn\'t exist' }
}

export { airQualityCitiesService ,getParisAirQualityTimestamp }