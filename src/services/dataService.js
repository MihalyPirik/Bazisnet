import Axios from 'axios';
Axios.defaults.baseURL = '/api/apps/backend/exchange-rate';

export default {
    getAllExchangeRate(fromDate = (new Date().toISOString().slice(0, 10)).replaceAll('-', ''), toDate = (new Date().toISOString().slice(0, 10)).replaceAll('-', ''), from = 0, size = 20) {
        return Axios.get(`/exchange-rate-page?rateType=mkbk&fromDate=${fromDate}&toDate=${toDate}&from=${from}&size=${size}`);
    },
};
