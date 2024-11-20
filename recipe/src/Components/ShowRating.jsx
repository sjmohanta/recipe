export default function ShowRating({rating})
{
    const fullStars = Math.floor(rating);
    const emptyStars = Math.floor(5 - rating);
    const halfStars = Math.floor(5 - fullStars - emptyStars);

    return <>
        {fullStars > 0 && [...Array(fullStars).keys()].map(key => <i className="fa-solid fa-star text-warning"></i>)}
        {halfStars > 0 && <i className="fa-solid fa-star-half-stroke text-warning"></i>}
        {emptyStars > 0 && [...Array(emptyStars).keys()].map(key => <i className="fa-regular fa-star text-warning"></i>)}
    </>;
}