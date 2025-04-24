export const usePureFetch = (url, opt) => {
    const fetchData = async () => {
        try {
            return await fetch(url).then((res) => res.json());
        } catch (error) {
            throw new Error(error);
        }
    };
    const data = fetchData();

    opt && opt(data);

    return data;
};
