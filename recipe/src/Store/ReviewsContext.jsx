import { createContext, useReducer } from "react";

export const ReviewsContext = createContext({
    status: undefined,
    reviews: [],
    addReview: () => {},
    setReviews: () => {}
});

function reviewsReducer(state, action) {
    if (action.type === 'ADD') {
        return {...state, reviews: [...state.reviews, action.payLoad]};
    }
    else if (action.type === 'SET') {
        return { reviews: action.payLoad.reviews, status: action.payLoad.status };
    }

    return state;
}

export default function ReviewContextProvider({children})
{    
    const [reviewsListState, reviewsDispatch] = useReducer(
        reviewsReducer,
        {
            status: undefined,
            reviews: []
        }
      );

      function addReview(payLoad)
      {
        reviewsDispatch({type: 'ADD', payLoad: payLoad});
      }

      function setReviews(payLoad)
      {
        reviewsDispatch({type: 'SET', payLoad: payLoad});
      }

    const ctxValues = {
        status: reviewsListState.status,
        reviews: reviewsListState.reviews,
        addReview: addReview,
        setReviews: setReviews
      };

    return <ReviewsContext.Provider value={ctxValues}>
        {children}
    </ReviewsContext.Provider>;
}