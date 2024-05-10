import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// axios instance

const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization: "bearer " + TMDB_TOKEN,
	},
});

//fetching data - API

export const fetchDataFromApi = async (url, params) => {
	try {
		const { data } = await instance.get(url, {
			params,
		});
		return data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
