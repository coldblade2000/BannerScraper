import {Course} from "./models.js"
import he from 'he'

export const processAllCourses = (rawCourseList) => {
    const mongooseCourseList = []
    for (const rawCourse of rawCourseList) {
        mongooseCourseList.push(processCourse(rawCourse))
    }
    return mongooseCourseList
}

const processCourse = (rawCourse) => {
    let newFaculty = []
    for (const professor of rawCourse['faculty']) {
        newFaculty.push({
            bannerId: professor.bannerId,
            displayName: professor.displayName,
            email: professor.emailAddress,
            isPrimary: professor['primaryIndicator']
        });
    }

    return new Course({
        "_id": rawCourse['courseReferenceNumber'],
        "CRN": rawCourse['courseReferenceNumber'], //40234
        "term": rawCourse['term'], //202020
        "subjectShort": he.decode(rawCourse['subject']), //BIOL
        "courseNumber": he.decode(rawCourse['courseNumber']), //1105 de ISIS-1105
        "subjectLong": he.decode(rawCourse['subjectDescription']), //BIOLOGIA
        "sectionNumber": parseInt(rawCourse['sequenceNumber']),
        "campusDescription": he.decode(rawCourse['campusDescription']), //VIRTUAL , LABORATORIO
        "scheduleTypeDescription": he.decode(rawCourse['scheduleTypeDescription']), //TEORICA , PROYECTO DE GRADO
        "courseTitle": he.decode(rawCourse['courseTitle']), //ESTRUCTURAS DE DATOS
        "maximumSeats": rawCourse['maximumEnrollment'], //50
        "currentSeats": rawCourse['enrollment'], //0
        "emptySeats": rawCourse['seatsAvailable'], //50
        "credits": rawCourse['creditHourLow'], //3, 2, 1
        "openSection": rawCourse['openSection'], //true
        "courseIdentifier": he.decode(rawCourse['subjectCourse']), //BIOL1105
        faculty: newFaculty,
        meetings: getMeetings(rawCourse['meetingsFaculty']),
        totalActiveDays: getActiveDaysArray(rawCourse['meetingsFaculty'])
    });
}

export const getActiveDaysArray = (meetingsFaculty) => {
    const initialDays = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }
    for (const meeting of meetingsFaculty) {
        const {
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        } = meeting.meetingTime
        if (monday) {
            initialDays.monday = true
        }
        if (tuesday) {
            initialDays.tuesday = true
        }
        if (wednesday) {
            initialDays.wednesday = true
        }
        if (thursday) {
            initialDays.thursday = true
        }
        if (friday) {
            initialDays.friday = true
        }
        if (saturday) {
            initialDays.saturday = true
        }
        if (sunday) {
            initialDays.sunday = true
        }
    }
    return initialDays;
}
const getMeetings = (rawMeetings) => {
    const meetings = []
    for (const rawMeeting of rawMeetings) {
        const {
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        } = rawMeeting.meetingTime
        const initialDays = {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        }

        meetings.push({
            beginTime: rawMeeting.meetingTime['beginTime'],
            endTime: rawMeeting.meetingTime['endTime'],
            building: rawMeeting.meetingTime['buildingDescription'], //buildingDescription, Bloque C
            campus: rawMeeting.meetingTime['campus'], //P, V
            startDate: rawMeeting.meetingTime['startDate'],
            endDate: rawMeeting.meetingTime['endDate'],
            activeDays: initialDays
        })
    }
    return meetings
}
