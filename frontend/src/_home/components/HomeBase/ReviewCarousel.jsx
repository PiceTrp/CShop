import { makeStyles } from '@mui/styles';
import { Fab } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/system"
import Carousel from "~/common/components/Carousel";
import AppReviewCard from '../commonBase/AppReviewCard';

const ReviewCarousel = ({
	items = [],
	currentPage = 0,
	totalPage = 1,
	pageHandle = () => { },
	itemsPerRow = 0,
	loop = false,
}) => {
	const classes = useStyles();

	const onPrev = () => {
		if (currentPage === 0) {
			pageHandle(totalPage - 1);
		} else {
			pageHandle(currentPage - 1);
		}
	};

	const onNext = () => {
		if (totalPage - 1 === currentPage) {
			pageHandle(0);
		} else {
			pageHandle(currentPage + 1);
		}
	};

	return (
		<>
			<Fab
				aria-label="prev"
				size="small"
				sx={fabStyle}
				disabled={!loop && currentPage === 0}
				onClick={onPrev}
			>
				<ChevronLeft />
			</Fab>

			<Box sx={{ width: "90%" }}>
				<Carousel
					items={items}
					pageState={currentPage}
					setPageState={pageHandle}
					itemsPerRow={itemsPerRow}
				>
					{(item) => (
						<AppReviewCard review={item} key={item.id} />
					)}
				</Carousel>
			</Box>

			<Fab
				sx={fabStyle}
				size="small"
				aria-label="next"
				disabled={!loop && currentPage === totalPage - 1}
				onClick={onNext}
			>
				<ChevronRight />
			</Fab>
		</>
	);
};

const useStyles = makeStyles({
});

const fabStyle = {
	backgroundColor: "white",
	boxShadow: "none",
	margin: "5px",

	"&:hover": {
		backgroundColor: "#ff7349",
		color: "white",
	},
}

export default ReviewCarousel;
