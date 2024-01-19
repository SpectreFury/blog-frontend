import { create } from "zustand";
import { PostType, CommentType } from "@/app/page";

interface PostStore {
  post: PostType | null;
  setPost: (post: PostType | null) => void;
  addComment: (comment: CommentType) => void;
}

const usePostStore = create<PostStore>((set) => ({
  post: null,
  setPost: (post: PostType | null) => {
    set((state) => ({
      post,
    }));
  },
  addComment: (comment: CommentType) =>
    set((state) => ({
      post: {
        ...(state.post as PostType),
        comments: [comment, ...(state.post!.comments as CommentType[])],
      },
    })),
}));

export { usePostStore };
