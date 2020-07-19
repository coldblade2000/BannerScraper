import {Course} from "./models.js"

export const processAllCourses = (rawCourseList)=>{
    const mongooseCourseList = []
    for (const rawCourse of rawCourseList) {
        mongooseCourseList.push(processCourse(rawCourse))
    }
    return mongooseCourseList
}

const processCourse = (rawCourse)=>{
    let newFaculty = []
    for (const professor of rawCourse['faculty']){
        newFaculty.push({
          displayName: professor.displayName,
          email: professor.emailAddress,
          isPrimary: professor.isPrimary
        });
    }

    return new Course({
        "CRN": rawCourse['courseReferenceNumber'], //40234
        "term": rawCourse['term'], //202020
        "subjectShort": rawCourse['subject'], //BIOL
        "courseNumber": rawCourse['courseNumber'], //1105 de ISIS-1105
        "subjectLong": rawCourse['subjectDescription'], //BIOLOGIA
        "campusDescription": rawCourse['campusDescription'], //VIRTUAL , LABORATORIO
        "scheduleTypeDescription": rawCourse['scheduleTypeDescription'], //TEORICA , PROYECTO DE GRADO
        "courseTitle": rawCourse['courseTitle'], //ESTRUCTURAS DE DATOS
        "maximumSeats": rawCourse['maximumEnrollment'], //50
        "currentSeats": rawCourse['enrollment'], //0
        "emptySeats": rawCourse['seatsAvailable'], //50
        "credits": rawCourse['creditHourLow'], //3, 2, 1
        "openSection": rawCourse['openSection'], //true
        "courseIdentifier": rawCourse['subjectCourse'], //BIOL1105
        faculty: newFaculty,
        meetings: getMeetings(rawCourse['meetingsFaculty']),
        totalActiveDays: getActiveDaysArray(rawCourse['meetingsFaculty'])
    });
}

export const getActiveDaysArray = (meetingsFaculty)=>{
    const initialDays = {
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        sunday:false
    }
    for (const meeting of meetingsFaculty) {
        const {
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        } = meeting.meetingTime
        if (monday){
            initialDays.monday = true
        }
        if (tuesday){
            initialDays.tuesday = true
        }
        if (wednesday){
            initialDays.wednesday = true
        }
        if (thursday){
            initialDays.thursday = true
        }
        if (friday){
            initialDays.friday = true
        }
        if (saturday){
            initialDays.saturday = true
        }
        if (sunday){
            initialDays.sunday = true
        }
    }
    return initialDays;
}
const getMeetings = (rawMeetings) =>{
    const meetings = []
    for (const rawMeeting of rawMeetings) {
        const {
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        } = rawMeeting
        const initialDays = {
            monday:monday,
            tuesday:tuesday,
            wednesday:wednesday,
            thursday:thursday,
            friday:friday,
            saturday:saturday,
            sunday:sunday
        }

        meetings.push({
            beginTime:rawMeeting['beginTime'],
            endTime:rawMeeting['endTime'],
            building:rawMeeting['buildingDescription'], //buildingDescription, Bloque C
            campus: rawMeeting['campusDescription'], //P, V
            startDate:rawMeeting['startDate'],
            endDate:rawMeeting['endDate'],
            activeDays:initialDays
        })
    }
    return meetings
}
