import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://gamerlastborn.pythonanywhere.com/api/',
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === '/token/refresh/') {
            // Redirect to login if refresh token fails
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === 'token_not_valid' && error.response.status === 401) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds
                const now = Math.ceil(Date.now() / 1000);
                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('/token/refresh/', { refresh: refreshToken })
                        .then((response) => {
                            localStorage.setItem('access_token', response.data.access);
                            axiosInstance.defaults.headers['Authorization'] =
                                'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'Bearer ' + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log('Refresh token not available.');
                window.location.href = '/login/';
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
