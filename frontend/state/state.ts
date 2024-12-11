import { Blog } from "@/types/types";
import { atom } from "recoil";


export const blogState = atom<Blog[]>({
    key: "BlogState",
    default: []
})
