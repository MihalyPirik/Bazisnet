import Axios from 'axios';
Axios.defaults.baseURL = '/api/apps/backend/exchange-rate';

export default {
    getAllExchangeRate(fromDate = "20240529", toDate = "20240529", from = 0, size = 20) {
        return Axios.get(`/exchange-rate-page?rateType=mkbk&fromDate=${fromDate}&toDate=${toDate}&from=${from}&size=${size}`);
    },
};
