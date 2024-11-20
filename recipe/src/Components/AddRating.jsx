import { useState } from "react";

export default function AddRating({onChange})
{
    const [rating, updateRating] = useState(0);

    function updateStars(selectedRating)
    {
        updateRating(selectedRating);
        if (onChange)
        {
            onChange(selectedRating);
        }
    }    

    const fullStars = Math.floor(rating);
    const emptyStars = Math.floor(5 - rating);

    const ratingValues = [1, 2, 3, 4, 5];
    const fullStarValues = ratingValues.splice(0, fullStars);
    const emptyStarValues = ratingValues;

    return <>
        {fullStars > 0 && fullStarValues.map(key => <i title={key} onClick={() => updateStars(key)} key={key} className="fa-solid fa-star text-warning pointer"></i>)}
        {emptyStars > 0 && emptyStarValues.map(key => <i title={key} onClick={() => updateStars(key)} key={key} className="fa-regular fa-star text-warning pointer"></i>)}
    </>;
}