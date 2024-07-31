import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
	const [background, setBackground] = useState("");
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const { url } = useSelector((state) => state.home);
	const { data, loading } = useFetch("/movie/upcoming");
	const [showScroll, setShowScroll] = useState();

	//controlling scrollAnimation bar

	const controlScroll = () => {
		setShowScroll(window.scrollY <= 150);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlScroll);
		controlScroll();
		return () => {
			window.removeEventListener("scroll", controlScroll);
		};
	}, []);

	// setting backdrop images as bg

	useEffect(() => {
		const bg =
			url.backdrop +
			data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
		setBackground(bg);
	}, [data]);

	const searchQueryHandler = (event) => {
		if (event.key === "Enter" && query.length > 0) {
			navigate(`/search/${query}`);
		}
	};

	return (
		<>
			<div className='heroBanner'>
				{!loading && (
					<div className='backdrop-img'>
						<Img src={background} />
					</div>
				)}

				<div className='opacity-layer'></div>
				<ContentWrapper>
					<div className='heroBannerContent'>
						<span className='title'>Welcome.</span>
						<span className='subTitle'>
							Search your Favorite movie or tv show..
						</span>
						<div className='searchInput'>
							<input
								type='text'
								placeholder='Search for a movie or tv show....'
								onChange={(e) => setQuery(e.target.value)}
								onKeyUp={searchQueryHandler}
							/>
							<button onClick={searchQueryHandler} onChange={(e) => setQuery(e.target.value)}>Search</button>
						</div>
					</div>
				</ContentWrapper>
			</div>
			<>
				{showScroll && (
					<div
						className={!showScroll ? "hidden" : ""}
						// style={{
						// 	position: "fixed",
						// 	right: 70,
						// 	bottom: 90,
						// }}
					>
						<div
							className='scroll'
							style={{
								width: "2em",
								height: "2em",
								backgroundColor: "transparent",
								zIndex: 80,
								bottom: 25,
								position: "absolute",
								borderWidth: "0 0.25em 0.25em 0",
								borderStyle: "solid",
								borderColor: "antiquewhite",
								animation:
									"scrolldown 1.2s ease-in-out infinite 0.15s",
							}}
						/>
						<div
							className='scroll'
							style={{
								width: "2em",
								height: "2em",
								backgroundColor: "transparent",
								zIndex: 80,
								bottom: 40,
								position: "absolute",
								borderWidth: "0 0.25em 0.25em 0",
								borderStyle: "solid",
								borderColor: "antiqueWhite",
								animation:
									"scrolldown 1.2s ease-in-out infinite",
							}}
						/>
					</div>
				)}
			</>
		</>
	);
};

export default HeroBanner;
