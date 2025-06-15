import { create } from "zustand";

interface LikedReviewStore {
    likedReviewIndexList: number[];
    isLoaded: boolean;
    setLikedReviewIndexList: (likedReviewIndexList: number[]) => void;
    resetLikedReviewIndexList: () => void;
}

const useLikedReviewStore = create<LikedReviewStore>((set) => ({
    likedReviewIndexList: [],
    isLoaded: false,
    setLikedReviewIndexList: (likedReviewIndexList: number[]) => set({ likedReviewIndexList, isLoaded: true }),
    resetLikedReviewIndexList: () => set({ likedReviewIndexList: [] })
}));

export default useLikedReviewStore; 