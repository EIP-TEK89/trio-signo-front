const getBaseUrl = () => {
    return `${window.location.protocol}//${window.location.hostname}`;
};

const getBaseUrlWithPort = () => {
    return `${window.location.protocol}//${window.location.host}`;
};

export { getBaseUrl, getBaseUrlWithPort };
