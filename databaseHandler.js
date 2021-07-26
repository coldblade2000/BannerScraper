import mongoose from 'mongoose'
import {BACKEND_PASSWORD, BACKEND_ADDRESS} from './secrets.js'
mongoose.connect(`mongodb://${BACKEND_ADDRESS}/banner`, {
user:'backend',
pass: BACKEND_PASSWORD,    
useNewUrlParser: true, useUnifiedTopology: true});


export const saveCoursesToDB = (courseList)=>{
    console.log(`Saving ${courseList.length} entries to db`)
    for (const course of courseList) {
        course.save()
    }
}
