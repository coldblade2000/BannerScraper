import axios from "axios"
import {Cookie, XSynchronizerToken} from "./secrets.js";

const getCourses = (pageMaxSize,pageOffset) => axios({
        method: 'get',
        url: 'https://mibanner.uniandes.edu.co/StudentRegistrationSsb/ssb/searchResults/searchResults',
        withCredentials: true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
            "Accept": "application/json, text/javascript, /; q=0.01",
            'Accept-Language': 'en-US,en;q=0.5',
            "Referer": "https://mibanner.uniandes.edu.co/StudentRegistrationSsb/ssb/classSearch/classSearch",
            "X-Synchronizer-Token": XSynchronizerToken,
            "X-Requested-With": "XMLHttpRequest",
            "DNT": "1",
            "Connection": "keep-alive",
            Cookie: Cookie,
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        params: {
            txt_term: 202020,
            startDatepicker: '',
            endDatepicker: '',
            pageOffset: pageOffset,
            pageMaxSize: pageMaxSize,
            sortColumn: 'subjectDescription',
            sortDirection: 'asc',

        },
        responseType: 'json'
    }
)

export default getCourses