import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/banner', {useNewUrlParser: true, useUnifiedTopology: true});


export const saveCoursesToDB = (courseList)=>{
    for (const course of courseList) {
        course.save()
    }
    console.log(`Saving ${courseList.length} entries to db`)
}