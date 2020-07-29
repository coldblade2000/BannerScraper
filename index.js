import scraper from './scraper.js'
import {processAllCourses} from "./processor.js";
import {saveCoursesToDB} from "./databaseHandler.js";

const PAGE_SIZE = 500 //Default 500
const AMOUNT_OF_AVAILABLE_COURSES =  5722  //Default 5705
const DELAY_BETWEEN_REQUESTS = 5 //seconds, default 5 seconds

const IS_DATA_LOGGING_ENABLED = false


for (let i=0;i<Math.ceil(AMOUNT_OF_AVAILABLE_COURSES/PAGE_SIZE);i++) {
    setTimeout(()=>scraper(PAGE_SIZE,i*PAGE_SIZE).then((res) => {
        if(IS_DATA_LOGGING_ENABLED)
            console.log(res.data.data)
        console.log("############################")
        saveCoursesToDB(processAllCourses(res.data.data))
        console.log(`printing iteration #${i+1}`)
    }), i*1000*DELAY_BETWEEN_REQUESTS)
}

