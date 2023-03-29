import { Router } from "express";
import { airQualityCities ,parisAirQuality } from "./airQuality.controller";
const router = Router();

router.get('/cities',airQualityCities);
router.get('/timestamp',parisAirQuality);


export default router