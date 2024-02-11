import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 && !window.location.href.includes('/login')) {
            window.location = '/login';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export const fetcherGet = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    try {
        const res = await axiosInstance.get(url, { ...config });
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ', res.statusText);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching data (from utils/axiosInstance):', error);
    }
};

//=============================|| Sample parameters to use when calling fetcherPost ||=========================

// const wisperContent = {
//   title: title,
//   description: description,
// };
// const url='/createContent';
// const response = await fetcherPost(url, { token, wisperContent });

export const fetcherPost = async (url, { token = '', body = {}} = {}) => {
    try {
        const res = await axiosInstance.post(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ' + res.statusText);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching data (from utils/axiosInstance):', error);
    }
};


export const fetcherPut = async (url, { token = '', body = {}} = {}) => {
    try {
        const res = await axiosInstance.put(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ' + res.statusText);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching data (from utils/axiosInstance):', error);
    }
};

export const fetcherDelete = async (url, { token = '', body = {}} = {}) => {
    try {
        const res = await axiosInstance.delete(
            url,
            {
                ...body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            }
        );
        if (res.status !== 200) {
            throw new Error('Error fetching data (from utils/axiosInstance), Status Text: ' + res.statusText);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching data (from utils/axiosInstance):', error);
    }
};